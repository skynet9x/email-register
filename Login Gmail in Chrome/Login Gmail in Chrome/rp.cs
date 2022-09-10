using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using xNet;

namespace Login_Gmail_in_Chrome
{
    class rp
    {
        public string cookie;
        public string port = null;
        public string response;
        public string error;
        public string Authorization;
        public HttpRequest request = new HttpRequest();
        public int timeout = 5000;
        public rp()
        {
            request.UserAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.108 Safari/537.36";
            CookieDictionary _cookie = new CookieDictionary();
            request.Cookies = _cookie;
        }

        public void get(string url)
        {
            error = null;
            response = null;
            if (cookie != null)
            {
                CookieDictionary _cookie = new CookieDictionary();
                string[] tam = cookie.Split(';');

                for (int i = 0; i < tam.Length; i++)
                {
                    if (tam[i].IndexOf("=") != -1)
                    {
                        string[] tam2 = tam[i].Split('=');
                        string tam_val = tam2[1];

                        if (tam2.Length > 2)
                        {
                            List<string> tam4 = new List<string>();
                            for (int n = 1; n < tam2.Length; n++)
                            {
                                tam4.Add(tam2[n]);
                            }

                            tam4.ToArray();
                            tam_val = String.Join("=", tam4).ToString();
                        }

                        try
                        {
                            _cookie.Add(tam2[0], tam_val);
                        }
                        catch { }

                    }
                };
                request.Cookies = _cookie;
            };

            if (port != null)
                request.Proxy = Socks5ProxyClient.Parse("127.0.0.1:" + port);

            try
            {
                if (Authorization != null)
                    request.AddHeader("Authorization", Authorization);

                response = request.Get(url).ToString();
            }
            catch
            {
                try
                {
                    error = request.Response.ToString();
                }
                catch
                {
                    error = "error";
                }
            }
            finally
            {
                request?.Dispose();
            };
        }

        public void post(string url, string param = null, string typeContent = "application/x-www-form-urlencoded")
        {
            error = null;
            response = null;
            if (cookie != null)
            {
                CookieDictionary _cookie = new CookieDictionary();
                string[] tam = cookie.Split(';');

                for (int i = 0; i < tam.Length; i++)
                {
                    if (tam[i].IndexOf("=") != -1)
                    {
                        string[] tam2 = tam[i].Split('=');
                        string tam_val = tam2[1];

                        if (tam2.Length > 2)
                        {
                            List<string> tam4 = new List<string>();
                            for (int n = 1; n < tam2.Length; n++)
                            {
                                tam4.Add(tam2[n]);
                            };

                            tam4.ToArray();
                            tam_val = String.Join("=", tam4).ToString();
                        };

                        try
                        {
                            _cookie.Add(tam2[0], tam_val);
                        }
                        catch { };
                    }
                }
                request.Cookies = _cookie;
            };

            if (port != null)
                request.Proxy = Socks5ProxyClient.Parse("127.0.0.1:" + port);
            try
            {
                if (Authorization != null)
                    request.AddHeader("Authorization", Authorization);
                response = request.Post(url, param, typeContent).ToString();
            }
            catch
            {
                try
                {
                    error = request.Response.ToString();
                }
                catch
                {
                    error = "error";
                }
            }
            finally
            {
                request?.Dispose();
            };
        }
    }
}
