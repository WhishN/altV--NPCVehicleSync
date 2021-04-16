import * as alt from 'alt-client';
import { DriverPed } from '../classes/driverped';

alt.on("gameEntityCreate", entity => {
    if(!entity instanceof alt.Vehicle) return;
    if(!entity.hasStreamSyncedMeta("npcTraffic")) return;

    entity.driverPed = new DriverPed("player_two", entity);
});