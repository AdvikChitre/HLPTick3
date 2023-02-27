﻿module SmartWire
open CommonTypes
open Elmish
open DrawHelpers
open DrawModelType.SymbolT
open DrawModelType.BusWireT
open BusWire
open BusWireUpdateHelpers
open SmartHelpers
open SheetCreator
open SymbolUpdate
open DrawModelType

open Optics
open Operators
open System 



(* HLP23

    This module will normally be used exclusively by team member doing the "smart autoroute on single
    wire creation" part of the individual coding. During group phase work how it is used is up to the
    group. Functions from other members MUST be documented by "HLP23: AUTHOR" XML 
    comment as in SmartHelpers.

    It does not need specific "get started" test code since is called whenever a new wire is created 
    or (not usual) a symbol is moved so far that the topology of a wire chnages and it is autorouted 
    again from scratch.

*)


/// discriminated union for return type of the smart autoroute function
type SmartAutorouteResult =
    | ModelT of Model
    | WireT of Wire


/// finds matching symbol in model for given port ids on wire - CURRENT ISSUE is finding the symbol with the matching input port id
let findInputSymbol (model: Model) (wire: Wire) : Symbol option = 
    let port = string wire.InputPort
    let symbolValues =
        model.Symbol.Symbols
        |> Map.toList
        |> List.map snd
    let symbolsWithPortId =
        symbolValues
        |> List.filter (fun symbol ->
            symbol.PortMaps.Orientation.ContainsKey(port))
        |> List.tryHead
    symbolsWithPortId

/// finds matching symbol in model for given port ids on wire - CURRENT ISSUE is finding the symbol with the matching input port id
let findOutputSymbol (model: Model) (wire: Wire) : Symbol option = 
    let port = string wire.OutputPort
    let symbolValues =
        model.Symbol.Symbols
        |> Map.toList
        |> List.map snd
    let symbolsWithPortId =
        symbolValues
        |> List.filter (fun symbol ->
            symbol.PortMaps.Orientation.ContainsKey(port))
        |> List.tryHead
    symbolsWithPortId


/// determines if wire is connected from and to the same symbol
let isSelfConnected (model: Model) (wire: Wire) : bool = 
    let inputPort = string wire.InputPort
    let outputPort = string wire.OutputPort
    let symbolValues =
        model.Symbol.Symbols
        |> Map.toList
        |> List.map snd
    let symbolsWithPortId =
        symbolValues
        |> List.filter (fun symbol ->
            symbol.PortMaps.Orientation.ContainsKey(inputPort) && symbol.PortMaps.Orientation.ContainsKey(outputPort))
        |> List.tryHead
    match symbolsWithPortId with
        | Some symbol -> true
        | None -> false


/// calculates the height needed to hug the symbol
let huggingDistance (model: Model) (wire: Wire) (symbol: Symbol) : float * float = 
    let inputPort = string wire.InputPort
    let portPos = symbol.PortMaps.Orientation |> Map.find inputPort
    let boundaryBox = symbolBox symbol
    let outputPortPos, inputPortPos =
        Symbol.getTwoPortLocations (model.Symbol) (wire.InputPort) (wire.OutputPort)

    let hugDistance = 
        // tuple for the left and right distance needed to hug the symbol
        (snd boundaryBox[3]) - outputPortPos.Y, (snd boundaryBox[3]) - inputPortPos.Y 

    match portPos with
        | Left -> hugDistance
        | Right -> hugDistance
        | _ -> 0.0, 0.0


