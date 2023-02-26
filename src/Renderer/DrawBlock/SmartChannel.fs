﻿module SmartChannel

open CommonTypes
open Elmish
open DrawHelpers
open DrawModelType.SymbolT
open DrawModelType.SheetT
open DrawModelType.BusWireT
open BusWire
open BusWireUpdateHelpers
open SmartHelpers
open Optics
open Operators

(* 
    HLP23: This module will normally be used exclusively by team member doing the "smart channel route" 
    part of the individual coding. During group phase work how it is used is up to the
    group. Functions from other members MUST be documented by "HLP23: AUTHOR" XML 
    comment as in SmartHelpers.

    Normally it will update multiple wires in the BusWire model so could use the SmartHelper function for
    this purpose.
*)

let pipePrint x = 
    printfn "%A" x
    x



//---------------------------------------------------------------------------------------------------------------------------------------------------------------
//                                                              SELECTING SEGMENTS INSIDE THE CHANNEL
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
//Function which returns a list of the segments of a wire intersecting a bounding box, for all wires in the sheet
let selectSegmentsIntersectingBoundingBox (bounds: BoundingBox) (wires: List<Wire>) : List<List<Segment>> =
    let selectSegments (wire: Wire) =
        ([],wire) ||>
        foldOverSegs
            (fun startPos endPos state seg -> state @ [segmentIntersectsBoundingBox bounds startPos endPos])
        |> List.zip wire.Segments
        |> List.filter (fun element -> Option.isSome (snd element))
        |> List.map fst 
    wires |> List.map selectSegments



//---------------------------------------------------------------------------------------------------------------------------------------------------------------
//                                                              CATEGORISING THE WIRES INSIDE THE CHANNEL
//---------------------------------------------------------------------------------------------------------------------------------------------------------------

//These are the types the wires get broken down into:
//PassThrough : The wire crosses the channel with a straight single segment vertically 
//ZiggZagg cross: The wire crosses the channel sideways, while having a 'Z' shape
//Originates : The wire originitas from the channel
//Terminates : The wire terminates in the channel
//StraightCross: The wire crosses the channel sideways originating from and terminating in the channel, while being straight
//HarryPotter : The wire crosses the channel vertically while making a 'HarryPotter' shape
//LShape : The wire enters the channel sideways then takes a turn and leaves vertically
//TooDifficult: Any other wire types which are too difficult too route in a readable sense
type ChannelRelation = PassThrough | ZigZagCross | Originates | Terminates | StraightCross | HarryPotter | LShape | TooDifficult

//Helper function to further categorise wire, which are fully contained within the channel
let process7Segment (seg: Segment) =
    match seg.Index with 
    | 3 -> if seg.Length = 0 then Some (seg, StraightCross) else Some (seg, ZigZagCross)

//Given the output of selectSegmentsIntersectingBoundingBox, it reduces the list in a list into a single List containing one segment per wire, and its categorisation
let categoriseWireSegments (model:Model ) (segList : List<List<Segment>>) =
    
    let mapOverWireSegment (segments : List<Segment>) =
        match segments.Length with
        | 0 -> None
        | 1 -> Some (segments[0],PassThrough)
        | 2 -> Some (getMiddleSegment model segments[0].WireId, LShape)
        | 3 -> if segments[1].Length <> 0 then Some (segments[0], HarryPotter) else Some (segments[0], StraightCross)
        | 4 when segments[0].Index = 0 -> Some (segments[3], Originates)
        | 4 -> Some(segments[0], Terminates )
        | 5 -> Some (getMiddleSegment model segments[0].WireId ,ZigZagCross)
        | 7 -> getMiddleSegment model segments[0].WireId |> process7Segment
        | _ -> Some (getMiddleSegment model segments[0].WireId, TooDifficult)
    segList |> List.map mapOverWireSegment 
    |> List.filter Option.isSome
    |> List.map (fun option -> match option with Some value -> value)

//---------------------------------------------------------------------------------------------------------------------------------------------------------------
//                                                              SOURTING OUT THE ORDER OF THE WIRES INSIDE THE CHANNEL
//---------------------------------------------------------------------------------------------------------------------------------------------------------------

