import * as alt from 'alt-client';
import { NPCVehHandler } from './npcVehicleHandler.js';

alt.log("[NPCVehicleHandler] Loaded GameEntityCreate");

alt.on("gameEntityCreate", entity => {
    if(!entity instanceof alt.Vehicle) return;
    if(!entity.hasStreamSyncedMeta("NPCVehicle")) return;

    NPCVehHandler.addNPCVehicle(entity);
});