/// route wire connected across same symbol
let sameSymbolRouting (model: Model) (wire: Wire) : Wire = 
    let symbol = findInputSymbol model wire
    let symbolFound = symbol |> Option.get
    let outputPortEdge = symbolFound.PortMaps.Orientation |> Map.find (string wire.OutputPort)
    let outputPortIndex = 
        symbolFound.PortMaps.Order[outputPortEdge] 
        |> List.findIndex (fun port -> port = string wire.OutputPort)

    // make huglength dependent on the port index
    let lengthAdjustment = float outputPortIndex * 5.0

    let hugDist = huggingDistance model wire symbolFound
    let leftHugLength = 10.0 + fst hugDist + lengthAdjustment   
    let rightHugLength = 10.0 + snd hugDist + lengthAdjustment
    let seperation = 7.0 + lengthAdjustment

    // offset the input extension (wire.Segments[6]) based on the output port index 
    let inputExtension = 
        match outputPortIndex with
            | l when l<2 -> -2.0
            | 2 -> 0.0
            | 3 -> 3.0
            | 4 -> 5.0
            | 5 -> 7.0
            | 6 -> 10.0
            | _ -> 12.0

    let newWires = 
        let newOutputSegment: Segment = {wire.Segments[2] with Length = wire.Segments[2].Length + (seperation)}
        let newInputSegment: Segment = {wire.Segments[6] with Length = wire.Segments[6].Length + (seperation) - inputExtension}
        let newFirstSegment: Segment = {wire.Segments[3] with Length = rightHugLength}
        let newMiddleSegment: Segment = {wire.Segments[4] with Length = wire.Segments[4].Length - (seperation * 2.)}
        let newThirdSegment: Segment = {wire.Segments[5] with Length = -leftHugLength}
        let newZeroSegment: Segment = {wire.Segments[0] with Length =  wire.Segments[0].Length + (seperation / 2.)}
        let newRoute: Wire = {wire with Segments = [newZeroSegment; wire.Segments[1]; newOutputSegment; newFirstSegment;  newMiddleSegment; newThirdSegment; newInputSegment; wire.Segments[7]]}
        newRoute 

    let inputPort = string wire.InputPort
    let portPos = symbolFound.PortMaps.Orientation |> Map.find inputPort

    // FIND BETTER PLACE TO HAVE THE TWO FUNCTIONS BELOW
    let boundaryBox = symbolBox symbolFound 
    let outputPortPos, inputPortPos =
        Symbol.getTwoPortLocations (model.Symbol) (wire.InputPort) (wire.OutputPort)

    match portPos with
        | Left -> newWires
        | Right -> newWires
        | _ -> 
            let rightVertical = 
                ((snd boundaryBox[3]) - inputPortPos.Y) + 10.0 + lengthAdjustment
            let leftVertical = 
                ((snd boundaryBox[3]) - outputPortPos.Y) + 8.0 + lengthAdjustment
            let horizontalSeperation = 
                match outputPortIndex with
                    | 0 -> 10.5
                    | 1 -> 11.0 + (float outputPortIndex * 7.0)
                    | 2 -> 11.0 + (float outputPortIndex * 7.0)
                    | _ -> 11.0 + (float outputPortIndex * 7.5)
            let newWires = 
                let newSecondSegment: Segment = {wire.Segments[2] with Length =  wire.Segments[2].Length + horizontalSeperation}
                let newThirdSegment: Segment = {wire.Segments[3] with Length =  rightVertical} // vertical     wire.Segments[3].Length + lengthAdjustment
                let newFourthSegment: Segment = {wire.Segments[4] with Length =  wire.Segments[4].Length - horizontalSeperation}
                let newSeventhSegment: Segment = {wire.Segments[7] with Length =  -leftVertical} // vertical   wire.Segments[7].Length - lengthAdjustment  
                let newRoute: Wire = {wire with Segments = [wire.Segments[0]; wire.Segments[1]; newSecondSegment; newThirdSegment;  newFourthSegment; wire.Segments[5]; wire.Segments[6]; newSeventhSegment]}
                newRoute
            newWires



