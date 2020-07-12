using System.Numerics;

namespace NPCVehicleSync.Entitys
{
    public class NPCVehicleData
    {
        public Vector3 Position { get; set; }
        public float OrientX { get; set; }
        public float OrientY { get; set; }
        public ulong PerpendicularLength { get; set; }
        public string CarModel { get; set; }
        public uint Flags { get; set; }
        public string PopGroup { get; set; }

        public NPCVehicleData() { }
    }
}
