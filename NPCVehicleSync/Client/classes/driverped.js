import * as alt from 'alt-client';
import * as game from 'natives';
import { AddDriverPed, RemoveDriverPed } from './pedManager';

export class DriverPed {

    scriptID = 0;
    model = undefined;
    hash = 0;
    hasTask = false;
    vehicle = undefined;

    /**
     * 
     * @param {string} model 
     * @param {alt.Vehicle} vehicle 
     */
    constructor(model, vehicle) {
        this.model = model;
        this.hash = alt.hash(this.model);
        this.vehicle = vehicle;
        this.spawnIntoVehicle();
    }

    /**
     * 
     * @returns {Promise<boolean>} with timeout if model has been loaded
     */
    _requestModel() {
        return new Promise((resolve, reject) => {
            if(game.hasModelLoaded(this.hash)) {
                resolve(true);
                return;
            }

            game.requestModel(this.hash);
            let counter = 0;
            let interval = alt.setInterval(() => {
                if(!game.hasModelLoaded(this.hash)) {
                    if(counter >= 50) {
                        alt.clearInterval(interval);
                        resolve(false);
                    }
                    return;
                }

                alt.clearInterval(interval);
                resolve(true);
                return;
            },25)
        })
    }

    _waitForValidVehicle() {
        return new Promise((resolve, reject) => {
            let counter = 0;
            let intv = alt.setInterval(() => {
                if(this.vehicle.scriptID == 0) {
                    counter++;
                    if(counter >= 25) {
                        alt.clearInterval(intv);
                        resolve(false);
                        return;
                    }
                }
                else
                {
                    alt.clearInterval(intv);
                    resolve(true);
                }
            },25)
        })
    }

    /**
     * 
     * @returns 
     */
    async spawnIntoVehicle() {
        if(!await this._requestModel()) {
            alt.log("Error dp-00");
            return;
        }
        if(!await this._waitForValidVehicle()) {
            alt.log("Error dp-01");
        }
        this.scriptID = game.createPedInsideVehicle(
            this.vehicle.scriptID,
            2,
            this.hash,
            -1,
            false, false
        )   	
        alt.nextTick(() => {
            game.setDriverAbility(this.scriptID,1.0);
            game.setDriverRacingModifier(this.scriptID,1.0);
            game.setPedConfigFlag(this.scriptID, 32, false); // PED_FLAG_CAN_FLY_THRU_WINDSCREEN
            game.setPedGetOutUpsideDownVehicle(this.scriptID, false);
            game.setEntityInvincible(this.scriptID, true);
            AddDriverPed(this.scriptID);
        })
    }

    /**
     * 
     */
     StartTask(tryNumber = 0) {
        if(this.HasTask) return;
        this.HasTask = true;
        if(this.scriptID == 0) {
            if(tryNumber >= 25) {
                alt.log("Error dp-02");
                return;
            }
            alt.setTimeout(() => {
                this.StartTask(++tryNumber);
            },25);
        }
        game.taskVehicleDriveWander(this.scriptID, this.vehicle.scriptID, 23, 787003);
    }

    /**
     * 
     */
    EndAllTask(transfer = false) {
        if(!this.HasTask) return;
        this.HasTask = false;
        this._respawn();
        if(!transfer) game.setEntityVelocity(this.vehicle.scriptID, 0, 0, 0)
    }

    async _respawn() {
        if(!await this.destroy()) {
            alt.log("Error dp-03");
            return;
        }
        this.spawnIntoVehicle();
    }

    destroy() {
        return new Promise((resolve, reject) => {
            let counter = 0;
            let int = alt.setInterval(() => {
                if(this.scriptID == 0) {
                    counter++;
                    if(counter > 25) {
                        alt.clearInterval(int);
                        resolve(false);
                    }
                    return;
                }

                alt.clearInterval(int);
                RemoveDriverPed(this.scriptID);
                game.deletePed(this.scriptID);
                this.scriptID = 0;
                resolve(true);
                return;

            },25)

        })
    }

    /**
     * 
     * @returns {boolean} if Ped is valid or not spawned
     */
    valid = () => {
        return this.scriptID != 0;
    }

    /**
     * 
     * @returns {boolean} If Ped Is in a vehicle
     */
    inVehicle = () => {
        return game.isPedInAnyVehicle(this.scriptID, true);
    }
}