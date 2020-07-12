using AltV.Net;
using AltV.Net.Async;
using NPCVehicleSync.Systems;

namespace NPCVehicleSync
{
    internal sealed class Main : AsyncResource
    {
        internal NPCVehicleHandler Handler { get; set; }

        public static bool Running { get; set; }

        public Main() { }

        public override void OnStart()
        {
            Alt.Server.LogColored($"{Config.Global.LogPrefix}Starting System...");
            Running = true;
            Alt.Emit("NPCVehicleSync::Init");
        }

        public override void OnStop()
        {
            Alt.Emit("NPCVehicleSync::Stop");
            Running = false;
        }
    }
}
