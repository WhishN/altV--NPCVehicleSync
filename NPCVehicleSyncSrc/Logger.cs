using AltV.Net;

namespace NPCVehicleSync
{
    public class Logger
    {
        public static void Message(string text)
        {
            Alt.Server.LogColored("~g~[NPCVehicleSync]~w~ " + text);
        }

        public static void Warning(string text)
        {
            Alt.Server.LogWarning("[NPCVehicleSync] " + text);
        }
        
        public static void Error(string text)
        {
            Alt.Server.LogError("[NPCVehicleSync] " + text);
        }

        public static void Debug(string text)
        {
#if DEBUG
            Alt.Server.LogColored("~g~[NPCVehicleSync]~b~[DEBUG]~w~  " + text);
#endif
        }
    }
}
