using System;
using System.Numerics;
using System.Threading.Tasks;
using AltV.Net;
using AltV.Net.Async;
using AltV.Net.Elements.Entities;
using NPCVehicleSync.Config;

namespace NPCVehicleSync.Entitys
{
    public class NPCVehicle
    {
        public IPlayer Player { get; set; }
        public IVehicle Vehicle { get; set; }

        /// <summary>
        /// Spawn NPCVehicle and Set up data
        /// </summary>
        /// <param name="popGroup">PopGroup of Spawning Place</param>
        /// <param name="position">Position Where to Spawn vehicle</param>
        /// <param name="rotation">Rotation of Spawn point</param>
        /// <param name="rnd">Random seed 0 <= seed < 1</param>
        public NPCVehicle(string popGroup, Vector3 position, Vector3 rotation, double rnd)
        {
            this.Player = null;
            byte Color = 0;
            string Model;

            if (popGroup == "CITY_LARGE" || popGroup == "LARGE_CITY")
            {
                // Spawn a bigger Vehicle
                Model = NPCData.BigVehicle[Convert.ToInt32(Math.Floor(rnd * NPCData.BigVehicle.Count))];

            }
            else
            {
                // Spawn one of the Smaller Vehicles
                Model = NPCData.SmallVehicle[Convert.ToInt32(Math.Floor(rnd * NPCData.SmallVehicle.Count))];

                // Set a random chosen Color
                Color = NPCData.SmallVehicleColors[Convert.ToInt32(Math.Floor(rnd * NPCData.SmallVehicleColors.Count))];
            }
            // Spawn Vehicle
            Vehicle = Alt.CreateVehicle(Model, position, rotation);

            // Set Color
            Vehicle.PrimaryColor = Color;
            Vehicle.SecondaryColor = Color;
            Vehicle.PearlColor = Color;

            // Set Dimension to NPCVehicle
            Vehicle.Dimension = Global.Dimension;

            // To identify that this is an NPC vehicle
            Vehicle.SetStreamSyncedMetaData("NPCVehicle", "civ");
        }

        /// <summary>
        /// Check the NetOwner and Change if Neccessary
        /// Inform both Player about Change
        /// </summary>
        /// <returns>Task</returns>
        public async Task CheckVehicleNetworkOwner()
        {
            if (Vehicle.NetworkOwner == Player) return;

            bool Transferred = this.Vehicle.NetworkOwner != null && this.Vehicle.NetworkOwner.Exists;

            if (Transferred)
            {
                await this.Vehicle.NetworkOwner.EmitAsync("NPCVehicle:NetOwner", Vehicle, true, null);
            }
            if (this.Player != null && this.Player.Exists)
            {
                await this.Player.EmitAsync("NPCVehicle:NetOwner", Vehicle, false, Transferred);
            }

            this.Player = this.Vehicle.NetworkOwner;
        }
    }
}
