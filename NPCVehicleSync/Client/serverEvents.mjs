import * as alt from 'alt'
import { NPCVehHandler } from './npcVehicleHandler.mjs';

alt.log("[NPCVehicleHandler] Loaded ServerEvents")

alt.onServer("NPCVehicle:NetOwner", (vehicle, state, transfer = undefined) => {
    NPCVehHandler.UpdateNetOwner(vehicle, state, transfer)
})