/// routes a wire from input port to output port around the symbol, rather than through it
let routeAroundSymbol (model: Model) (wire: Wire) (symbol: Symbol Option) : Wire = 
    let selfConnected = isSelfConnected model wire
    let routing = 
        match selfConnected with
            | true -> 
                sameSymbolRouting model wire

            | false -> 
                match wire.Segments[4].Length with
                    | l when l > 50.0 -> 
                        // determine if other symbols in map are in the way of the wire
                        // if so, route around them by adjusting the length of the wire segments
                        let leftCornerPos = (wire.StartPos.X + wire.Segments[2].Length, wire.StartPos.Y + wire.Segments[3].Length)
                        let bottomLeftCornerPos = (fst leftCornerPos, snd leftCornerPos - wire.Segments[3].Length)
                        let wireEndpos = (fst leftCornerPos + wire.Segments[4].Length, snd leftCornerPos)
                        // search if any other symbols are in the way of the wire along horzonta axis between leftCornerPos and rightCornerPos
                        let symbolValues =
                            model.Symbol.Symbols
                            |> Map.toList
                            |> List.map snd
                        let symbolInWay =
                            symbolValues
                            |> List.filter (fun symbol ->
                                let symbolBox = symbolBox symbol
                                let symbolTopLeftPos = symbolBox[0]
                                let symbolTopRightPos = symbolBox[1]
                                let symbolBottomRightPos = symbolBox[3]
                                let symbolLeft = fst symbolTopLeftPos
                                let symbolRight = fst symbolTopRightPos
                                let symbolTop = snd symbolTopLeftPos
                                let symbolBottom = snd symbolBottomRightPos
                                let wireLeft = fst leftCornerPos
                                let wireRight = fst wireEndpos
                                let wireTop = snd leftCornerPos

                                let middleCondition = symbolLeft < wireLeft && symbolRight > wireLeft && ( (symbolTop > wireTop && symbolBottom < (snd bottomLeftCornerPos)) || (symbolTop < wireTop && symbolBottom > wireTop) || (symbolTop > wireTop && symbolBottom < (snd bottomLeftCornerPos)) || (symbolTop > (snd bottomLeftCornerPos)  && symbolBottom < wireTop) || (symbolTop > wireTop && symbolTop < (snd bottomLeftCornerPos)))
                                let leftCondition = symbolLeft > wire.StartPos.X && symbolLeft < (fst bottomLeftCornerPos) && symbolTop < (snd bottomLeftCornerPos) && symbolBottom > (snd bottomLeftCornerPos) 
                                let rightCondition = symbolLeft > wireLeft && symbolLeft < wireRight && symbolTop < wireTop && symbolBottom > wireTop

                                let symbolInWay = 
                                    if middleCondition then true
                                    elif leftCondition then true
                                    elif rightCondition then true
                                    else false 
                                
                                symbolInWay)                        

                        // iterate through the list of symbols in the way and adjust the wire segments accordingly and return the wire with the adjusted segments
                        let rec adjustWireSegments wire symbolList =
                            match symbolList with
                            | [] -> wire
                            | symbol::symbols ->
                                // printfn "symbol in way"
                                let symbolBox = symbolBox symbol
                                let symbolTopLeftPos = symbolBox[0]
                                let symbolTopRightPos = symbolBox[1]
                                let symbolBottomRightPos = symbolBox[3]
                                let symbolLeft = fst symbolTopLeftPos
                                let symbolTop = snd symbolTopLeftPos
                                let symbolBottom = snd symbolBottomRightPos
                                let symbolRight = fst symbolTopRightPos
                                let wireTop = snd leftCornerPos
                                let wireRight = fst wireEndpos
                                let wireLeft = fst leftCornerPos
    
                                let middleCondition = symbolLeft < wireLeft && symbolRight > wireLeft && ( (symbolTop > wireTop && symbolBottom < (snd bottomLeftCornerPos)) || (symbolTop < wireTop && symbolBottom > wireTop) || (symbolTop > wireTop && symbolBottom < (snd bottomLeftCornerPos)) || (symbolTop > (snd bottomLeftCornerPos)  && symbolBottom < wireTop) || (symbolTop > wireTop && symbolTop < (snd bottomLeftCornerPos)))
                                let leftCondition = symbolLeft > wire.StartPos.X && symbolLeft < (fst bottomLeftCornerPos) && symbolTop < (snd bottomLeftCornerPos) && symbolBottom > (snd bottomLeftCornerPos) 
                                let rightCondition = symbolLeft > wireLeft && symbolLeft < wireRight && symbolTop < wireTop && symbolBottom > wireTop

                                let newWire =
                                    if leftCondition && middleCondition then 
                                        // printfn "symbol in way of LEFT AND MIDDLE wire segments"
                                        let newFifthSegment = { wire.Segments.[5] with Length = wire.Segments.[5].Length + (snd wireEndpos - symbolTop) }
                                        let newFirstSegment = { wire.Segments.[1] with Length = wire.Segments.[1].Length + 5. + (snd wireEndpos - symbolTop) }
                                        let newThirdSegment = { wire.Segments.[3] with Length = wire.Segments.[3].Length - 5. -  ( 2. * (wireTop - symbolTop) )  } 
                                        let newSecondSegment = { wire.Segments.[2] with Length = wire.Segments.[2].Length - 10. + (symbolLeft - wireLeft) }
                                        let newFourthSegment = { wire.Segments.[4] with Length = wire.Segments.[4].Length + 10. - (symbolLeft - wireLeft) }
                                        { wire with Segments = [ wire.Segments.[0]; newFirstSegment; newSecondSegment; newThirdSegment; newFourthSegment; newFifthSegment; wire.Segments.[6] ] }

                                    elif rightCondition && middleCondition then
                                        // printfn "symbol in way of RIGHT AND MIDDLE wire segments"
                                        let newSecondSegment = { wire.Segments.[2] with Length = wire.Segments.[2].Length - 10. + (symbolLeft - wireLeft) }
                                        let newFourthSegment = { wire.Segments.[4] with Length = wire.Segments.[4].Length + 10. - (symbolLeft - wireLeft) }
                                        let newThirdSegment = { wire.Segments.[3] with Length = wire.Segments.[3].Length - 5. - (wireTop - symbolTop) }
                                        let newFifthSegment = { wire.Segments.[5] with Length = wire.Segments.[5].Length + 5. + (wireTop - symbolTop) }
                                        { wire with Segments = [ wire.Segments.[0]; wire.Segments.[1]; newSecondSegment; newThirdSegment; newFourthSegment; newFifthSegment; wire.Segments.[6] ] }
                                        
                                    elif leftCondition then
                                        // printfn "symbol in way of LEFT segment of wire"
                                        let newFirstSegment = { wire.Segments.[1] with Length = wire.Segments.[1].Length + 5. + (symbolBottom - snd bottomLeftCornerPos) }
                                        let newThirdSegment = { wire.Segments.[3] with Length = wire.Segments.[3].Length - 5. - (symbolBottom - snd bottomLeftCornerPos) }
                                        { wire with Segments = [ wire.Segments.[0]; newFirstSegment; wire.Segments.[2]; newThirdSegment; wire.Segments.[4]; wire.Segments.[5]; wire.Segments.[6] ] }
                                    
                                    elif middleCondition then
                                        // printfn "symbol in way of MIDDLE segment of wire"
                                        if symbolTop > snd bottomLeftCornerPos then
                                            // printfn  "symbol in MIDDLE and target symbol is BELOW source symbol"

                                            let newFifthSegment = { wire.Segments.[5] with Length = wire.Segments.[5].Length - 5. -  ( (symbolBottom - snd wireEndpos) ) }
                                            let newThirdSegment = { wire.Segments.[3] with Length = wire.Segments.[3].Length + 5. +  ( (symbolBottom - snd wireEndpos)  )  } 

                                            let newSecondSegment = { wire.Segments.[2] with Length = wire.Segments.[2].Length - 12. + (symbolLeft - wireLeft) }
                                            let newFourthSegment = { wire.Segments.[4] with Length = wire.Segments.[4].Length + 12. - (symbolLeft - wireLeft) }
                                            { wire with Segments = [ wire.Segments.[0]; wire.Segments[1]; newSecondSegment; newThirdSegment; newFourthSegment; newFifthSegment; wire.Segments.[6] ] }
                                        else 
                                            // printfn  "symbol in MIDDLE and target symbol is ABOVE source symbol"

                                            let newFifthSegment = { wire.Segments.[5] with Length = wire.Segments.[5].Length  + 5. +  ( (snd wireEndpos) - symbolTop) }
                                            let newThirdSegment = { wire.Segments.[3] with Length = wire.Segments.[3].Length - 5. -  ( (snd wireEndpos - symbolTop)  )  } 

                                            let newSecondSegment = { wire.Segments.[2] with Length = wire.Segments.[2].Length - 10. + (symbolLeft - wireLeft) }
                                            let newFourthSegment = { wire.Segments.[4] with Length = wire.Segments.[4].Length + 10. - (symbolLeft - wireLeft) }
                                            { wire with Segments = [ wire.Segments.[0]; wire.Segments[1]; newSecondSegment; newThirdSegment; newFourthSegment; newFifthSegment; wire.Segments.[6] ] }

                                    else
                                        // printfn "symbol in way of RIGHT segment of wire"
                                        let newThirdSegment = { wire.Segments.[3] with Length = wire.Segments.[3].Length - 5. - (wireTop - symbolTop) }
                                        let newFifthSegment = { wire.Segments.[5] with Length = wire.Segments.[5].Length + 5. + (wireTop - symbolTop) }
                                        { wire with Segments = [ wire.Segments.[0]; wire.Segments.[1]; wire.Segments.[2]; newThirdSegment; wire.Segments.[4]; newFifthSegment; wire.Segments.[6] ] }

                                adjustWireSegments newWire symbols
                            
                        let newWire = adjustWireSegments wire symbolInWay
                        newWire

                    | _ -> wire
    
    routing


