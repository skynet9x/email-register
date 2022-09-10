var dataTask;
var dataConfig;
var access_token = "";
var Global = {};
var playlists_data = "";
var sms = null;
var SMSviotp = null;

DB.get({ dataConfig: {}, tab: false, task: false, phone: {} }, function (item)
{
	Global = item;
	dataTask = item.task;
	console.log(dataTask);
	dataConfig = item.dataConfig;
	sms = new chothuesimcode("068bf268", item.phone.id);
	SMSviotp = new viotp("748fa1154fa34aac90f2d067571589e6", item.phone.id);

	chrome.runtime.sendMessage({
		type: "tab-info"
	}, function (tabID)
	{
		if (item.tab.id == tabID)
		{
			switch (dataTask.task)
			{
				case "gmail_register":
						console.log("Gmail register...");
						
						setTimeout(function ()
						{
							start_register();
						}, 4000);
					break;
			};
		};
	});
});

function start_register()
{
	var type = typePage();
	console.log(type);

	switch (type)
	{
		case "sign-in-no-continue":
				window.location.href = "https://www.youtube.com/";
			break;
		case "user-youtube":
				if (document.URL.match(/channel\/([a-zA-Z0-9])/i) != null)
				{
					setTimeout (function ()
					{
						chrome.runtime.sendMessage({ type: "page-ajax",method: "GET",url: "https://studio.youtube.com/", data: {}, headers: {} },
						function (bodyHTML) {
							var	ChannelID = "";
		    				var tmp = bodyHTML.match(/externalChannelId":"([a-zA-Z0-9_-]{24})"/g);
		    				var channelData = tmp[0].match(/externalChannelId":"([a-zA-Z0-9_-]{24})"/i);
			    				ChannelID = channelData[1];
		    				chrome.runtime.sendMessage({ type: "youtube-get-cookie" },
							function (cookies) {
								chrome.runtime.sendMessage({
									type: "page-ajax",
									url: host + "/api/event/message",
									data: { key: dataTask.key, type: "send_channel", data: ChannelID +"|"+ cookies + "|" + navigator.userAgent},
									method: "POST"
								}, function () {
									chrome.runtime.sendMessage({
										type: "page-ajax",
										url: host + "/api/event/message",
										data: { key: dataTask.key, type: "next_gmail", data: "" },
										method: "POST"
									}, function () {
										chrome.runtime.sendMessage({
											type: "close-all"
										});
									});
								});
							});
						});
					}, 3000);
				} else {
					$('#avatar-btn').click();
					setTimeout(function ()
					{
						var tmp = document.querySelectorAll('#create-channel-button'); // [0].getAttribute("href")

						if (document.querySelectorAll('#contentWrapper #items #endpoint')[0].getAttribute('href') == null)
						{
							if (tmp.length > 0)
							{
								document.querySelectorAll('#create-channel-button')[0].click();
								setTimeout(function (){ xuly(); }, 4000);
							} else {
								window.location.href = "https://www.youtube.com/create_channel";
								setTimeout(function (){ xuly(); }, 4000);
							};
						} else {
							setTimeout (function ()
							{
								chrome.runtime.sendMessage({ type: "page-ajax",method: "GET",url: "https://studio.youtube.com/", data: {}, headers: {} },
								function (bodyHTML) {
									var	ChannelID = "";
				    				var tmp = bodyHTML.match(/externalChannelId":"([a-zA-Z0-9_-]{24})"/g);
				    				var channelData = tmp[0].match(/externalChannelId":"([a-zA-Z0-9_-]{24})"/i);
					    				ChannelID = channelData[1];
				    				chrome.runtime.sendMessage({ type: "youtube-get-cookie" },
									function (cookies) {
										chrome.runtime.sendMessage({
											type: "page-ajax",
											url: host + "/api/event/message",
											data: { key: dataTask.key, type: "send_channel", data: ChannelID +"|"+ cookies + "|" + navigator.userAgent },
											method: "POST"
										}, function () {
											chrome.runtime.sendMessage({
												type: "page-ajax",
												url: host + "/api/event/message",
												data: { key: dataTask.key, type: "next_gmail", data: "" },
												method: "POST"
											}, function () {
												chrome.runtime.sendMessage({
													type: "close-all"
												});
											});
										});
									});
								});
							}, 3000);
						};
					}, 5000);
				};
			break;
		case "home-youtube":
				if (document.querySelectorAll(".yt-alert-message").length > 0 && document.querySelectorAll(".yt-alert-message")[0].textContent.indexOf("permanently disabled") != -1)
				{
					chrome.runtime.sendMessage({
						type: "page-ajax",
						url: host + "/api/event/message",
						data: { key: dataTask.key, type: "task_response", data: dataTask.email +"|"+ dataTask.password + "|" + dataTask.cover_email +"|disabled_youtube"},
						method: "POST"
					}, function () {
						chrome.runtime.sendMessage({
							type: "close-all"
						});
					});
				} else {
					$("[aria-label=\"Sign in\"]").click();
					setTimeout(function () { $('[jsname="M2UYVd"]').click(); $('[jsname="UjXomb"]').click(); }, 1000);
				};
			break;
		case "login-gmail-email":
				document.querySelectorAll("[jscontroller=\"soHxf\"]")[2].click();
				setTimeout(() => {
					document.querySelectorAll("[jscontroller=\"PHUIyb\"] li")[0].click();
				}, 1000);
			break;
		case "email-register":
				document.querySelectorAll("[name=\"firstName\"]")[0].value = dataTask.first_name;
				document.querySelectorAll("[name=\"lastName\"]")[0].value = dataTask.last_name;

				if (document.querySelectorAll("[name=\"Username\"]")[0].getAttribute("aria-label") != "Username")
				{
					document.querySelectorAll('[jscontroller="soHxf"]')[0].click();
				};

				document.querySelectorAll("[name=\"Username\"]")[0].value = dataTask.email.split("@")[0];
				document.querySelectorAll("[name=\"Passwd\"]")[0].value = dataTask.password;
				document.querySelectorAll("[name=\"ConfirmPasswd\"]")[0].value = dataTask.password;

				setTimeout(() => {
					document.querySelectorAll("[jscontroller=\"soHxf\"]")[1].click();
					setTimeout(() => {
						start_register();
					}, 2000);
				}, 2000);
			break;
		case "email-recoveryEmail":
				document.querySelectorAll("[name=\"recoveryEmail\"]")[0].value = dataTask.cover_email;
				document.querySelectorAll("[name=\"year\"]")[0].value = Math.floor(Math.random() * 10) + 1997;
				document.querySelectorAll("#month")[0].value = Math.floor(Math.random() * 12) + 1;
				document.querySelectorAll("[name=\"day\"]")[0].value = Math.floor(Math.random() * 29) + 1;
				document.querySelectorAll("#gender")[0].value = Math.floor(Math.random() * 3) + 1;
				document.querySelectorAll('#phoneNumberId')[0].value = "";

				setTimeout(() => {
					document.querySelectorAll("[jscontroller=\"soHxf\"]")[0].click();
					setTimeout(() => {
						start_register();
					}, 10 * 1000);
				}, 2000);
			break;
		case "email-webpersonaldetails":
				setTimeout(() => {
					document.querySelectorAll("[jscontroller=\"soHxf\"]")[1].click();
				}, 2000);
			break;
		case "email-recoveryPhone":
				if (dataTask.very_phone == "True")
				{
					if (document.querySelectorAll('[jsname="B34EJ"]').length > 0 && document.querySelectorAll('[jsname="B34EJ"]')[0].textContent != "")
					{ // Error phone //
						SMSviotp.getPhone(() => {
							document.querySelectorAll("#phoneNumberId")[0].value = "84" + SMSviotp.phone;

							setTimeout(() => {
								document.querySelectorAll('[jscontroller="soHxf"]')[0].click();

								setTimeout(() => {
									start_register();
								}, 2 * 1000);
							}, 2 * 1000);
						});
					} else {
						document.querySelectorAll('[jscontroller="yRXbo"] [jsname="oYxtQd"]')[0].click();
						setTimeout(() => {
							document.querySelectorAll('[jsname="rymPhb"] li[data-value="vn"]')[0].click();

								SMSviotp.getPhone(() => {
								document.querySelectorAll("#phoneNumberId")[0].value = "84" + SMSviotp.phone;

								setTimeout(() => {
									document.querySelectorAll('[jscontroller="soHxf"]')[0].click();

									setTimeout(() => {
										start_register();
									}, 2 * 1000);
								}, 2 * 1000);
								
							});
						}, 500);
					};
				} else {
					setTimeout(() => {
						chrome.runtime.sendMessage({
							type: "page-ajax",
							url: host + "/api/event/message",
							data: { key: dataTask.key, type: "next_gmail", data: "" },
							method: "POST"
						}, function () {
							chrome.runtime.sendMessage({
								type: "close-all"
							});
						});
					}, 10 * 1000);
				};
				
			break;
		case "very_phone_code":
				SMSviotp.getCode((code) => {
					if (code !== false)
					{
						document.querySelectorAll("#code")[0].value = code;
						
						setTimeout(() => {
							document.querySelectorAll('[jscontroller="soHxf"]')[0].click();
							start_register();
						}, 2000);
					} else {
						setTimeout(() => {
							start_register();
						}, 2000);
					};
				});
			break;
		case "create_channel":
				if ($("#create-channel-button").length > 0)
				{
					$("#create-channel-button").click();
				} else {
					$(".create-channel-submit").click();
				};

				setTimeout(function () {
					window.location.href = "https://www.youtube.com/";
				}, 2000);
			break; 
		default:
				console.log("-- null type --");
			break;
	};
};

function load_channel()
{
	chrome.runtime.sendMessage({
		type: "youtube-get-cookie",
	}, function (cookie) {
		chrome.runtime.sendMessage({
			type: "page-ajax",
			url: host + "/api/event/message",
			data: { key: dataTask.key, type: "response_channel_cookie", data: dataTask.channel +"|"+ cookie + "|" + navigator.userAgent },
			method: "POST"
		}, function () {
			chrome.runtime.sendMessage({
				type: "close-all"
			});
		});
	});
};

function getCountPll(callback)
{
	$.ajax({
	    type: "POST",
	    url: "https://studio.youtube.com/youtubei/v1/creator/list_creator_playlists?alt=json&key=AIzaSyBUPetSUmoZL-OhlxA7wSac5XinrygCqMo",
	    data: `{"channelId":"`+ dataTask.channel +`","pageSize":10,"includePlaylistsTotalSize":true,"mask":{"description":true,"playlistId":true,"playlistThumbnail":{"all":true},"title":true,"videosCount":true,"lastTimeUpdated":{"all":true},"visibilitySetting":true,"watchUrl":true},"context":{"client":{"clientName":62,"clientVersion":"1.20210223.01.00","hl":"en","gl":"VN","experimentsToken":"","utcOffsetMinutes":420},"request":{"returnLogEntry":true,"internalExperimentFlags":[{"key":"force_route_delete_playlist_to_outertube","value":"false"}]},"user":{"delegationContext":{"externalChannelId":"`+ dataTask.channel +`","roleType":{"channelRoleType":"CREATOR_CHANNEL_ROLE_TYPE_OWNER"}},"serializedDelegationContext":"EhhVQ1JRZExLM2FVeC1fc2pUTFhvOW9RTHcqAggI"},"clientScreenNonce":"MC4wMDE3OTMzMDUwOTgxODg2NDY3"},"delegationContext":{"externalChannelId":"`+ dataTask.channel +`","roleType":{"channelRoleType":"CREATOR_CHANNEL_ROLE_TYPE_OWNER"}}}`,
	    contentType: "application/json; charset=utf-8",
	    headers: {
	    	authorization: "SAPISIDHASH "+ SAPISIDHASH()
	    },
	    dataType: "json",
	    success: function (data1) {
	    	callback(data1);
	    },
	    error: function (request, status, errorThrown) {
	    	getCountPll(callback);
	    }
	});
};

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
};


function typePage()
{
	if (document.querySelector("title") != null)
		document.querySelector("title").textContent = "login "+ dataTask.email;

	if (document.URL.indexOf("challenge/ootp") != -1 && document.querySelectorAll("[name=\"ootpPin\"]").length > 0)
	{
		return "very_app_login";
	} else
	if (document.URL.indexOf("myaccount.google.com/intro/find-your-phone") != -1) {
		return "find-your-phone";
	} else 
	if (document.URL.indexOf("/interstitials/birthday") != -1)
	{
		return "update_birthday";
	} else
	if (document.URL.indexOf("signup/v2/webcreateaccount") != -1 && document.querySelectorAll("[name=\"firstName\"]").length > 0)
	{
		return "email-register";
	} else
	if (document.URL.indexOf("signup/v2/webpersonaldetails") != -1 && document.querySelectorAll("[name=\"recoveryEmail\"]").length > 0)
	{
		return "email-recoveryEmail";
	} else
	if (document.URL.indexOf("signup/v2/webgradsidvphone") != -1 && document.querySelectorAll("#phoneNumberId").length > 0)
	{
		return "email-recoveryPhone";
	} else
	if (document.URL.indexOf("signup/v2/webtermsofservice") != -1)
	{
		return "email-webpersonaldetails";
	} else
	if (document.URL.indexOf("myaccount.google.com") != -1)
	{
		document.location.href = 'https://www.youtube.com/';
	} else
	if (document.querySelectorAll('[name="ca"]').length > 0 && document.querySelectorAll('#captchaimg').length > 0 && document.querySelectorAll('#captchaimg')[0].getAttribute("src") != null) {
		return "captchaImg";
	} else
	if (document.URL.indexOf("https://accounts.google.com/signin/v2/disabled") != -1 || document.URL.indexOf("https://support.google.com/accounts/answer/") != -1 || ( document.querySelectorAll('[jsname="V67aGc"]').length > 0 && document.querySelectorAll('[jsname="V67aGc"]')[0].textContent == "Try to restore" ))
	{
		return "disabled_youtube";
	} if (document.URL.indexOf("https://accounts.google.com/ServiceLogin/webreauth") != -1) {
		return "disabled_youtube_next";
	} else
	if (document.URL.indexOf("https://accounts.google.com/b/0/PlusPageSignUp") != -1 && document.querySelectorAll('.i18n_phone_number_input-input').length > 0) {
		return "very_phone_plus_channel";
	}
	if (document.URL.indexOf("https://accounts.google.com/b/0/PlusPageSignUp") != -1) {
		return "create_plus_channel";
	} else
	if (document.URL.indexOf("u/0/device-activity") != -1)
	{
		return "device_activity";
	} else
	if (document.URL.indexOf("www.youtube.com/create_channel") != -1 || document.URL.indexOf("www.youtube.com/?channel_creation_token") != -1)
	{
		return "create_channel";
	} else
	if (document.querySelectorAll("[jscontroller=\"ilZBgf\"]").length > 0)
	{
		return "Verify_mobile_apps";
	} else
	if (document.querySelectorAll('[jsname="Ud7fr"]').length > 0 && document.querySelectorAll('[jsname="Ud7fr"]')[0].textContent == "Too many failed attempts" && document.querySelectorAll('[jsname="ponBce"]').length > 0)
	{
		return "Verify_mobile_apps_2";
	} else
	if (document.URL.indexOf("/u/0/signinoptions/password") != -1)
	{
		return "change_password";
	} else
	if (document.URL.indexOf("u/0/find-your-phone-guide") != -1)
	{
		return "find-your-phone-guide";
	} else
	if (document.URL.indexOf("/u/0/find-your-phone") != -1)
	{
		if (document.querySelectorAll('[jsname="qAWA2"]').length > 0)
		{
			document.querySelectorAll('[jsname="qAWA2"]')[0].click();
		} else 
		if (document.querySelectorAll('[jsname="OCpkoe"]').length == 0) {
			window.location.href = "https://youtube.com";
		};
	} else 
	if (document.querySelectorAll("#phoneNumberId").length > 0) {
		return "very_phone";
	} else
	if (document.querySelectorAll('[data-success-cms-tube]').length > 0)
	{
		return "check_gmail_success";
	} else
	if (document.URL.indexOf("utm_source=sign_in_no_continue") != -1)
	{
		return "sign-in-no-continue";
	} else 
	if (document.querySelectorAll("[name=\"deviceAddress\"]").length > 0)
	{
		return "very_phone";
	} else 
	if (document.querySelectorAll('#smsUserPin').length > 0 || document.querySelectorAll('[name="code"]').length > 0)
	{
		return "very_phone_code";
	} else
	if (document.querySelectorAll('#submit_approve_access').length > 0)
	{
		return "approve-access-youtube-oauth";
	} else
	if (document.querySelectorAll('[data-custom-id="oauthScopeDialog-allow"]').length > 0)
	{
		return "pre-youtube-oauth";
	} else
	if (document.querySelectorAll('[data-identifier="'+ dataTask.email +'"]').length > 0)
	{
		return "user-youtube-oauth";
	} else
	if (document.querySelectorAll('[jsname="BO4nrb"]').length > 0)
	{
		return "anti-youtube-oauth";
	} else
	if (document.querySelectorAll('[name="knowledgePreregisteredEmailResponse"]').length > 0)
	{
		return "login-gmail-very-comfim";
	} else
	if (document.querySelectorAll('[data-challengetype="12"]').length > 0)
	{
		return "login-gmail-very";
	} else
	if (document.querySelectorAll('[data-challengetype="4"]').length > 0 || document.querySelectorAll('[jscontroller="CzF6me"]').length > 0)
	{
		return "login-gmail-tab-very";
	} else
	if (document.querySelectorAll('[name="identifier"]').length > 0)
	{
		return "login-gmail-email";
	} else
	if (document.querySelectorAll('[name="password"]').length > 0)
	{
		return "login-gmail-password";
	} else
	if (document.querySelectorAll('[autocomplete="new-password"]').length > 0 && document.querySelectorAll('[name="firstName"]').length == -1)
	{
		return "new-password";
	} else
	if (document.querySelectorAll("[jsname=\"V67aGc\"]").length > 0)
	{
		return "recover-fail";
	} else
	if (document.querySelectorAll("#avatar-btn").length==0)
	{
		if (document.URL.indexOf("gds.google.com") != -1)
			window.location.href = "https://youtube.com";
		else
			return "home-youtube";
	} else
	if (document.querySelectorAll("#avatar-btn").length==1)
	{
		return "user-youtube";
	};
};

var typeNum = {};

function getCountChannel(callback)
{
	var html = document.createElement("html");
    $.get("https://www.youtube.com/channel_switcher?next=%2Faccount&feature=settings", function (bodyHtml) {
        html.innerHTML = bodyHtml;
        var countChannel = html.querySelectorAll("#contents ytd-account-item-renderer").length;
        callback(countChannel);
    });
};

function makeid(length) {
   var result           = '';
   var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   var charactersLength = characters.length;
   for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
};

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
};

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};
