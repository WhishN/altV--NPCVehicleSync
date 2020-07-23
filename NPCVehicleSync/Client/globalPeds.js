import * as alt from 'alt';
import * as native from 'natives';

alt.log("[NPCVehicleHandler] Loaded GlobalPeds");

class GlobalPeds {
    peds = undefined;

    constructor() {
        this.peds = []
        alt.setInterval(() => this._filterPeds(), 2000);
    }

    addPed(handle) {
        this.peds.push(handle);
    }

    _filterPeds() {
        for(let i = 0; i < this.peds.length; i++) {
            if(!native.isEntityAPed(this.peds[i])) continue;
            if(native.isPedInAnyVehicle(this.peds[i], true)) continue;
    
            native.deletePed(this.peds[i]);
        }
    
        this.peds = this.peds.filter(x => x != null && x != undefined && native.isEntityAPed(x));
    }
}

export const PedHandler = new GlobalPeds();