let genWireLabelName : string = 
    let random = new Random()
    let randomNumber = random.Next(1, 101)
    let wireLabelName = "Wire" + string randomNumber
    wireLabelName


let wireLabelComponent (id: string) (name: string) (portPos: XYPos): Component =
    let inputPorts = createPortList PortType.Input 1 id
    // printfn "input ports: %A" inputPorts
    let outputPorts = createPortList PortType.Output 1 id
    // printfn "output ports: %A" outputPorts
    let portOrientationMap = inputPorts |> List.map (fun port -> port.Id, Left) |> Map.ofList |> Map.add (outputPorts |> List.head).Id Right      
    // type: 'Map<Edge,string list>
    let portOrderMap = 
        let inputs =  [Left, inputPorts |> List.map (fun port -> port.Id)]
        let outputs = [Right, outputPorts |> List.map (fun port -> port.Id)]
        let portOrder = inputs @ outputs
        Map.ofList portOrder

    {
        Id = id
        Type = IOLabel
        Label = name.ToUpper()
        InputPorts = inputPorts 
        OutputPorts = outputPorts
        X = 0.
        Y = 0.
        H = 30.
        W = 30.
        SymbolInfo = Some { 
            LabelBoundingBox = Some {TopLeft = {X = portPos.X; Y = portPos.Y + 60.};  W = 30.; H = 30.}
            PortOrientation = portOrientationMap
            PortOrder = portOrderMap
            LabelRotation = None
            HScale = None
            VScale = None
            STransform = {Rotation = Rotation.Degree0; flipped = false}
            ReversedInputPorts = None
        }
    }

