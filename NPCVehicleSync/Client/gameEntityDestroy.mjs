import * as alt from 'alt'
import { NPCVehHandler } from './npcVehicleHandler.mjs'

alt.log("[NPCVehicleHandler] Loaded GameEntityDestroy")

alt.on("gameEntityDestroy", entity => {
    if(!entity instanceof alt.Vehicle) return
    if(!entity.hasStreamSyncedMeta("NPCVehicle")) return

    NPCVehHandler.RemoveNPCVehicle(entity)
})