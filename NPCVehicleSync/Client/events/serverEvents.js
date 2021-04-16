import * as alt from 'alt-client';

alt.onServer("npcvehicle:netownerchange", HandleChange);

alt.log("Loaded ServerEvents");

function HandleChange(vehicle, status, transferred, tryNumber = 0) {
    if(!vehicle.driverPed) {
        if(tryNumber > 25) {
            alt.log("Error hc-00");
            return;
        }
        alt.setTimeout(() => {
            HandleChange(vehicle, status, transferred, ++tryNumber)
        },100)
        return;
    }
    if(status) {
        // You are now Netowner
        alt.setTimeout(() => {
            vehicle.driverPed.StartTask();
        },50);
        
    } else {
        // You Lost the Netowner
        vehicle.driverPed.EndAllTask(transferred);
    }
}