import * as alt from 'alt'
import * as native from 'natives'

alt.log("[NPCVehicleHandler] Loaded GlobalPeds")

class GlobalPeds {
    Peds = undefined
    constructor() {
        this.Peds = []
        alt.setInterval(() => {this._filterPeds()},2000);
    }

    addPed(handle) {
        this.Peds.push(handle)
    }

    _filterPeds() {
        for(let i = 0; i < this.Peds.length; i++) {
            if(!native.isEntityAPed(this.Peds[i])) continue
            if(native.isPedInAnyVehicle(this.Peds[i], true)) continue
    
            native.deletePed(this.Peds[i])
        }
    
        this.Peds = this.Peds.filter(x => {
            return x != null && x != undefined && native.isEntityAPed(x)
        })
    }
}

export let PedHandler = new GlobalPeds()