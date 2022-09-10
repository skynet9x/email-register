using Newtonsoft.Json.Linq;
using Quobject.SocketIoClientDotNet.Client;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Net.Sockets;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace Login_Gmail_in_Chrome
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
            CheckForIllegalCrossThreadCalls = false;
        }

        Quobject.SocketIoClientDotNet.Client.Socket socket;
        private void Form1_Load(object sender, EventArgs e)
        {
            JObject data = new JObject();
            data.Add("token", "");
            data.Add("type_data", "");
            data.Add("path_gmail", "");
            data.Add("path_chrome", "");
            data.Add("type_ip", "");
            data.Add("type_ip_value", "");
            data.Add("key", Global.RandomString(32));
            data.Add("path_extension", Application.StartupPath + "/extension_porttable");

            if (File.Exists(Application.StartupPath + "/config.json"))
            {
                data = JObject.Parse(File.ReadAllText(Application.StartupPath + "/config.json"));
            } else {
                File.WriteAllText("config.json", data.ToString());
            };
            Global.data = data;
            Global.data["key"] = Global.RandomString(32);
            loadDataInput();

            IO.Options OptionSocket = new IO.Options();
            OptionSocket.RememberUpgrade = true;
            OptionSocket.Reconnection = true;
            OptionSocket.Upgrade = true;
            socket = IO.Socket("http://event_tube.jopen.me", OptionSocket);

            socket.On("message", (_data) =>
            {
                JObject dataJO = JObject.Parse(_data.ToString());
                if (dataJO["key"] != null && Global.data["key"] != null && (dataJO["key"].ToString() == Global.data["key"].ToString()))
                {
                    switch ((string)dataJO["type"])
                    {
                        case "task_response":
                                pend_job = false;
                                if (dataJO["data"] != null)
                                {
                                    string tmp = (string)dataJO["data"];
                                    if (tmp.Split('|').Length == 4)
                                    {
                                        string[] DataAry = dataJO["data"].ToString().Split('|');
                                        string email = DataAry[0];
                                        string password = DataAry[1];
                                        string cover_email = DataAry[2];
                                        string status = DataAry[3];

                                        rp http = new rp();
                                        string param = "email=" + email + "&password=" + password + "&recover=" + cover_email + "&status=" + status;
                                        http.post("http://admin.jopen.me/api/gmail/update?api_token=" + Global.data["token"].ToString(), param);
                                    }
                                    else
                                    {
                                        string[] infoChannel = dataJO["data"].ToString().Split('|');
                                        JObject dataGmail = new JObject();
                                        dataGmail.Add("dir_chrome", Global.data["path_chrome"].ToString());
                                        dataGmail.Add("dir_exntesion", Global.data["path_chrome"].ToString() + "/extension/" + infoGmail[0]);
                                        dataGmail.Add("email", infoGmail[0]);
                                        dataGmail.Add("password", infoGmail[1]);
                                        dataGmail.Add("email_recovery", infoGmail[2]);
                                        File.WriteAllText("data/gmail/" + infoGmail[0] + ".json", dataGmail.ToString());

                                        JObject dataChannel = new JObject();
                                        dataChannel.Add("dir_chrome", Global.data["path_chrome"].ToString());
                                        dataChannel.Add("dir_exntesion", Global.data["path_chrome"].ToString() + "/extension/" + infoGmail[0]);
                                        dataChannel.Add("email", infoGmail[0]);
                                        dataChannel.Add("channel", infoChannel[0]);
                                        dataChannel.Add("name", "");
                                        dataChannel.Add("playlist_count", "0");
                                        dataChannel.Add("status", "live");
                                        File.WriteAllText("data/channel/" + infoChannel[0] + ".json", dataChannel.ToString());

                                        rp http = new rp();
                                        string param = "email=" + dataGmail["email"].ToString() + "&password=" + dataGmail["password"].ToString() + "&recover=" + dataGmail["email_recovery"].ToString() + "&channel=" + dataChannel["channel"].ToString() + "&channel_name=" + dataChannel["name"].ToString() + "&utm_source=load_channel&cookie=" + infoChannel[1] + "&useragent=" + infoChannel[2];
                                        http.post("http://admin.jopen.me/api/channel/update?api_token=" + Global.data["token"].ToString(), param);
                                    };
                                };
                            break;
                        case "send_channel":
                                if (dataJO["data"] != null)
                                {
                                    string tmp = (string)dataJO["data"];
                                    if (tmp.Split('|').Length == 4)
                                    {
                                        string[] DataAry = dataJO["data"].ToString().Split('|');
                                        string email = DataAry[0];
                                        string password = DataAry[1];
                                        string cover_email = DataAry[2];
                                        string status = DataAry[3];

                                        rp http = new rp();
                                        string param = "email=" + email + "&password=" + password + "&recover=" + cover_email + "&status=" + status;
                                        http.post("http://admin.jopen.me/api/gmail/update?api_token=" + Global.data["token"].ToString(), param);
                                    } else {
                                        string[] infoChannel = dataJO["data"].ToString().Split('|');
                                        JObject dataGmail = new JObject();
                                        dataGmail.Add("dir_chrome", Global.data["path_chrome"].ToString());
                                        dataGmail.Add("dir_exntesion", Global.data["path_chrome"].ToString() + "/extension/" + infoGmail[0]);
                                        dataGmail.Add("email", infoGmail[0]);
                                        dataGmail.Add("password", infoGmail[1]);
                                        dataGmail.Add("email_recovery", infoGmail[2]);
                                        File.WriteAllText("data/gmail/" + infoGmail[0] + ".json", dataGmail.ToString());

                                        JObject dataChannel = new JObject();
                                        dataChannel.Add("dir_chrome", Global.data["path_chrome"].ToString());
                                        dataChannel.Add("dir_exntesion", Global.data["path_chrome"].ToString() + "/extension/" + infoGmail[0]);
                                        dataChannel.Add("email", infoGmail[0]);
                                        dataChannel.Add("channel", infoChannel[0]);
                                        dataChannel.Add("name", "");
                                        dataChannel.Add("playlist_count", "0");
                                        dataChannel.Add("status", "live");
                                        File.WriteAllText("data/channel/" + infoChannel[0] + ".json", dataChannel.ToString());

                                        rp http = new rp();
                                        string param = "email=" + dataGmail["email"].ToString() + "&password=" + dataGmail["password"].ToString() + "&recover=" + dataGmail["email_recovery"].ToString() + "&channel=" + dataChannel["channel"].ToString() + "&channel_name=" + dataChannel["name"].ToString() + "&utm_source=load_channel&cookie=" + infoChannel[1] + "&useragent=" + infoChannel[2];
                                        http.post("http://admin.jopen.me/api/channel/update?api_token=" + Global.data["token"].ToString(), param);
                                    };
                                };
                            break;
                        case "next_gmail":
                                pend_job = false;
                            break;
                        case "response_channel_cookie":
                                if (dataJO["data"] != null)
                                {
                                    string[] DataAry = dataJO["data"].ToString().Split('|');
                                    string channel = DataAry[0];
                                    string cookie = DataAry[1];
                                    string useragent = DataAry[2];

                                    JObject dataChannel = JObject.Parse(File.ReadAllText("data/channel/" + DataAry[0] + ".json"));
                                    JObject dataGmail = JObject.Parse(File.ReadAllText("data/gmail/" + dataChannel["email"].ToString() + ".json"));

                                    rp http = new rp();
                                    string param = "email=" + dataGmail["email"].ToString() + "&password=" + dataGmail["password"].ToString() + "&recover=" + dataGmail["email_recovery"].ToString() + "&channel=" + dataChannel["channel"].ToString() + "&channel_name=" + dataChannel["name"].ToString() + "&utm_source=load_channel&cookie=" + cookie + "&useragent=" + useragent;
                                    http.post("http://admin.jopen.me/api/channel/update?api_token=" + Global.data["token"].ToString(), param);
                                };
                                pend_job = false;
                            break;
                    }
                };
            });
        }

        private void loadDataInput()
        {
            txt_chrome.Text = (string)Global.data["path_chrome"];
            txt_token_auth.Text = (string)Global.data["token"];
            txt_type_data.Text = (string)Global.data["type_data"];
            txt_gmail.Text = (string)Global.data["path_gmail"];
            txt_type_ip.Text = (string)Global.data["type_ip"];
            txt_type_ip_value.Text = (string)Global.data["type_ip_value"];
            txt_extension.Text = (string)Global.data["extension"];
        }

        private void saveDataInput(object sender, EventArgs e)
        {
            //Global.data["path_chrome"] = txt_chrome.Text;
            //Global.data["token"] = txt_token_auth.Text;
            //Global.data["type_data"] = txt_type_data.Text;
            //Global.data["path_gmail"] = txt_gmail.Text;
            //Global.data["type_ip"] = txt_type_ip.Text;
            //Global.data["type_ip_value"] = txt_type_ip_value.Text;
            //File.WriteAllText("config.json", Global.data.ToString());
        }

        private void btn_save_Click(object sender, EventArgs e)
        {
            Global.data["path_chrome"] = txt_chrome.Text;
            Global.data["token"] = txt_token_auth.Text;
            Global.data["type_data"] = txt_type_data.Text;
            Global.data["path_gmail"] = txt_gmail.Text;
            Global.data["type_ip"] = txt_type_ip.Text;
            Global.data["type_ip_value"] = txt_type_ip_value.Text;
            Global.data["path_extension"] = txt_extension.Text;
            Global.data["extension"] = txt_extension.Text;
            File.WriteAllText("config.json", Global.data.ToString());
        }

        bool pend_job = false;
        string[] infoGmail;
        Thread th_gmail;



        private void btn_file_gmail_Click(object sender, EventArgs e)
        {
            OpenFileDialog theDialog = new OpenFileDialog();
            theDialog.Title = "Open Text File";
            theDialog.Filter = "TXT files|*.txt";
            if (theDialog.ShowDialog() == DialogResult.OK)
            {
                txt_gmail.Text = theDialog.FileName;
            }
        }

        private void btn_div_chrome_Click(object sender, EventArgs e)
        {
            using (var fbd = new FolderBrowserDialog())
            {
                DialogResult result = fbd.ShowDialog();

                if (result == DialogResult.OK && !string.IsNullOrWhiteSpace(fbd.SelectedPath))
                {
                    txt_chrome.Text = fbd.SelectedPath;
                };
            };
        }

        private void btn_load_gmail_Click(object sender, EventArgs e)
        {
            btn_load_gmail.Enabled = false;
            DirectoryInfo d = new DirectoryInfo("data/channel");
            FileInfo[] Files = d.GetFiles("*.json").OrderBy(p => p.CreationTime).ToArray();
            List<JObject> channels = new List<JObject>();
            foreach (FileInfo file in Files)
            {
                JObject data = JObject.Parse(File.ReadAllText(file.FullName));
                channels.Add(data);
            };
            int Index_Channel = 0;
            Thread _th = new Thread(() => {
                while (Index_Channel < channels.Count())
                {
                    JObject data = channels[Index_Channel];
                    JObject dataGmail = JObject.Parse(File.ReadAllText("data/gmail/" + data["email"].ToString() + ".json"));

                    ChromeLocal Chrome = new ChromeLocal();
                    JObject data_task = new JObject();
                    data_task.Add("email", data["email"].ToString());
                    data_task.Add("channel", data["channel"].ToString());
                    data_task.Add("type_ip", (string)Global.data["type_ip"]);
                    data_task.Add("value_ip", (string)Global.data["type_ip_value"]);
                    data_task.Add("task", "load_channel");
                    data_task.Add("key", (string)Global.data["key"]);

                    Chrome.open(data_task, "https://www.youtube.com");
                    pend_job = true;
                    DateTime t3 = DateTime.Now;
                    while (pend_job)
                    {
                        Thread.Sleep(1 * 1000);
                        DateTime t4 = DateTime.Now;
                        if ((int)t4.Subtract(t3).TotalSeconds > 300)
                        {
                            t3 = DateTime.Now;
                            Chrome.open(data_task, "https://www.youtube.com");
                        };
                    };

                    Index_Channel++;
                    lbl_status.Text = "Status: "+ Index_Channel.ToString() + "/"+ channels.Count().ToString();
                    Thread.Sleep(1000);
                };
            }) { IsBackground = true };
            _th.Start();
        }

        private void btn_search_Click(object sender, EventArgs e)
        {
            string channel = txt_channel.Text;
            if (channel == "")
                return;

            if (File.Exists("data/channel/" + channel + ".json"))
            {
                JObject dataChannel = JObject.Parse(File.ReadAllText("data/channel/" + channel + ".json"));
                lbl_status.Text = "Status: true Channel -> OPEN";
                ChromeLocal Chrome = new ChromeLocal();
                Chrome.open(dataChannel["email"].ToString(), "https://www.youtube.com");
            } else {
                lbl_status.Text = "Status: Not Channel";
            };
        }

        private void btn_extension_Click(object sender, EventArgs e)
        {
            using (var fbd = new FolderBrowserDialog())
            {
                DialogResult result = fbd.ShowDialog();

                if (result == DialogResult.OK && !string.IsNullOrWhiteSpace(fbd.SelectedPath))
                {
                    txt_extension.Text = fbd.SelectedPath;
                };
            };
        }

        private void btn_start_register_Click(object sender, EventArgs e)
        {
            string[] Arry_first_name = File.ReadAllLines("info/first_name.txt");
            string[] Arry_last_name = File.ReadAllLines("info/last_name.txt");

            int indexGmail = 0;
            int maxGmail = 1000;
            Random rnd = new Random();

            lbl_status.Text = "Status: " + indexGmail.ToString() + "/" + maxGmail.ToString();
            int index_proxy = 0;
            th_gmail = new Thread(() =>
            {
                while (indexGmail < maxGmail)
                {
                    infoGmail = new String[] {
                        Global.RandomString(24) + "@gmail.com",
                        Global.RandomString(16),
                        Global.RandomString(14) + "@gmail.com"
                    };

                    string email = infoGmail[0];
                    string passwd = infoGmail[1];
                    string cover_email = infoGmail[2];

                    ChromeLocal Chrome = new ChromeLocal();
                    JObject data = new JObject();
                    data.Add("email", email);
                    data.Add("password", passwd);
                    data.Add("cover_email", cover_email);

                    data.Add("first_name", Arry_first_name[rnd.Next(0, Arry_first_name.Length - 1)]);
                    data.Add("last_name", Arry_last_name[rnd.Next(0, Arry_last_name.Length - 1)]);
                    data.Add("very_phone", cbb_very_phone.Checked.ToString());

                    data.Add("channel_count", Global.data["channel_count"]);

                    string proxy = (string)Global.data["type_ip_value"];
                    string type_proxy = (string)Global.data["type_ip"];
                    
                    if ((string)Global.data["type_ip"] == "proxy list")
                    {
                       type_proxy = "proxy";
                       if (File.Exists((string)Global.data["type_ip_value"]))
                       {
                            string[] m = File.ReadAllLines((string)Global.data["type_ip_value"]);
                            proxy = m[index_proxy];
                       };
                    };
                    

                    data.Add("type_ip", type_proxy);
                    data.Add("value_ip", proxy);
                    data.Add("task", "gmail_register");

                    data.Add("key", (string)Global.data["key"]);
                    Chrome.open(data, "https://www.youtube.com");
                    pend_job = true;

                    DateTime t3 = DateTime.Now;
                    while (pend_job)
                    {
                        Thread.Sleep(1 * 1000);
                        DateTime t4 = DateTime.Now;
                        if ((int)t4.Subtract(t3).TotalSeconds > 300)
                        {
                            t3 = DateTime.Now;
                            Chrome.open(data, "https://www.youtube.com");
                        };
                    };

                    index_proxy++;
                    indexGmail++;
                    Thread.Sleep(2 * 1000);
                    lbl_status.Text = "Status: " + indexGmail.ToString() + "/" + maxGmail.ToString();
                };

                th_gmail.Abort();
            })
            { IsBackground = true };
            th_gmail.Start();
        }

        // value Proxy //
        private void txt_type_ip_value_Click(object sender, EventArgs e)
        {
            if (txt_type_ip.Text == "proxy list")
            {
                OpenFileDialog theDialog = new OpenFileDialog();
                theDialog.Title = "Open Text File";
                theDialog.Filter = "TXT files|*.txt";
                if (theDialog.ShowDialog() == DialogResult.OK)
                {
                    txt_type_ip_value.Text = theDialog.FileName;
                }
            };
        }
    }
}
