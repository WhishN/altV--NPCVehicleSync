import * as alt from 'alt'
import * as native from 'natives'
import { NPCVehicle } from './npcVehicle.mjs'

alt.log("[NPCVehicleHandler] Loaded MainHandler")

class NPCVehicleHandler {
    NPCs = undefined
    Interval = undefined

    constructor() {
        this.NPCs = []

        alt.log("=================================")
        alt.log("=== NPCVehicleHandler Started ===")
        alt.log("=================================")

        this.Interval = alt.setInterval(() => {this._CheckPeds()},1000)
    }

    _CheckPeds() {
        for(let i = 0; i < this.NPCs.length; i++) {
            this.NPCs[i].CheckStatus()
        }
    }

    AddNPCVehicle(Vehicle) {
        native.setVehicleEngineOn(Vehicle.scriptID, true, true, false)

        this.NPCs.push(new NPCVehicle(Vehicle))
    }

    RemoveNPCVehicle(Vehicle) {
        let index = this.NPCs.findIndex(x => x.Vehicle.id == Vehicle.id)
        
        if(index < 0) return

        let removed = this.NPCs.splice(index, 1)

        removed[0].delete()
    }

    UpdateNetOwner(vehicle, state, transfer) {
        let index = this.NPCs.findIndex(x => x.Vehicle.id == vehicle.id)
        
        if(index < 0) return

        this.NPCs[index].updateNetOwner(state, transfer)
    }
}

export let NPCVehHandler = new NPCVehicleHandler()