// ------------------------------------------ UNCOMMENT BELOW ----------------------------------------------------

// /// helper function for creating a wire between two symbols
// let createWire (model: Model) (oldWire: Wire) (sourceSymbol: Symbol) (targetSymbol: Symbol) (sourcePortIndex: int) (targetPortIndex: int): Model =  
//     let sourcePort: Port = sourceSymbol.Component.OutputPorts[sourcePortIndex]
//     let targetPort: Port = targetSymbol.Component.InputPorts[targetPortIndex]
//     let sourcePortId: string = sourcePort.Id
//     let targetPortId: string = targetPort.Id
//     let sourcePos = Symbol.getOutputPortLocation None model.Symbol (OutputPortId sourcePortId)
//     let targetPos = Symbol.getInputPortLocation None model.Symbol (InputPortId targetPortId)
//     let wireId: string = JSHelpers.uuid()
//     let wireId': ConnectionId = ConnectionId wireId
//     let color: HighLightColor = HighLightColor.Grey
//     let outputPortOrientation = sourceSymbol.PortMaps.Orientation |> Map.find sourcePortId

//     // connection id - NEED TO ADD TO MAP? - CHECK
//     // let connId = ConnectionId (JSHelpers.uuid())
//     // generate wire segments from sourcePos to targetPos
    // let segments = makeInitialSegmentsList wireId' sourcePos targetPos outputPortOrientation
    // // let segments = 
    // //     let outputSegment: Segment = 
    // //         {
    // //             Index = 0
    // //             Length = 10.
    // //             WireId = connId
    // //             IntersectOrJumpList = []
    // //             Draggable = false
    // //             Mode = RoutingMode.Manual
    // //         }
    // //     let inputSegment: Segment = 
    // //         {
    // //             Index = 1
    // //             Length = 10.
    // //             WireId = connId
    // //             IntersectOrJumpList = []
    // //             Draggable = false
    // //             Mode = RoutingMode.Manual
    // //         }
    // //     let firstSegment: Segment = 
    // //         {
    // //             Index = 2
    // //             Length = targetPos.X - sourcePos.X - 20.
    // //             WireId = connId
    // //             IntersectOrJumpList = []
    // //             Draggable = true
    // //             Mode = RoutingMode.Manual
    // //         }
    // //     let middleSegment: Segment = 
    // //         {
    // //             Index = 3
    // //             Length = targetPos.Y - sourcePos.Y
    // //             WireId = connId
    // //             IntersectOrJumpList = []
    // //             Draggable = true
    // //             Mode = RoutingMode.Manual
    // //         }
    // //     let thirdSegment: Segment = 
    // //         {
    // //             Index = 4
    // //             Length = targetPos.X - sourcePos.X - 20.
    // //             WireId = connId
    // //             IntersectOrJumpList = []
    // //             Draggable = true
    // //             Mode = RoutingMode.Manual
    // //         }
    // //     [outputSegment; inputSegment; firstSegment; middleSegment; thirdSegment]
    // // let newWire: Wire = 
    // //     {
    // //         WId = wireId'
    // //         InputPort = InputPortId targetPortId
    // //         OutputPort = OutputPortId sourcePortId
    // //         StartPos = sourcePos
    // //         Segments = segments
    // //         Color = color
    // //         Width = 5
    // //         InitialOrientation = Vertical
    // //     }
    // let newWire = 
    //     { oldWire with 
    //         WId = wireId'
    //         InputPort = InputPortId targetPortId
    //         OutputPort = OutputPortId sourcePortId
    //         Segments = segments
    //         StartPos = sourcePos
    //     }

    // let newWireMap =
    //     model.Wires
    //     |> Map.add wireId' newWire
    // let newModel: Model = {model with Wires = newWireMap}
    // newModel
    

