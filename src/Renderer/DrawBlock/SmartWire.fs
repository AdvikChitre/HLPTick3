﻿module SmartWire
open CommonTypes
open Elmish
open DrawHelpers
open DrawModelType.SymbolT
open DrawModelType.BusWireT
open BusWire
open BusWireUpdateHelpers
open SmartHelpers

open Optics
open Operators


(* HLP23

    This module will normally be used exclusively by team member doing the "smart autoroute on single
    wire creation" part of the individual coding. During group phase work how it is used is up to the
    group. Functions from other members MUST be documented by "HLP23: AUTHOR" XML 
    comment as in SmartHelpers.

    It does not need specific "get started" test code since is called whenever a new wire is created 
    or (not usual) a symbol is moved so far that the topology of a wire chnages and it is autorouted 
    again from scratch.

*)


// helper function for finding matching symbol in model for given port ids on wire - current issue is finding the symbol with the matching input port id
let findSymbol (model: Model) (wire: Wire) : Symbol option = 
    let inputPort = string wire.InputPort
    let symbolValues =
        model.Symbol.Symbols
        |> Map.toList
        |> List.map snd
    let symbolsWithPortId =
        symbolValues
        |> List.filter (fun symbol ->
            symbol.PortMaps.Orientation.ContainsKey(inputPort))
        |> List.tryHead
    symbolsWithPortId

// helper function for finding if wire is connected from and to the same symbol
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


// returns the height needed to hug the symbol, if needed
let huggingDistance (wire: Wire) (symbol: Symbol) : float = 
    let inputPort = string wire.InputPort
    let portPos = symbol.PortMaps.Orientation |> Map.find inputPort
    let boundaryBox = symbolBox symbol
    let hugDistance = (snd boundaryBox[3]) - wire.StartPos.Y
    match portPos with
        | Left -> hugDistance
        | Right -> hugDistance
        | _ -> 0.0


/// helper function that routes a wire from input port to output port around the symbol, rather than through it
let routeAroundSymbol (model: Model) (wire: Wire) (symbol: Symbol Option) : Wire = 
    let symbolFound = symbol |> Option.get
    let hugLength = (huggingDistance wire symbolFound) + 15.0
    let newWires = 
        let newOutputSegment: Segment = {wire.Segments[2] with Length =  wire.Segments[2].Length - 7.0}
        let newInputSegment: Segment = {wire.Segments[6] with Length =  wire.Segments[6].Length + 7.0}
        let newFirstSegment: Segment = {wire.Segments[3] with Length =  wire.Segments[3].Length + hugLength}
        let newMiddleSegment: Segment = {wire.Segments[4] with Length =  wire.Segments[4].Length + 5.0}
        let newThirdSegment: Segment = {wire.Segments[5] with Length =  wire.Segments[5].Length - hugLength}
        let newRoute: Wire = {wire with Segments = [wire.Segments[0]; wire.Segments[1]; newOutputSegment; newFirstSegment;  newMiddleSegment; newThirdSegment; newInputSegment; wire.Segments[7]]}
        newRoute 
    match hugLength with
        | 15.0 -> wire
        | _ -> newWires
    
let generateWireLabels (model: Model) (wire: Wire) (symbol: Symbol) : Wire = 
    let inputPort = string wire.InputPort
    let outputPort = string wire.OutputPort
    let portPos = symbol.PortMaps.Orientation |> Map.find inputPort
    let wireLength =  wire.Segments[4].Length
    let wireLabels = 
        let inputLabel = {Label = inputPort; Position = wire.StartPos; Orientation = wire.InitialOrientation}
        let outputLabel = {Label = outputPort; Position = wire.EndPos; Orientation = wire.InitialOrientation}
        [inputLabel; outputLabel]
    let newWire = {wire with WireLabels = wireLabels}
    newWire

/// helper function that replaces long wire with wire labels at input port and output port
let replaceLongWire (model: Model) (wire: Wire) (symbol: Symbol) : Wire = 
    let wireLength =  wire.Segments[4].Length
    let inputPort = string wire.InputPort
    let outputPort = string wire.OutputPort
    let portPos = symbol.PortMaps.Orientation |> Map.find inputPort
    match wireLength with
        | length when length < -200.0 -> 
            // replace wire with wire labels at input port and output port


        | _ -> wire

            
    
/// top-level function which replaces autoupdate and implements a smarter version of same
/// it is called every time a new wire is created, so is easily tested.
let smartAutoroute (model: Model) (wire: Wire): Wire =     
    let symbol = findSymbol model wire
    // printfn "Symbol found: %A" symbol
    let autoWire = autoroute model wire

    printfn "%s" $"Wire: Initial Orientation={wire.InitialOrientation}\nSegments={autoWire.Segments}"
    // printfn "%s" $"hugging distance={huggingDistance autoWire (symbol |> Option.get)}"
    // printfn "%s" $"WIRE START POS={wire.StartPos.Y}"

    let selfConnected = isSelfConnected model wire
    match selfConnected with
        | true -> routeAroundSymbol model autoWire symbol 
        | false -> autoWire
    
