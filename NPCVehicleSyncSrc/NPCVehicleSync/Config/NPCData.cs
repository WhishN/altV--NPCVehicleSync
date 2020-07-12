using System;
using System.Collections.Generic;
using System.Text;

namespace NPCVehicleSync.Config
{
    static class NPCData
    {
        /// <summary>
        /// All "Small" Vehicles Beeing used
        /// The Programm will choose one of these for spaces with < 2.5m radius
        /// </summary>
        public static readonly List<string> SmallVehicle = new List<string>()
        {
            "asterope",
            "regina",
            "primo2",
            "washington",
            "emperor",
            "oracle",
            "dilettante",
            "stockade",
            "blade",
            "moonbeam",
            "virgo",
            "tampa",
            "voodoo",
            "rancherxl",
            "baller",
            "granger",
            "utillitruck2",
            "utillitruck3",
            "speedo",
            "surfer",
            "burrito",
            "bison3"
        };

        /// <summary>
        /// Colors that will be randomly chosen from
        /// </summary>
        public static readonly List<byte> SmallVehicleColors = new List<byte>()
        {
            15,16,17,18,19,20,43,44,45,56,57,75,76,77,78,79,80,81,108,109,110,122
        };

        /// <summary>
        ///  Vehicles that can be used for spots with around 6m diameter for spot
        /// </summary>
        public static readonly List<string> BigVehicle = new List<string>()
        {
            "trash2", "bus", "airbus", "benson", "pounder", "biff", "phantom", "packer", "mixer2", "rubble"
        };
    }
}