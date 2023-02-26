﻿module SmartSizeSymbol

open Elmish
open Fable.React.Props
open CommonTypes
open Fable.React
open DrawModelType
open DrawModelType.SymbolT
open DrawModelType.BusWireT
open Symbol
open Optics
open Operators

(* 
    HLP23: This module will normally be used exclusively by team member doing the "smart resize symbol" 
    part of the individual coding. During group phase work how it is used is up to the
    group. Functions from other members MUST be documented by "HLP23: AUTHOR" XML 
    comment as in SmartHelpers.

    Normally it will update multiple wires and one symbols in the BusWire model so could use the SmartHelper 
    function for the wires.
*)

/// HLP23: To test this, it must be given two symbols interconnected by wires. It then resizes symbolToSize
/// so that the connecting wires are exactly straight
/// HLP23: It should work out the interconnecting wires (wires) from 
////the two symbols, wModel.Wires and sModel.Ports
/// It will do nothing if symbolToOrder is not a Custom component (which has adjustable size).
/// HLP23: when this function is written replace teh XML comment by something suitable concisely
/// stating what it does.
/// 
let Scale 
    (symbolScale: float option)
        : float =
    match symbolScale with
    | Some x -> x
    | None -> 1.0

let getPortDist 
    (symbol: Symbol) 
    (pos: Edge) 
        : float = 
    let Width = symbol.Component.W * Scale symbol.HScale
    printfn $"Width of symbol {Width}"
    let NoPorts = List.length symbol.PortMaps.Order[pos]
    Width / ((float NoPorts) + 1.0)




let reSizeSymbol 
    (wModel: BusWireT.Model) 
    (symbolToSize: Symbol) 
    (otherSymbol: Symbol) 
        : BusWireT.Model =
    printfn $"ReSizeSymbol: ToResize:{symbolToSize.Component.Label}, Other:{otherSymbol.Component.Label}"
    let sModel = wModel.Symbol
    //printfn "%A" wModel.Wires

    let WidthToChange = getPortDist symbolToSize Top
    printfn "%A" WidthToChange

    let WidthOfConstant = getPortDist otherSymbol Bottom
    printfn "%A" WidthOfConstant
    let ScaleFactor = WidthOfConstant/WidthToChange
    printfn "%A" ScaleFactor
    let wires = [] // replace this with correct wires
    
    
    let symbol' = {symbolToSize with HScale = Some (ScaleFactor * Scale symbolToSize.HScale)}
     // no change at the moment
    let leng = List.length symbol'.PortMaps.Order[Top]
    

    // HLP23: this could be cleaned up using Optics - see SmartHelpers for examples
    {wModel with 
        Wires = wModel.Wires // no change for now, but probably this function should use update wires after resizing.
                             // to make that happen the test function which calls this would need to provide an updateWire
                             // function to this as a parameter (as was done in Tick3)
        Symbol = {sModel with Symbols = Map.add symbol'.Id symbol' sModel.Symbols}
    }