// ------------------------------------------ UNCOMMENT ABOVE ----------------------------------------------------

// these functions have ERRORS
// let getOutputPortIndex (portId: OutputPortId) (ports: Port list) : int =
//         let rec indexFinder (ports: Port list) (index: int) : int =
//             match ports with
//                 | [] -> -1
//                 | h::t -> 
//                     if h.Id = (string portId) then index
//                     else indexFinder t (index + 1)
//         indexFinder ports 0

// let getInputPortIndex (portId: InputPortId) (ports: Port list) : int =
//     let rec indexFinder (ports: Port list) (index: int) : int =
//         match ports with
//             | [] -> -1
//             | h::t -> 
//                 if h.Id = (string portId) then index
//                 else indexFinder t (index + 1)
//     indexFinder ports 0


/// creates wire labels near two symbols
let generateWireLabels (model: Model) (wire: Wire) (symbol: Symbol) : SmartAutorouteResult = 
    let inputPort = wire.InputPort
    let outputPort = wire.OutputPort
    let inputPortSymbol = (findInputSymbol model wire) |> Option.get
    let outputPortSymbol = (findOutputSymbol model wire) |> Option.get
    let inputPortEdge = inputPortSymbol.PortMaps.Orientation |> Map.find (string inputPort)
    let outputPortEdge = outputPortSymbol.PortMaps.Orientation |> Map.find (string outputPort)
    // get port positions
    let outputPortPos, inputPortPos =
        Symbol.getTwoPortLocations (model.Symbol) (wire.InputPort) (wire.OutputPort)
    // create 2 wire label symbols to add to model
    let uuid: string = JSHelpers.uuid()
    let wireName = genWireLabelName
    
    let inputLabel: Symbol = 
        let inputLabelPos = 
            match outputPortEdge with
                | Left -> {X = inputPortPos.X - 60.0; Y = inputPortPos.Y}
                | Right -> {X = inputPortPos.X + 60.0; Y = inputPortPos.Y}
                | _ -> {X = inputPortPos.X; Y = inputPortPos.Y}
        printfn "input label pos: %A" inputPortEdge

        let inputLabelComp = wireLabelComponent uuid wireName inputLabelPos
        // printfn "input label component: %A" inputLabelComp

        {symbol with
            Id = ComponentId uuid
            Component = inputLabelComp
            Pos = inputLabelPos 
            Appearance = 
                {symbol.Appearance with
                    ShowPorts = ShowBoth
            }
        }
    // add input label ports to port map with the correct edge orientation
    // let inputLabelPortMap = 
    //     let leftMap = {inputLabel.PortMaps with Orientation = Map.add (string inputLabelComp.InputPorts[0]) Left inputLabel.PortMaps.Orientation}
    //     let rightMap = {leftMap with Orientation = Map.add (string inputLabelComp.OutputPorts[0]) Right leftMap.Orientation}
    //     rightMap
    // let inputLabel = {inputLabel with PortMaps = inputLabelPortMap}


    let uuid2: string = JSHelpers.uuid()
    
    let outputLabel: Symbol = 
        let outputLabelPos = 
            match inputPortEdge with
                | Left -> {X = outputPortPos.X - 60.0; Y = outputPortPos.Y}
                | Right -> {X = outputPortPos.X + 60.0; Y = outputPortPos.Y}
                | _ -> {X = outputPortPos.X; Y = outputPortPos.Y}

        printfn "output label pos: %A" outputPortEdge

        let outputLabelComp =  wireLabelComponent uuid2 wireName outputLabelPos
        // printfn "output label component: %A" outputLabelComp

        {symbol with
            Id = ComponentId uuid2
            Component = outputLabelComp
            Pos = outputLabelPos
            Appearance = 
                {symbol.Appearance with
                    ShowPorts = ShowBoth
            }
        }
        // |> Symbol.autoScaleHAndW

    
    
    // add output label ports to port map with the correct edge orientation
    // let outputLabelPortMap = 
    //     let leftMap = {outputLabel.PortMaps with Orientation = Map.add (string outputLabelComp.InputPorts[0]) Left outputLabel.PortMaps.Orientation}
    //     let rightMap = {leftMap with Orientation = Map.add (string outputLabelComp.OutputPorts[0]) Right leftMap.Orientation}
    //     rightMap
    // let outputLabel = {outputLabel with PortMaps = outputLabelPortMap}
 

    let newModel = {model with Symbol = {model.Symbol with Symbols = Map.add inputLabel.Id inputLabel model.Symbol.Symbols}}
    let newModel2 = {newModel with Symbol = {newModel.Symbol with Symbols = Map.add outputLabel.Id outputLabel newModel.Symbol.Symbols}}
    
    // create wires between ports and wire labels

    // let conn1 = createConnection outputPortSymbol.Component.OutputPorts[OutputPortIndex] inputLabelComp.InputPorts.[0]
    // let conn2 = createConnection inputLabelComp.OutputPorts.[0] inputPortSymbol.Component.InputPorts.[InputPortIndex]


    // let OutputPortIndex = getOutputPortIndex outputPort outputPortSymbol.Component.OutputPorts  // CHECK if outputPort (id) is correct one associated to component of outputPortSymbol
    // let InputPortIndex = getInputPortIndex inputPort inputPortSymbol.Component.InputPorts       // CHECK if inputPort (id) is correct one associated to component of inputPortSymbol

    printfn "input label symbol: %A" inputLabel
    printfn "output label symbol: %A" outputLabel

    // let resModel1 = createWire newModel2 wire outputPortSymbol inputLabel OutputPortIndex 0
    // let resModel2 = createWire resModel1 outputLabel inputPortSymbol 0 InputPortIndex
    ModelT newModel2


