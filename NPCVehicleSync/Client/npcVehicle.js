import * as alt from 'alt-client';
import * as native from 'natives';
import { PedHandler } from './globalPeds.js';

alt.log("[NPCVehicleHandler] Loaded NPCVehicle");

export class NPCVehicle {
    vehicle = undefined;
    ped = undefined;
    netOwner = false;
    isCreated = false;
    lastDownCheck = false;

    constructor(vehicle) {
        this.vehicle = vehicle;
        this._createPed();
    }

    _createPed(tryNumber = 0) {
        if(tryNumber > 10) return;

        if(this.vehicle.scriptID == 0) {
            alt.setTimeout(() => this._createPed(++tryNumber), 25);
            return;
        }

        this.ped = native.createRandomPedAsDriver(this.vehicle.scriptID, true);
        native.setVehicleDoorsLocked(this.vehicle.scriptID, 4);
        alt.setTimeout(() => {
            this._setCreated();
        }, 100);
    }

    _setCreated() {
        this.isCreated = true;
        if(this.netOwner) this._assignTask();
        PedHandler.addPed(this.ped);
    }

    _assignTask() {
        if(!this.isCreated || !this.netOwner) return

        native.taskVehicleDriveWander(this.ped, this.vehicle.scriptID, 20, 786491);
    }
    
    _clearTask(transfer) {
        if(!this.isCreated || this.netOwner) return; 
        native.clearPedTasksImmediately(this.ped);
        
        if(!transfer) native.setEntityVelocity(this.vehicle, 0, 0, 0);
    }

    _checkStuck() {
        let roll = native.getEntityRoll(this.vehicle.scriptID);
        if(roll < 80 && roll > -80) {
            this.lastDownCheck = false;
            return;
        }
        
        if(this.lastDownCheck) {
            native.setVehicleOnGroundProperly(this.vehicle.scriptID, 5.0);
            this.lastDownCheck = false
            return
        }

        this.lastDownCheck = true;
    }

    checkStatus() {
        if(this.netOwner) this._checkStuck();

        if(vehicle.valid && !native.isPedInVehicle(this.ped, this.vehicle.scriptID, true) && native.getVehicleEngineHealth(this.vehicle.scriptID) > 300) {
            this._createPed();
            return;
        }
        if(!native.getIsTaskActive(this.ped, 151)) {
            this._assignTask();
            return;
        }
    }

    updateNetOwner(state, transfer) {
        this.netOwner = state;

        if(state) this._assignTask();
        else this._clearTask(transfer);
    }

    delete() {
        native.deleteEntity(this.ped);
    }
}