//Type to identify if the given wire is travelling upwards or downwards
type UpDown = Up | Down

//Helper function to categorise whether the segment travels up or down
let categoriseUpdown (seg : Segment) =
    match seg.Length with
    | x when x > 0 -> Down
    | x when x < 0 -> Up

//Function to sort out the wires within any category based on travelling up or down
let sortUpDown (model : Model) (orientation : Orientation) (segs : List<Segment*(XYPos*XYPos)>) :  List<List<Segment*(XYPos*XYPos)>>=
    let categorisedList = 
        segs 
        |> List.groupBy (fun element -> categoriseUpdown (fst element))
    let upLst = 
        categorisedList 
        |> List.filter (fun element -> fst element = Up)
        |> List.collect snd
        |> List.sortBy (fun element -> if orientation = Vertical then (snd (snd element)).Y else (fst (snd element)).X )
        |> List.groupBy (fun (seg, posTuple) -> model.Wires[seg.WireId].OutputPort)
        |> List.map snd
    let downList =
        categorisedList 
        |> List.filter (fun element -> fst element = Down)
        |> List.collect snd
        |> List.sortByDescending (fun element -> if orientation = Vertical then (snd (snd element)).Y else (snd (snd element)).X )
        |> List.groupBy (fun (seg, posTuple) -> model.Wires[seg.WireId].OutputPort)
        |> List.map snd
    downList @ upLst

//Specialised helper function to return the vertical segments of a HarryPotter wire
let createHarryPair (model : Model) (segment : Segment, posTuple) =
    match segment.Length with 
    | x when  x > 0.0 -> ((getSegmentFromId model (segment.Index - 1, segment.WireId),
                            getAbsoluteSegmentPos model.Wires[segment.WireId] (segment.Index - 1)),

                            (getSegmentFromId model (segment.Index + 1, segment.WireId),
                            getAbsoluteSegmentPos model.Wires[segment.WireId] (segment.Index + 1)))

    | x when x < 0.0 ->  ((getSegmentFromId model (segment.Index + 1, segment.WireId),
                            getAbsoluteSegmentPos model.Wires[segment.WireId] (segment.Index + 1)),

                            (getSegmentFromId model (segment.Index - 1, segment.WireId), 
                            getAbsoluteSegmentPos model.Wires[segment.WireId] (segment.Index - 1)))


//Function which sorts out the orderin of the wires within a channel, returns the list of segments in the order which they have to be shifted
let generateChannelOrder (orientation : Orientation) (model : Model) (lst: List<Segment*ChannelRelation>) =
    let segList =
        lst
        |> List.map (fun (segment, orient) -> (segment, getAbsoluteSegmentPos model.Wires[segment.WireId] segment.Index), orient)
    let leftHarry, rightHarry =
        segList
        |> List.filter (fun element -> snd element = HarryPotter)
        |> List.map fst
        |> List.map (createHarryPair model)
        |> List.unzip
    let ZiggZaggList =
        segList
        |> List.filter (fun element -> snd element = ZigZagCross)
        |> List.map fst
        |> sortUpDown model orientation
    let PassThroughList = 
        segList 
        |> List.filter (fun element -> snd element = PassThrough) 
        |> List.map fst
        |> sortUpDown model orientation
    let OriginateList = 
        segList 
        |> List.filter (fun element -> snd element = Originates) 
        |> List.map fst
        |> sortUpDown model orientation
    let TerminatesList = 
        segList 
        |> List.filter (fun element -> snd element = Terminates) 
        |> List.map fst
        |> sortUpDown model orientation
    let LList =
        segList 
        |> List.filter (fun element -> snd element = LShape) 
        |> List.map fst
        |> sortUpDown model orientation
    let TooDifficult = lst |> List.filter (fun element -> snd element = TooDifficult) |> List.map fst
    (leftHarry|> sortUpDown model orientation) @ OriginateList  @ PassThroughList @ LList @ ZiggZaggList  @ TerminatesList @ (rightHarry|> sortUpDown model orientation), TooDifficult
    

//---------------------------------------------------------------------------------------------------------------------------------------------------------------
//                                                          SHIFTING THE WIRES TO THEIR CORRESPONDING POSITION IN THE CHANNEL
//---------------------------------------------------------------------------------------------------------------------------------------------------------------

