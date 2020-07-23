import * as alt from 'alt';
import { NPCVehHandler } from './npcVehicleHandler.js';

alt.log("[NPCVehicleHandler] Loaded GameEntityDestroy");

alt.on("gameEntityDestroy", entity => {
    if(!entity instanceof alt.Vehicle) return;
    if(!entity.hasStreamSyncedMeta("NPCVehicle")) return;

    NPCVehHandler.removeNPCVehicle(entity);
});