/// finds wire in model by connection id
let findWire (model: Model) (connId: ConnectionId) : Option<Wire> =
    match model.Wires |> Map.toList |> List.tryFind (fun (_, wire) -> wire.Segments.[0].WireId = connId) with
    | Some (_, wire) -> Some wire
    | _ -> None


/// deletes wire from model by filtering out the wire - CHECK
// FIXME: Wire remains connected to input port when moving function away from threshold
let deleteWire (model: Model) (wire: Wire) : SmartAutorouteResult = 
    
    printfn "wire id: %A" wire.WId 
    
    let newWires =
        model.Wires
        |> Map.filter (fun id w -> not (wire.WId = id))
    let model =
        {model with Wires = newWires}

    printfn "updated model: %A" newWires
    ModelT model
            
    
/// top-level function which replaces autoupdate and implements a smarter version of same
/// it is called every time a new wire is created, so is easily tested.
let smartAutoroute (model: Model) (wire: Wire): SmartAutorouteResult =     
    let symbol = findInputSymbol model wire

    // let newModel = replaceLongWire model wire (symbol |> Option.get)
    let autoWire = autoroute model wire

    printfn "%s" $"Wire: Initial Orientation={wire.InitialOrientation}\nSegments={autoWire.Segments}"
    

    let wireLength = autoWire.Segments[4].Length
    match wireLength with
        | l when l > 10000.0 ->    // change to appropriate threshold when testing 
            // delete wire
            let newWireMap = deleteWire model wire
            // add wire labels at posiitons near ports
            match newWireMap with
                | ModelT newModel -> 
                    // generate wire labels
                    let foundsymbol = symbol |> Option.get
                    generateWireLabels newModel wire foundsymbol
                    // match newWireMap with
                    //     | ModelT newModel -> ModelT newModel
                    //     | _ -> ModelT newModel
                | _ -> 
                    printfn "error" 
                    newWireMap
            

        | _ -> WireT (routeAroundSymbol model autoWire symbol)


// WIRE LABELS: - ISSUE: doesn't get called when wire/symbol is moved
    // 1: DELETE WIRE 
    // 2: Place wire labels at appropriate position to input port and output port
    // 3: call function to create new wire (see if this works)
    // Change the output of autowire to return BusWire Model instead of Wire
    // Change the test code to use the new return of autowire 

// TO IMPLEMENT:
    // WIRE LABLES WITH WIRE  CONNECTED TO PORTS