let isWireShiftedToMinDistance (wire : Wire) (index : int) =
    let prevSeg = wire.Segments[index - 1]
    let nextSeg = wire.Segments[index + 1]
    match (abs prevSeg.Length < Constants.nubLength + 2.0, abs nextSeg.Length < Constants.nubLength + 2.0) with
    | false, false -> false
    | _ -> true

let filterShiftedWires (lst : List<Wire* Segment>) =
    let checkedList =
        lst
        |> List.groupBy (fun (wire, seg) -> isWireShiftedToMinDistance wire seg.Index)
    let safeList = 
        checkedList
        |> List.filter (fun element -> fst element = false)
        |> List.collect snd 
        |> List.map fst
    let unsafeList = 
        checkedList
        |> List.filter (fun element -> fst element = true)
        |> List.collect snd 
        |> List.map fst
    unsafeList, safeList

let createShiftedWires (orientation : Orientation) (model : Model) (bounds: BoundingBox) (segList : List<List<Segment*(XYPos*XYPos)>>)  = 
    let innerSegFolder (increment : float ) (lst) (seg, (startPos:XYPos, endPos)) = 
        match orientation with
        | Vertical -> lst@[moveSegment model seg -(startPos.X - (bounds.TopLeft.X - bounds.W + increment *(bounds.W / float (segList.Length + 1)))) , seg]
        | Horizontal -> lst@[moveSegment model seg -(startPos.Y - (bounds.TopLeft.Y + increment *(bounds.H / float (segList.Length + 1)))), seg]
    let outerSegFolder (stateLst, counter) (sgLst) =
        let updatedList = (stateLst, sgLst) ||> List.fold (innerSegFolder counter)
        updatedList, counter + 1.0 
    (([], 1.0), segList)||> List.fold outerSegFolder 
    |> fst 
     
let placeHolderForReplacement (wireList : List<Wire>) = 
    printfn "%A" "WIRES TO BE REPLACED: "
    wireList |> List.map (printfn "%A") |> ignore

let getStartComponentFromWire (model : DrawModelType.SheetT.Model) (wire : Wire) =
    let startCompId = model.Wire.Symbol.Ports[Symbol.getInputPortIdStr wire.InputPort].HostId
    model.Wire.Symbol.Symbols[ComponentId startCompId].Component

