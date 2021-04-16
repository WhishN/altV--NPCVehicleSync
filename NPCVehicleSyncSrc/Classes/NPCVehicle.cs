using AltV.Net.Data;
using AltV.Net.Elements.Entities;
using System;

namespace NPCVehicleSync.Classes
{
    public class NPCVehicle : Vehicle
    {
        public IPlayer NPCController { get; private set; }
        public bool IsTraffic { get; private set; }

        public NPCVehicle(IntPtr p, ushort i) : base(p, i)
        {

        }

        public NPCVehicle(uint model, Position position, Rotation rotation, bool IsNPC = false) : base(model, position, rotation)
        {
            this.IsTraffic = IsNPC;
            this.NPCController = null;
            if(this.IsTraffic)
            {
                this.SetStreamSyncedMetaData("npcTraffic", true);
            }
        }

        public void UpdateNPCController(IPlayer p)
        {
            this.NPCController = p;
        }
    }
}
