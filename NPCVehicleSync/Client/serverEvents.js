import * as alt from 'alt';
import { NPCVehHandler } from './npcVehicleHandler.js';

alt.log("[NPCVehicleHandler] Loaded ServerEvents");

alt.onServer("NPCVehicle:NetOwner", (vehicle, state, transfer = undefined) => {
    NPCVehHandler.updateNetOwner(vehicle, state, transfer)
});