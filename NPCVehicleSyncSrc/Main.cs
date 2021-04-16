using AltV.Net;
using AltV.Net.Async;
using AltV.Net.Elements.Entities;
using NPCVehicleSync.Classes;
using System;

namespace NPCVehicleSync
{
    public class Main : AsyncResource
    {
        public static VehicleManager VehicleManager { get; private set; }

        public static System.Timers.Timer FallbackTimer { get; private set; }

        public override void OnStart()
        {
            VehicleManager = new VehicleManager();
            Logger.Message("Starting NPCVehicleSync Version 0.1-alpha");
            _ = VehicleManager.InitAsync();
            FallbackTimer = new System.Timers.Timer();
            FallbackTimer.Elapsed += EventManager.CheckNetOwnerFallback;
            FallbackTimer.AutoReset = true;
            FallbackTimer.Interval = 2500;
        }

        public override void OnStop()
        {
            VehicleManager = null;

        }
        public override IEntityFactory<IVehicle> GetVehicleFactory()
        {
            return new CVehicleFactory();
        }

        public class CVehicleFactory : IEntityFactory<IVehicle>
        {
            public IVehicle Create(IntPtr p, ushort id)
            {
                return new NPCVehicle(p, id);
            }
        }
    }
}
