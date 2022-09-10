class viotp {

  constructor(key, id) {
    this.key = key;
    this.id = id;
    this.phone = null;
    this.code = null;
  };

  getPhone(callback)
  {
  	let self = this;
  	let url = "https://api.viotp.com/request/getv2?token="+ self.key + "&serviceId=3";
  	chrome.runtime.sendMessage({
		type: "page-ajax",
		url: url,
		data: {},
		method: "GET"
	}, function (jsonResponse) {
		if (jsonResponse.status_code == 200)
		{
			self.phone = jsonResponse.data.phone_number;
			self.id = jsonResponse.data.request_id;
		};
		
		callback(self.phone);
	});
  }

  getCode(callback)
  {
  	let self = this;
  	let url = "https://api.viotp.com/session/getv2?requestId="+ self.id +"&token="+ self.key;
  	chrome.runtime.sendMessage({
		type: "page-ajax",
		url: url,
		data: {},
		method: "GET"
	}, function (jsonResponse) {
		if (jsonResponse.status_code == 200) {
			self.code = jsonResponse.data.Code;
			callback(self.code);
		} else {
			callback(false);
		};
	});
  }
}