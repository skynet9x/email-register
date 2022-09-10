var host = "http://tube.jopen.me";
//var host = "http://cms.tube.com";
var pathSetting = chrome.extension.getURL("config.json");
var DB = new $db();
var extension_id = chrome.i18n.getMessage("@@extension_id");
var JOTab = [];
var dataConfig = {};

var Network = {
	setListener: function(proxyData) {
	    let username = proxyData.username,
	        password = proxyData.password;
	    this.proxyAuthFunction = function(details, callbackFn) {
	        console.log(username, password, 'Init proxy auth function');
	        callbackFn({authCredentials: { username: username, password: password}});
	    };
	    if (chrome.webRequest.onAuthRequired.hasListener(this.proxyAuthFunction)) {
	        chrome.webRequest.onAuthRequired.removeListener(this.proxyAuthFunction);
	    }
	    chrome.webRequest.onAuthRequired.addListener(
	        this.proxyAuthFunction,
	        {urls: ["<all_urls>"]},
	        ["asyncBlocking"]
	    );
	},
	connect: function(proxyData, callback) {
	    this.setListener(proxyData);
	    chrome.proxy.settings.set(
	        {
	            value: {
	                mode: "fixed_servers",
	                rules: {
	                    singleProxy: {
	                        scheme: "http",
	                        host: proxyData.ip,
	                        port: parseInt(proxyData.port)
	                    },
	                    bypassList: proxyData.bypassList
	                }
	            },
	            scope: 'regular'
	        },
	        function() {
	            if (typeof callback === 'function') {
	                callback(proxyData);
	            }
	        }
	    );
	}
};



$.get(pathSetting)
.then(function (_res)
{

	dataConfig.task = JSON.parse(_res.task);

	switch (dataConfig.task.type_ip)
	{
		case "smartproxy":
				let username = 'login_1',
					password = 'FqXVMVBa';
				Network.connect({
					ip: "127.0.0.1",
					port: 1080,
					username: username,
					password: password,
					bypassList: ["*.jopen.me", "tube.jopen.me"]
				}, function () {});
			break;
		case "socks5":
				var proxy = dataConfig.task.value_ip;
				var config = {
					mode: "pac_script",
					pacScript: {
					  data: "function FindProxyForURL(url, host) {\n" +
							"	if (host != 'admin.jopen.com' && host != 'tube.jopen.com')\n" +
							"      return 'PROXY "+ proxy +"';\n" +
							"  return 'DIRECT';\n" +
							"}"
					}
				};

				chrome.proxy.settings.set(
				  {value: config, scope: 'regular'},
				  function() {}
				);
			break;
		case "none":
				var proxy = dataConfig.task.value_ip;
				var config = {
					mode: "pac_script",
					pacScript: {
					  data: "function FindProxyForURL(url, host) {\n" +
							"  return 'DIRECT';\n" +
							"}"
					}
				};

				chrome.proxy.settings.set(
				  {value: config, scope: 'regular'},
				  function() {}
				);
			break;
		default:
				var proxy = dataConfig.task.value_ip;
				var config = {
					mode: "pac_script",
					pacScript: {
					  data: "function FindProxyForURL(url, host) {\n" +
							"  return 'DIRECT';\n" +
							"}"
					}
				};

				chrome.proxy.settings.set(
				  {value: config, scope: 'regular'},
				  function() {}
				);
			break;
	}


	if (dataConfig.task.playlists_data)
	{
		dataConfig.task.playlists_data = "";
	};

	setTimeout(function () {
		DB.set({ dataConfig: dataConfig, task: dataConfig.task }, function ()
		{
			main();
		});
	}, 2000);
}, function ()
{

});

function main()
{
	chrome.cookies.getAll({domain: "www.youtube.com"}, function(cookies) {
	    for(var i=0; i < cookies.length;i++) {
	        chrome.cookies.remove({url: "https://www.youtube.com/" + cookies[i].path, name: cookies[i].name});
	    };

	    chrome.tabs.create({url: "https://www.youtube.com/"}, function (a)
		{
			DB.set({
				tab: {
					id: a.id
				}
			});
		});
	});
};

