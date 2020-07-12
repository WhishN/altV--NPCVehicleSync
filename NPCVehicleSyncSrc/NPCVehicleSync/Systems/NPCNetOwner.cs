using System.Threading.Tasks;
using AltV.Net;
using AltV.Net.Async;
using NPCVehicleSync.Config;

namespace NPCVehicleSync.Systems
{
    public class NPCNetOwner : IScript
    {
        private static bool IsRunning { get; set; }

        private NPCVehicleHandler Handler { get; set; }

        public NPCNetOwner()
        {
            IsRunning = true;
            this.Handler = new NPCVehicleHandler();
        }

        [AsyncServerEvent("NPCVehicleSync::Start")]
        public async Task StartAsync()
        {
            Alt.Server.LogColored($"{Global.LogPrefix}Starting To Sync NetOwner Data...");
            await CheckNetOwner();
        }

        public async Task CheckNetOwner()
        {
            while (Main.Running)
            {
                await this.Handler.CheckNetOwnerAsync();
            }
        }

        [ServerEvent("NPCVehicleSync::Stop")]
        public void StopAsync()
        {
            IsRunning = false;
            Alt.Server.LogColored($"{Global.LogPrefix}Stopping System...");
        }
    }
}
