import * as alt from 'alt-client';

alt.on("gameEntityDestroy", entity => {
    if(!entity instanceof alt.Vehicle) return;
    if(!entity.driverPed) return;

    // remove the Ped from vehicle
    entity.driverPed.destroy();
});