let replaceWireWithLabel (model : DrawModelType.SheetT.Model) (wire : Wire) =
   let startLabelId = JSHelpers.uuid ()
   let endLabelId = JSHelpers.uuid ()
   let startComp = getStartComponentFromWire model wire
   let startPos = {wire.StartPos with X = wire.StartPos.X + 50.0 ;Y = wire.StartPos.Y - 7.5}
   let endPos = {wire.EndPos with X = wire.EndPos.X - 100.0;Y = wire.EndPos.Y - 7.5}
   let startLabel = Symbol.makeComponent startPos ComponentType.IOLabel startLabelId startComp.Label
   let endLabel = Symbol.makeComponent endPos ComponentType.IOLabel endLabelId startComp.Label
   SymbolUpdate.generateLabel model.Wire.Symbol ComponentType.IOLabel |> pipePrint |> ignore
   let startSymbol = 
        { 
            Pos = startPos
            LabelBoundingBox = {TopLeft=startPos; W=0.;H=0.} // dummy, will be replaced
            LabelHasDefaultPos = true
            LabelRotation = None
            Appearance =
                {
                    HighlightLabel = false
                    ShowPorts = ShowNone
                    Colour = "rgb(120,120,120)"
                    Opacity = 1.0
                }
            InWidth0 = None // set by BusWire
            InWidth1 = None
            Id = ComponentId startLabel.Id
            Component = startLabel
            Moving = false
            PortMaps = Symbol.initPortOrientation startLabel
            STransform = {Rotation = Degree0; flipped = false}
            ReversedInputPorts = Some false
            MovingPort = None
            IsClocked = false
            MovingPortTarget = None
            HScale = None
            VScale = None
            }
            |> Symbol.autoScaleHAndW
   let symbolModel = model.Wire.Symbol
   let endSymbol = {startSymbol with Pos = endPos; Id = ComponentId endLabel.Id; Component = endLabel; PortMaps = Symbol.initPortOrientation endLabel} |> Symbol.autoScaleHAndW
   let startSymbolMap = symbolModel.Symbols.Add (ComponentId startLabel.Id, startSymbol) 
   let startNewPorts = Symbol.addToPortModel symbolModel startSymbol 
   let endSymbolMap = {symbolModel with Symbols = startSymbolMap; Ports = startNewPorts}.Symbols.Add (ComponentId endLabel.Id, endSymbol) 
   let endNewPorts = Symbol.addToPortModel {symbolModel with Symbols = endSymbolMap; Ports = startNewPorts} endSymbol 
   let newModel = {model with Wire = {model.Wire with Symbol = {symbolModel with Symbols = endSymbolMap; Ports = endNewPorts}}}
   let startLabelInputPortPos  = Symbol.getInputPortLocation None newModel.Wire.Symbol (InputPortId startSymbol.Component.InputPorts[0].Id)
   let endLabelOutputPortPos = Symbol.getOutputPortLocation None newModel.Wire.Symbol (OutputPortId endSymbol.Component.OutputPorts[0].Id)
   let startSegmentList = makeInitialSegmentsList wire.WId wire.StartPos startLabelInputPortPos Left
   let endWireId = JSHelpers.uuid ()
   let endSegmentList = makeInitialSegmentsList (ConnectionId endWireId) endLabelOutputPortPos wire.EndPos Right
   let newStartWire = {wire with InputPort = InputPortId startSymbol.Component.InputPorts[0].Id; Segments = startSegmentList} |> autoroute newModel.Wire    
   let newEndWire = {wire with OutputPort = OutputPortId endSymbol.Component.OutputPorts[0].Id; Segments = endSegmentList; WId = ConnectionId endWireId} |> autoroute newModel.Wire
   {newModel with Wire = [newStartWire; newEndWire] |>  updateModelWires newModel.Wire}





///
/// HLP23: suggested initial smartChannel top-level function
/// to be tested, it must be given a channel in through which to route wires nicely
/// Normally the channel will come from symbol edges.
/// The function must identify all wires with segments going through the channel and space them
/// This function routes the middle segment of all 7 segment wires by moving them perpendicular to its direction.
/// It is expected that all wires provided are 7 segment with middle segment in the same direction
/// wires not so will be ignored.
/// The messiness of when to call it, what to do with different types of wire, which wires to call it with
/// could be left till later.
/// For this simple routing only one dimension of the channel is needed (determined by orientation).
/// The Wires going through the channel must be returned as an updated Wires map in model.
// HLP23: need to update XML doc comments when this function is fully worked out.
let smartChannelRoute 
        (channelOrientation: Orientation) 
        (channel: BoundingBox) 
        (fullModel: DrawModelType.SheetT.Model) 
            : DrawModelType.SheetT.Model =

    let tl = channel.TopLeft
    printfn $"SmartChannel: channel {channelOrientation}:(%.1f{tl.X},%.1f{tl.Y}) W=%.1f{channel.W} H=%.1f{channel.H}"
    let model = fullModel.Wire
    
    let correctBounds = {channel with TopLeft = {channel.TopLeft with X = channel.TopLeft.X - channel.W}}
    
    let sortedWires, diffictulWires = 
        model 
        |> getWireList 
        |> selectSegmentsIntersectingBoundingBox correctBounds
        |> categoriseWireSegments model
        |> generateChannelOrder channelOrientation model 
    let moreDiffictultWires ,wireListToModify =
        sortedWires
        |> createShiftedWires channelOrientation model channel
        |> filterShiftedWires
    
    let updatedWireModel : DrawModelType.BusWireT.Model = 
        wireListToModify
        |> updateModelWires model 
    let modelWithMovedWires = {fullModel with Wire = updatedWireModel}
    (modelWithMovedWires ,moreDiffictultWires |> List.append (diffictulWires |> List.map (fun element -> model.Wires[element.WireId])))
    ||> List.fold replaceWireWithLabel
    


    
    
