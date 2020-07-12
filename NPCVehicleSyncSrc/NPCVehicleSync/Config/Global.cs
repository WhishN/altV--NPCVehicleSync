using System.Collections.Generic;

namespace NPCVehicleSync.Config
{
    internal class Global
    {
        // How Many Vehicles to Spawn
        internal static readonly ushort VehicleAmount = 500;

        // Default Dimension for NPC Vehicle
        internal static readonly int Dimension = 0;

        // Only Spots with this Specific PopGroup will be used
        internal static readonly List<string> PopFilter = new List<string>()
        {
            "", "CITY_LARGE", "LARGE_CITY", "FREEWAY"
        };

        // Which prefix will be shown in Server Logs
        internal static readonly string LogPrefix = "~g~[NPCVehicleSync]~w~ ";

        // The internal JSON Path
        internal static readonly string JSONPath = "./resources/NPCVehicleSync/Data/";
    }
}
