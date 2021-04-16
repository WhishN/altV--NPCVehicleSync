using AltV.Net;
using AltV.Net.Async;
using AltV.Net.Elements.Entities;
using NPCVehicleSync.Classes;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace NPCVehicleSync
{
    public class EventManager : IScript
    {
        [ScriptEvent(ScriptEventType.NetOwnerChange)]
        public void OnNetOwnerChange(Entity target, Player oldNetOwner = null, Player newNetOwner = null)
        {
            _ = OnNetOwnerChangeAsync(target, oldNetOwner, newNetOwner);
        }

        private static async Task OnNetOwnerChangeAsync(Entity target, IPlayer oldNetOwner = null, IPlayer newNetOwner = null)
        {
            try
            {
                if (target == null || !(target is NPCVehicle) || !((NPCVehicle)target).IsTraffic)
                {
                    Logger.Debug($"{target is NPCVehicle} - {((NPCVehicle)target).IsTraffic}");
                    return;
                }
            }
            catch(Exception e)
            {
                // Add Information for Exception
                Logger.Warning("Error during Netowner Data Check");
                Logger.Error(e.Message);
            }

            ((NPCVehicle) target).UpdateNPCController(newNetOwner);

            try
            {
                if(oldNetOwner != null)
                {
                    oldNetOwner.EmitLocked("npcvehicle:netownerchange", target, false, newNetOwner != null);
                }

                if(newNetOwner != null)
                {
                    await Task.Delay(50);
                    newNetOwner.EmitLocked("npcvehicle:netownerchange", target, true, oldNetOwner != null);
                }
            }
            catch(Exception e)
            {
                // Add Information for Exception
                Logger.Warning("Error during Transfer of Netowner");
                Logger.Error(e.Message);
            }
        }

        //[AsyncServerEvent("NPCVehicleSync:Start")]
        public async Task StartNPCVehicleSync(string amount1, string amount2)
        {

            Logger.Message("Starting NPCVehicleSync");

            if(!int.TryParse(amount1, out int Vehicles)) {
                Logger.Warning("Could not read value: Vehicles in \"NPCVehicleSync:Start\"");
                return;
            }

            if(!int.TryParse(amount2, out int BigVehicles)) {
                Logger.Warning("Could not read value: BigVehicles in \"NPCVehicleSync:Start\"");
                return;
            }
                
            if((Vehicles + BigVehicles) > 2000)
            {
                Logger.Warning("Combined Amount of Vehicles > 2000... Aborting");
                return;
            }

            await Main.VehicleManager.SpawnVehiclesAsync(Vehicles, BigVehicles);
        }

        public static void CheckNetOwnerFallback(object sender, EventArgs e)
        {
            var vehs = Alt.GetAllVehicles();
            var i = 0;
            foreach(NPCVehicle v in vehs)
            {
                if (!v.IsTraffic) continue;

                if(v.NPCController != v.NetworkOwner)
                {
                    i++;
                    _ = OnNetOwnerChangeAsync(v, v.NPCController, v.NetworkOwner);
                }
            }

            if(i > 0)
            {
                Logger.Message($"Fixed {i} NetOwner");
            }
        }

    }
}
