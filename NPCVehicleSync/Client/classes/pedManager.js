import * as alt from 'alt-client';
import * as game from 'natives';

let List = [];

export function AddDriverPed(number) {
    if(List.includes(number)) return;
    List.push(number);
}

export function RemoveDriverPed(number) {
    if(!List.includes(number)) return;
    List.splice(List.indexOf(number), 1);
}

alt.setInterval(() => {
    List.forEach(ped => {
        if(!game.isPedInAnyVehicle(ped, true)) {
            game.deletePed(ped);
            alt.log("Removed Homeless Ped");
        }
    })
    List = List.filter(x => x > 0);
},1000)

alt.on("resourceStop", () => {
    List.forEach(ped => {
        game.deletePed(ped);
    })
})