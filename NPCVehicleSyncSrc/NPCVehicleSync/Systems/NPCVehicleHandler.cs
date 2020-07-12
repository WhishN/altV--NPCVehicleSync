using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Numerics;
using System.Threading.Tasks;
using AltV.Net;
using AltV.Net.Async;
using Newtonsoft.Json;
using NPCVehicleSync.Config;
using NPCVehicleSync.Entitys;

namespace NPCVehicleSync.Systems
{
    internal class NPCVehicleHandler : IScript
    {
        public static List<NPCVehicle> Vehicles { get; private set; }

        public NPCVehicleHandler()
        {
            Vehicles = new List<NPCVehicle>();
        }

        /// <summary>
        /// Spawn All NPC Vehicle.
        /// After that it automatically Starts the sync
        /// </summary>
        /// <returns>awaitable Task</returns>
        [AsyncServerEvent("NPCVehicleSync::Init")]
        public async Task Init()
        {
            Vehicles = new List<NPCVehicle>();

            Random rnd = new Random(DateTime.Now.Millisecond);

            string data = await File.ReadAllTextAsync($"{Global.JSONPath}SpawnPoints.json");

            List<NPCVehicleData> Data = JsonConvert.DeserializeObject<List<NPCVehicleData>>(data);

            Alt.Server.LogColored($"{Global.LogPrefix}Loaded ~lr~{Data.Count}~w~ NPCVehicleData");

            List<NPCVehicleData> Filtered = Data.FindAll(x => Global.PopFilter.Contains(x.PopGroup));

            Filtered = Data.OrderBy(x => rnd.NextDouble()).Take(Global.VehicleAmount).ToList();

            Alt.Server.LogColored($"{Global.LogPrefix}Selected ~lr~{Filtered.Count}~w~ NPCVehicleData");

            int SmallVehicle = 0;
            int BigVehicle = 0;
            await AltAsync.Do(() =>
            {
                for (int i = 0; i < (Global.VehicleAmount); i++)
                {
                    NPCVehicleData n = Filtered[i];
                    Vector3 Pos = n.Position;
                    Vector3 Rot = new Vector3(0, 0, 0 -
                                (float)Math.Atan2(
                                    Convert.ToDouble(n.OrientX),
                                    Convert.ToDouble(n.OrientY)
                                    ));

                    if (n.PopGroup == "CITY_LARGE" || n.PopGroup == "LARGE_CITY")
                    {
                        BigVehicle++;
                    }
                    else
                    {
                        SmallVehicle++;
                    }

                    Vehicles.Add(new NPCVehicle(n.PopGroup, Pos, Rot, rnd.NextDouble()));
                }
            });

            Alt.Server.LogColored($"{Global.LogPrefix}Spawned ~lr~{SmallVehicle}~w~ SmallVehicle");
            Alt.Server.LogColored($"{Global.LogPrefix}Spawned ~lr~{BigVehicle}~w~ BigVehicle");

            Alt.Emit("NPCVehicleSync::Start");
        }

        /// <summary>
        /// Check All Netowner if they have Changed
        /// </summary>
        /// <returns>awaitable Task</returns>
        public async Task CheckNetOwnerAsync()
        {
            foreach (NPCVehicle v in Vehicles)
            {
                await v.CheckVehicleNetworkOwner();
            }
        }
    }
}
