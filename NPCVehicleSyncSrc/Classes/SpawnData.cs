using System.Numerics;

namespace NPCVehicleSync.Classes
{
    public class SpawnData
    {
        public Vector3 Position { get; set; }
        public float OrientX { get; set; }
        public float OrientY { get; set; }
        public double PerpendicularLength { get; set; }
        public string CarModel { get; set; }
        public uint Flags { get; set; }
        public string PopGroup { get; set; }
        public SpawnData() { }
    }
}
