import * as alt from 'alt'
import * as native from 'natives'
import { PedHandler } from './globalPeds.mjs'

alt.log("[NPCVehicleHandler] Loaded NPCVehicle")

export class NPCVehicle {
    Vehicle = undefined
    Ped = undefined
    NetOwner = false
    IsCreated = false
    LastDownCheck = false

    constructor(Vehicle) {
        this.Vehicle = Vehicle
        this._createPed()
    }
    _createPed(tryNumber = 0) {
        if(tryNumber > 10) return

        if(this.Vehicle.scriptID == 0) {
            alt.setTimeout(() => {this._createPed(++tryNumber)}, 25)
            return
        }

        this.Ped = native.createRandomPedAsDriver(this.Vehicle.scriptID, true)
        native.setVehicleDoorsLocked(this.Vehicle.scriptID, 4)
        alt.setTimeout(() => {
            this._setCreated()
        }, 100);
    }

    _setCreated() {
        this.IsCreated = true
        if(this.NetOwner) {
            this._assignTask()
        }
        PedHandler.addPed(this.Ped)
    }

    _assignTask() {
        if(!this.IsCreated || !this.NetOwner) return

        native.taskVehicleDriveWander(this.Ped, this.Vehicle.scriptID, 20, 786491);
    }
    
    _clearTask(transfer) {
        if(!this.IsCreated || this.NetOwner) return 
        native.clearPedTasksImmediately(this.Ped)
        
        if(!transfer) {
            native.setEntityVelocity(this.Vehicle, 0, 0, 0)
        }
    }

    _CheckStuck() {
        let roll = native.getEntityRoll(this.Vehicle.scriptID)
        if(roll < 80 && roll > -80) {
            this.LastDownCheck = false
            return
        }
        
        if(this.LastDownCheck) {
            native.setVehicleOnGroundProperly(this.Vehicle.scriptID, 5.0)
            this.LastDownCheck = false
            return
        }

        this.LastDownCheck = true
    }

    CheckStatus() {
        if(this.NetOwner) {
            this._CheckStuck()
        }

        if(native.getPedInVehicleSeat(this.Vehicle.scriptID, -1, undefined) == 0) {
            this._createPed()
            return
        }
        if(!native.getIsTaskActive(this.Ped, 151)) {
            this._assignTask()
            return
        }
    }

    updateNetOwner(state, transfer) {
        this.NetOwner = state

        if(state) this._assignTask()
        else this._clearTask(transfer)
    }

    delete() {
        native.deleteEntity(this.Ped)
    }
}