function Facebook (email, password) {
	this.email = email;
	this.password = password;
	this.App = '1576585912599779';
};	

Facebook.prototype.load = function ()
{

};

Facebook.prototype.login = function() {
	
};

Facebook.prototype.getCookie = function(callback) {
	eventPage.call("fb-get-cookie", null, callback);
};

Facebook.prototype.setCookie = function (cookie, callback)
{
	eventPage.call("fb-set-cookie", {
		cookie: cookie
	}, callback);
};

Facebook.prototype.getAccessToken = function(callback) {
	var self = this;
	var idApp = self.App;

	var dtsg=document.getElementsByName("fb_dtsg")[0].value,
	uid=document.cookie.match(/c_user=(\d+)/)[1],
	xhr=new XMLHttpRequest;
	xhr.open("POST","/v1.0/dialog/oauth/confirm",!0),
	xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded"),
	xhr.onreadystatechange=function()
	{
			if (4==xhr.readyState&&200==xhr.status)
				callback(xhr.responseText.match(/access_token=(.*?)&/)[1]);
			else
				callback(false);
	},
	xhr.send("fb_dtsg="+dtsg+"&app_id="+ idApp +"&redirect_uri=fb1576585912599779://authorize&display=page&access_token=&sdk=&from_post=1&private=&tos=&login=&read=&write=&extended=&social_confirm=&confirm=&seen_scopes=&auth_type=&auth_token=&auth_nonce=&default_audience=&ref=Default&return_format=access_token&domain=&sso_device=&__CONFIRM__=1&__user="+uid);
};