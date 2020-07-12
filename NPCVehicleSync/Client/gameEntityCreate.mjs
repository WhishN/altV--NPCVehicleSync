import * as alt from 'alt'
import { NPCVehHandler } from './npcVehicleHandler.mjs'

alt.log("[NPCVehicleHandler] Loaded GameEntityCreate")

alt.on("gameEntityCreate", entity => {
    if(!entity instanceof alt.Vehicle) return
    if(!entity.hasStreamSyncedMeta("NPCVehicle")) return

    NPCVehHandler.AddNPCVehicle(entity)
})