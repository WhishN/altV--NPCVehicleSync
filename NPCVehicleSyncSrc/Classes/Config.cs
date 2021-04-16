using System.Collections.Generic;

namespace NPCVehicleSync.Classes
{
    public class Config
    {
        public int MaxAmount { get; set; }
        public int MaxBigAmount { get; set; }
        public bool AutoStart { get; set; }
        public List<string> Vehicles { get; set; }
        public List<string> BigVehicles { get; set; }
        public List<byte> Colors { get; set; }

        public Config()
        {

        }
    }
}
