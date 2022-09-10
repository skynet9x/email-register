using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Login_Gmail_in_Chrome
{
    class ChromeLocal
    {
        public Process process = new Process();
        string data_extension = Global.data["extension"].ToString();
        public bool onChrome = false;

        public string dir = null;
        public string extension = null;

        public bool open(JObject data, string url)
        {
            bool res = false;
            JObject dataConfigEx = new JObject();

            dir = (dir == null) ? (Global.data["path_chrome"].ToString() + "/GoogleChromePortable.exe") : dir;
            extension = (extension == null) ? (Global.data["path_chrome"].ToString() + "/extension/" + (string)data["email"]) : extension;

            dataConfigEx.Add("task", data.ToString());
            dataConfigEx.Add("email", (string)data["email"]);
            dataConfigEx.Add("key", (string)data["key"]);

            if (!Directory.Exists(extension))
            {
                Directory.CreateDirectory(extension);
            };

            Copy(data_extension, extension);


            File.WriteAllText(extension + "/config.json", dataConfigEx.ToString());
            process.StartInfo.FileName = dir;
            process.StartInfo.Arguments = url + " --profile-directory=\"" + (string)data["email"] + "\" --load-extension=\"" + extension + "\"";
            process.Start();
            onChrome = true;
            res = true;

            return res;
        }

        public bool open(string email, string url)
        {
            bool res = false;
            try
            {
                dir = (dir == null) ? (Global.data["path_chrome"].ToString()) : dir;
                extension = (extension == null) ? (Global.data["path_chrome"].ToString() + "/extension/" + email) : extension;
                JObject dataConfigEx = new JObject();
                dataConfigEx.Add("email", email);
                process.StartInfo.FileName = dir;
                process.StartInfo.Arguments = url + " --window-size=480,700 --profile-directory=\"" + (string)email + "\" --disable-default-apps ";
                process.Start();
                onChrome = true;
                res = true;
            }
            catch
            {
                res = false;
            };
            return res;
        }

        public bool close()
        {
            string targetProcessPath = "GoogleChromePortable";
            string targetProcessName = "chrome";
            string GoogleChromePortable = "GoogleChromePortable";
            Process[] runningProcesses = Process.GetProcesses();
            foreach (Process process in runningProcesses)
            {
                try
                {
                    if (File.Exists("process.txt"))
                    {
                        File.AppendAllText("process.txt", process.ProcessName + "|" + process.MainModule.FileName.ToString() + "\n");
                    }
                    else
                    {
                        File.WriteAllText("process.txt", process.ProcessName + "|" + process.MainModule.FileName.ToString() + "\n");
                    };

                    if ((process.ProcessName == targetProcessName || process.ProcessName == GoogleChromePortable) && process.MainModule.FileName.IndexOf(targetProcessPath) != -1)
                    {
                        process.Kill();
                    };
                }
                catch { };
            };
            onChrome = false;
            return true;
        }

        public static void Copy(string sourceDirectory, string targetDirectory)
        {
            DirectoryInfo diSource = new DirectoryInfo(sourceDirectory);
            DirectoryInfo diTarget = new DirectoryInfo(targetDirectory);

            CopyAll(diSource, diTarget);
        }

        public static void CopyAll(DirectoryInfo source, DirectoryInfo target)
        {
            Directory.CreateDirectory(target.FullName);

            // Copy each file into the new directory.
            foreach (FileInfo fi in source.GetFiles())
            {
                Console.WriteLine(@"Copying {0}\{1}", target.FullName, fi.Name);
                fi.CopyTo(Path.Combine(target.FullName, fi.Name), true);
            }

            // Copy each subdirectory using recursion.
            foreach (DirectoryInfo diSourceSubDir in source.GetDirectories())
            {
                DirectoryInfo nextTargetSubDir =
                    target.CreateSubdirectory(diSourceSubDir.Name);
                CopyAll(diSourceSubDir, nextTargetSubDir);
            }
        }
    }
}
