import * as alt from 'alt-client';
import * as native from 'natives';
import { NPCVehicle } from './npcVehicle.js';

alt.log("[NPCVehicleHandler] Loaded MainHandler");

class NPCVehicleHandler {
    NPCs = undefined;
    interval = undefined;

    constructor() {
        this.NPCs = [];

        alt.log("=================================");
        alt.log("=== NPCVehicleHandler Started ===");
        alt.log("=================================");

        this.interval = alt.setInterval(() => this._checkPeds(), 1000);
    }

    _checkPeds() {
        for(let i = 0; i < this.NPCs.length; i++) {
            this.NPCs[i].checkStatus();
        }
    }

    addNPCVehicle(vehicle) {
        native.setVehicleEngineOn(vehicle.scriptID, true, true, false);

        this.NPCs.push(new NPCVehicle(vehicle));
    }

    removeNPCVehicle(vehicle) {
        let index = this.NPCs.findIndex(x => x.vehicle.id == vehicle.id);
        
        if(index < 0) return;

        let removed = this.NPCs.splice(index, 1);

        removed[0].delete();
    }

    updateNetOwner(vehicle, state, transfer) {
        let index = this.NPCs.findIndex(x => x.vehicle.id == vehicle.id);
        
        if(index < 0) return;

        this.NPCs[index].updateNetOwner(state, transfer);
    }
}

export const NPCVehHandler = new NPCVehicleHandler();
