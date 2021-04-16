using System;
using System.IO;
using System.Threading.Tasks;

namespace NPCVehicleSync
{
    public class FileLoader
    {
        private string Path { get; }
        private string FileData { get; set; }

        public FileLoader(string Name)
        {
            this.Path = $"./resources/NPCVehicleSync/{Name}";
        }

        public async Task<bool> LoadFile()
        {
            if (!File.Exists(this.Path)) return false;

            try
            {
                this.FileData = await File.ReadAllTextAsync(this.Path);
            }
            catch(Exception e)
            {
                Logger.Error(e.Message);
                return false;
            }

            return true;
        }

        public string GetData()
        {
            return this.FileData;
        }
    }
}
