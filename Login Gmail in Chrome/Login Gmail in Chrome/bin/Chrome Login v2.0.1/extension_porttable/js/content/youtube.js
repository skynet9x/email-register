var dataTask;
var dataConfig;
var access_token = "";
var Global = {};
var playlists_data = "";
var sms = null;

DB.get({ dataConfig: {}, tab: false, task: false, phone: {} }, function (item)
{
	Global = item;
	dataTask = item.task;
	console.log(dataTask);
	dataConfig = item.dataConfig;
	sms = new chothuesimcode("068bf268", item.phone.id);

	chrome.runtime.sendMessage({
		type: "tab-info"
	}, function (tabID)
	{
		if (item.tab.id == tabID)
		{
			switch (dataTask.task)
			{
				case "login_check":
						$(document).ready(function ()
						{
							if (document.querySelectorAll('[data-success-cms-tube]').length > 0)
							{
								chrome.runtime.sendMessage({
									type: "close-all"
								});
							} else {
								setTimeout(function () {
									xuly();
								}, 2000);
							};
						});
					break;
				case "seting_channel":
						if (document.URL.indexOf("https://studio.youtube.com/channel/"+ dataTask.channel +"/playlists?o=U") == -1)
						{
							onload_playlist_create();
						} else {
							$(document).ready(function ()
							{
								setTimeout(function ()
								{
									setting_channel();
								}, 4000);
							});
						};
					break;
				case "gmail_register":
						// init Elem //
						console.log("Gmail register...");
						if (document.URL.indexOf("https://accounts.google.com/signup/v2/webcreateaccount") == -1)
						{
							window.location.href = "https://accounts.google.com/signup/v2/webcreateaccount";
						} else {
							start_register();
						};
						
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
		
		default:
				console.log("-- null type --");
			break;
	};
};

function setting_channel()
{
	document.querySelector("title").textContent = "setting "+ dataTask.email;
	chrome.runtime.sendMessage({
		type: "page-ajax",
		url: host + "/api/event/message",
		data: { key: dataTask.key, type: "click_input", data: "setting "+ dataTask.email },
		method: "POST"
	}, function () {
		document.querySelectorAll("#settings-item")[0].click();
		setTimeout(function () {
			document.querySelectorAll("#uploads")[2].click();
			setTimeout(function () {
				document.querySelectorAll("#trigger")[3].click();
				setTimeout(function () {
					document.querySelectorAll("#text-item-1")[0].click();
					setTimeout(function () {
					document.querySelectorAll("#submit-button")[0].click();
						setTimeout(function () {
							chrome.runtime.sendMessage({
								type: "page-ajax",
								url: host + "/api/event/message",
								data: { key: dataTask.key, type: "next_gmail"},
								method: "POST"
							}, function () {
								chrome.runtime.sendMessage({
									type: "close-all"
								});
							});
						}, 10 * 1000);
					}, 1000);
				}, 500);
				
			}, 1000);
		}, 1000);

		setTimeout(function () {
			window.localtion.reload();
		}, 60 * 1000);
	});
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
	if (document.querySelectorAll('[autocomplete="new-password"]').length > 0)
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

function xuly()
{
	var type = typePage();
	console.log(type);


	if (typeof typeNum[type] == "undefined")
		typeNum[type] = 1;
	else
		typeNum[type] += 1;

	if (typeNum[type] > 10) {
		typeNum[type] = 0;
		window.location.href = "https://www.youtube.com";
	};

	switch(type)
	{
		case "check_gmail_success":
				
			break;
		case "recover-fail":
				window.location.href = "https://youtube.com";
			break;
		case "Verify_mobile_apps":
				setTimeout(function (){ xuly(); }, 10 * 1000);
				document.querySelectorAll("[jsname=\"V67aGc\"]")[1].click();
			break;
		case "Verify_mobile_apps_2":
				document.querySelectorAll('[jsname="ponBce"]')[0].click();
				setTimeout(function () { 
					$('[data-challengetype="12"]').click();
					setTimeout(function (){ xuly(); }, 4000);
				}, 4000);
			break;
		case "very_phone":
				// get phone //
				// var booVeryPhone = false;
				// function veryPhoneLoop()
				// {
				// 	if (!booVeryPhone)
				// 	{
				// 		sms.getPhone(function () {
				// 			if (document.querySelectorAll('[name="deviceAddress"]').length > 0)
				// 			{
				// 				document.querySelectorAll('[name="deviceAddress"]')[0].value = sms.phone;
				// 			} else {
				// 				document.querySelector("#phoneNumberId").value = sms.phone;
				// 			};

				// 			DB.set({ phone: { number: sms.phone, id: sms.id } }, function () {});

				// 			setTimeout(() => {
				// 				if (document.querySelectorAll('[name="SendCode"]').length > 0)
				// 				{
				// 					document.querySelectorAll('[name="SendCode"]')[0].click();
				// 				} else {
				// 					document.querySelectorAll("[jsname=\"LgbsSe\"]")[1].click();
				// 				};
								
				// 				setTimeout(() => {
				// 					if (document.querySelectorAll("[jsname=\"B34EJ\"]")[0].textContent.trim() != "")
				// 					{
				// 						booVeryPhone = false;
				// 					} else {
				// 						booVeryPhone = true;
				// 					};

				// 					veryPhoneLoop();
				// 				}, 10 * 1000);
				// 			}, 1000);
				// 		});
				// 	} else {
				// 		setTimeout(function (){ xuly(); }, 1000);
				// 	};
				// };

				// veryPhoneLoop();

				chrome.runtime.sendMessage({
					type: "page-ajax",
					url: host + "/api/event/message",
					data: { key: dataTask.key, type: "task_response", data: dataTask.email +"|"+ dataTask.password + "|" + dataTask.cover_email +"|very_phone"},
					method: "POST"
				}, function () {
					chrome.runtime.sendMessage({
						type: "close-all"
					});
				});
			break;
		case "very_phone_code":
				var booVery = false;
				function veryPhoneCodeLoop()
				{
					if (!booVery)
					{
						sms.getCode(function (code) {
							if (document.querySelectorAll('[name="smsUserPin"]').length > 0)
							{
								document.querySelectorAll('[name="smsUserPin"]')[0].value = sms.code;
							} else {
								document.querySelectorAll('[name="code"]')[0].value = sms.code;
							};

							setTimeout(() => {
								if (document.querySelectorAll('[name="VerifyPhone"]').length > 0)
								{
									document.querySelectorAll('[name="VerifyPhone"]')[0].click();
								} else {
									document.querySelectorAll('[jsname="LgbsSe"]')[0].click();
								};
								
								setTimeout(() => {
									booVery = true;
									veryPhoneCodeLoop();
								}, 5 * 1000);
							}, 1000);
						});
					} else {
						setTimeout(function (){ xuly(); }, 1000);
					};
				};

				veryPhoneCodeLoop();
			break;
		case "disabled_youtube":
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
			break;
		case "disabled_youtube_next":
				setTimeout(function (){ xuly(); }, 4000);
				document.querySelectorAll("[jscontroller=\"soHxf\"]")[0].click();
			break;
		case "device_activity":
				var lists = document.querySelectorAll("[jscontroller='staXac'] [role='listitem']");
				if (lists.length == 1)
				{
					window.location.href = "https://youtube.com";
				} else {
					
				};
			break;
		case "update_birthday":
				document.querySelectorAll('[jsname="YPqjbf"]')[1].value = getRandomInt(1980, 2005);
				document.querySelectorAll('[jsname="YPqjbf"]')[0].value = getRandomInt(1, 30);
				document.querySelectorAll('[jsname="oYxtQd"]')[0].click();
				setTimeout(() => {
					document.querySelectorAll('[jsname="K4r5Ff"]')[getRandomInt(0, 12)].click();
						setTimeout(() => {
							document.querySelectorAll('[jsname="x8hlje"]')[0].click();
							setTimeout(() => {
								document.querySelectorAll('[jsname="x8hlje"]')[0].click();
								setTimeout(() => {
									document.querySelectorAll('[data-mdc-dialog-action="ok"]')[0].click();

									setTimeout(() => {
										document.querySelectorAll('[jsname="V67aGc"]')[4].click();
										setTimeout(function (){ xuly(); }, 1000);
									}, 1000)
								}, 3000);
							}, 2000);
						}, 1000);
				}, 1000);
				
			break;
		case "change_password":
				var passwd = makeid(24);
				$("[name=\"password\"]").val(passwd);
				$("[name=\"confirmation_password\"]").val(passwd);

				document.querySelectorAll('[jsname="XTYNyb"]')[0].click();
				setTimeout(function (){xuly();}, 5000);
			break;
		case "new-password":
				var passwd = makeid(24);
				$("[name=\"Passwd\"]").val(passwd);
				$("[name=\"ConfirmPasswd\"]").val(passwd);

				document.querySelectorAll('[jsname="LgbsSe"]')[0].click();
				setTimeout(function (){ xuly(); }, 5000);
			break;
		case "captchaImg":
				var imgUrl = document.querySelectorAll('#captchaimg')[0].getAttribute("src");
				chrome.runtime.sendMessage({
					type: "decaptcha",
					img_captcha: imgUrl
				}, function (res) {
					console.log(res);
				});
			break;
		case "_page_captcha":
				chrome.runtime.sendMessage({
					type: "page-ajax",
					url: host + "/api/event/message",
					data: { key: dataTask.key, type: "task_response", data: dataTask.email +"|"+ dataTask.password + "|" + dataTask.cover_email +"|captcha"},
					method: "POST"
				}, function () {
					chrome.runtime.sendMessage({
						type: "close-all"
					});
				});
			break;
		case "find-your-phone":
				chrome.runtime.sendMessage({
					type: "page-ajax",
					url: host + "/api/event/message",
					data: { key: dataTask.key, type: "task_response", data: dataTask.email +"|"+ dataTask.password + "|" + dataTask.cover_email +"|find-your-phone"},
					method: "POST"
				}, function () {
					chrome.runtime.sendMessage({
						type: "close-all"
					});
				});
			break;
		case "very_app_login":
				document.location.href="https://myaccount.google.com/u/0/find-your-phone";
			break;
		case "find-your-phone-guide":
				if (document.querySelectorAll('[jscontroller="VXdfxd"]').length == 10)
					document.querySelectorAll('[jscontroller="VXdfxd"]')[5].click();
				if (document.querySelectorAll('[jscontroller="VXdfxd"]').length == 6)
					document.querySelectorAll('[jscontroller="VXdfxd"]')[3].click();
				setTimeout(function (){ document.querySelectorAll('[jsname="OCpkoe"]')[1].click(); }, 1000);
			break;
		case "sign-in-no-continue":
				window.location.href = host + "/applocation/oauth";
			break;
		case "approve-access-youtube-oauth":
				document.querySelectorAll('#submit_approve_access')[0].click();
				setTimeout(function (){ xuly(); }, 1000);
			break;
		case "pre-youtube-oauth":
				document.querySelectorAll('[data-custom-id="oauthScopeDialog-allow"]')[0].click();
				setTimeout(function (){xuly();}, 1000);
			break;
		case "anti-youtube-oauth":
				$("body").append(`<script>document.querySelectorAll('[jsname="BO4nrb"]')[0].click(); document.querySelectorAll('[jsname="ehL7e"]')[0].click();</script>`);
				setTimeout(function (){xuly();}, 1000);
			break;
		case "user-youtube-oauth":
				$('[jsname="MBVUVe"]').click();
				setTimeout(function (){xuly();}, 1000);
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

							

							// setTimeout(function () {
							// // get Count Channel //
							// if (document.URL.indexOf("very=phone") != -1 )
							// {
							// 	var html = document.createElement("html");
							// 		$.get("https://www.youtube.com/channel_switcher?next=%2Faccount&feature=settings", function (bodyHtml) {
							// 		    html.innerHTML = bodyHtml;
							// 		    var len = html.querySelectorAll("#ytcc-existing-channels .channel-switcher-button a").length;
							// 		    var ElmList = html.querySelectorAll("#ytcc-existing-channels .channel-switcher-button a");
							// 		    var iElmList = 1;
							// 		    function loop()
							// 		    {
							// 		    	if (iElmList < len)
							// 		    	{
							// 		    		var href = ElmList[iElmList].getAttribute("href");
							// 		    		$.get(href, function ()
							// 		    		{
									    			
							// 		    			chrome.runtime.sendMessage({ type: "page-ajax", method: "GET",url: "https://studio.youtube.com/", data: {}, headers: {} },
							// 						function (bodyHTML) {
							// 							var	ChannelID = "";
							// 		    				var tmp = bodyHTML.match(/externalChannelId":"([a-zA-Z0-9_-]{24})"/g);
							// 		    				var channelData = tmp[0].match(/externalChannelId":"([a-zA-Z0-9_-]{24})"/i);
							// 			    				ChannelID = channelData[1];
							// 		    				chrome.runtime.sendMessage({ type: "youtube-get-cookie" },
							// 							function (cookies) {
							// 								chrome.runtime.sendMessage({
							// 									type: "page-ajax",
							// 									url: host + "/api/event/message",
							// 									data: { key: dataTask.key, type: "send_channel", data: ChannelID +"|"+ cookies},
							// 									method: "POST"
							// 								}, function () {
							// 									iElmList++;
							// 									loop();
							// 								});
							// 							});
							// 						});
							// 		    		});
							// 		    	} else {
							// 		  			chrome.runtime.sendMessage({
							// 						type: "page-ajax",
							// 						url: host + "/api/event/message",
							// 						data: { key: dataTask.key, type: "next_gmail", data: ""},
							// 						method: "POST"
							// 					}, function () {
							// 						chrome.runtime.sendMessage({
							// 							type: "close-all"
							// 						});
							// 					});
							// 		    	};
							// 		    };
							// 		    loop();
							// 		});
							// 	} else {
							// 		getCountChannel(function (CountChannel)
							// 		{
							// 			// console.log(CountChannel);
							// 			// if (CountChannel < dataTask.channel_count)
							// 			// {
							// 			// 	// Create //
							// 			// 	window.location.href = "https://www.youtube.com/create_channel?action_create_new_channel_redirect=true";
							// 			// 	setTimeout(function (){ xuly(); }, 4000);
							// 			// } else {
							// 			// 	var html = document.createElement("html");
							// 			// 	$.get("https://www.youtube.com/channel_switcher?next=%2Faccount&feature=settings", function (bodyHtml) {
							// 			// 	    html.innerHTML = bodyHtml;
							// 			// 	    var len = html.querySelectorAll("#ytcc-existing-channels .channel-switcher-button a").length;
							// 			// 	    var ElmList = html.querySelectorAll("#ytcc-existing-channels .channel-switcher-button a");
							// 			// 	    var iElmList = 1;
							// 			// 	    function loop()
							// 			// 	    {
							// 			// 	    	if (iElmList < len)
							// 			// 	    	{
							// 			// 	    		var href = ElmList[iElmList].getAttribute("href");
							// 			// 	    		$.get(href, function ()
							// 			// 	    		{
							// 			// 	    			chrome.runtime.sendMessage({ type: "page-ajax",method: "GET",url: "https://studio.youtube.com/", data: {}, headers: {} },
							// 			// 					function (bodyHTML) {
							// 			// 						var	ChannelID = "";
							// 			// 	    				var tmp = bodyHTML.match(/externalChannelId":"([a-zA-Z0-9_-]{24})"/g);
							// 			// 	    				var channelData = tmp[0].match(/externalChannelId":"([a-zA-Z0-9_-]{24})"/i);
							// 			// 		    				ChannelID = channelData[1];
							// 			// 	    				chrome.runtime.sendMessage({ type: "youtube-get-cookie" },
							// 			// 						function (cookies) {
							// 			// 							chrome.runtime.sendMessage({
							// 			// 								type: "page-ajax",
							// 			// 								url: host + "/api/event/message",
							// 			// 								data: { key: dataTask.key, type: "send_channel", data: ChannelID +"|"+ cookies},
							// 			// 								method: "POST"
							// 			// 							}, function () {
							// 			// 								iElmList++;
							// 			// 								loop();
							// 			// 							});
							// 			// 						});
							// 			// 					});
							// 			// 	    		});
							// 			// 	    	} else {
							// 			// 	  			chrome.runtime.sendMessage({
							// 			// 					type: "page-ajax",
							// 			// 					url: host + "/api/event/message",
							// 			// 					data: { key: dataTask.key, type: "next_gmail", data: "" },
							// 			// 					method: "POST"
							// 			// 				}, function () {
							// 			// 					chrome.runtime.sendMessage({
							// 			// 						type: "close-all"
							// 			// 					});
							// 			// 				});
							// 			// 	    	};
							// 			// 	    };
							// 			// 	    loop();
							// 			// 	});
							// 			// };
							// 		});
							// 	};
							// }, 2000);
						};
					}, 5000);
				};
			break;
		case "create_plus_channel":
				$('[name="PlusPageName"]').val(makeid(5) + " " + makeid(10) + " " + makeid(4));
				setTimeout(function () {
					$('#submitbutton').click();
				}, 1000);
			break;
		case "very_phone_plus_channel":
				window.location.href="https://www.youtube.com/?very=phone";
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
					setTimeout(function () { $('[jsname="M2UYVd"]').click(); $('[jsname="UjXomb"]').click(); xuly(); }, 1000);
				};
			break;
		case "login-gmail-email":
				chrome.runtime.sendMessage({
					type: "page-ajax",
					url: host + "/api/event/message",
					data: { key: dataTask.key, type: "click_input", data: "login "+ dataTask.email },
					method: "POST"
				}, function () {
					$('[name="identifier"]').val(dataTask.email);
					$('[name="password"]').val(dataTask.password);
					$('#identifierNext').click();
					$('#passwordNext').click();
					if (document.querySelectorAll('[jscontroller="bA7b2c"]').length > 0)
					{
						document.querySelectorAll('[jscontroller="bA7b2c"]')[0].click();
					};
					
					setTimeout(function () { 
						if (document.querySelectorAll('[jsname="h9d3hd"]').length > 0 && document.querySelectorAll('[jsname="h9d3hd"]')[0].textContent != "")
						{
							chrome.runtime.sendMessage({
								type: "page-ajax",
								url: host + "/api/event/message",
								data: { key: dataTask.key, type: "task_response", data: dataTask.email +"|"+ dataTask.password + "|" + dataTask.cover_email +"|fail_password"},
								method: "POST"
							}, function () {
								chrome.runtime.sendMessage({
									type: "close-all"
								});
							});
						}
						if (document.querySelectorAll('[jsname="B34EJ"]').length > 0 && document.querySelectorAll('[jsname="B34EJ"]')[0].textContent != "")
						{
							chrome.runtime.sendMessage({
								type: "page-ajax",
								url: host + "/api/event/message",
								data: { key: dataTask.key, type: "task_response", data: dataTask.email +"|"+ dataTask.password + "|" + dataTask.cover_email +"|captcha_password"},
								method: "POST"
							}, function () {
								chrome.runtime.sendMessage({
									type: "close-all"
								});
							});
						} else {
							xuly();
						};
					}, 10 * 1000);
				});
			break;
		case "login-gmail-very":
				$('[data-challengetype="12"]').click();
				setTimeout(function () { xuly(); }, 3000);
			break;
		case "login-gmail-tab-very":
				chrome.runtime.sendMessage({
					type: "page-ajax",
					url: host + "/api/event/message",
					data: { key: dataTask.key, type: "task_response", data: dataTask.email +"|"+ dataTask.password + "|" + dataTask.cover_email +"|phone or tablet"},
					method: "POST"
				}, function () {
					chrome.runtime.sendMessage({
						type: "close-all"
					});
				});
			break;
		case "login-gmail-very-comfim":
				if (typeNum[type] > 1)
				{
					chrome.runtime.sendMessage({
						type: "page-ajax",
						url: host + "/api/event/message",
						data: { key: dataTask.key, type: "task_response", data: dataTask.email +"|"+ dataTask.password + "|" + dataTask.cover_email +"|fail_recovery"},
						method: "POST"
					}, function () {
						chrome.runtime.sendMessage({
							type: "close-all"
						});
					});
				} else {
					$('[name="knowledgePreregisteredEmailResponse"]').val(dataTask.cover_email);
					$('[jsname="Njthtb"]').click();
					setTimeout(function () { 
						$('[jsname="M2UYVd"]').click(); 
						setTimeout(function () { xuly(); }, 10000);
					}, 3000);
				};
			break;
	};
};

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
