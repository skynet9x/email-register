class chothuesimcode {

  constructor(key, id) {
    this.key = key;
    this.id = id;
    this.phone = null;
    this.code = null;
  };

  getPhone(callback)
  {
  	let self = this;
  	let url = "https://chothuesimcode.com/api?act=number&apik="+ self.key + "&appId=1005";
  	chrome.runtime.sendMessage({
		type: "page-ajax",
		url: url,
		data: {},
		method: "GET"
	}, function (jsonResponse) {
		self.phone = jsonResponse.Result.Number;
		self.id = jsonResponse.Result.Id;
		callback(self.phone);
	});
  }

  getCode(callback)
  {
  	let self = this;
  	let url = "https://chothuesimcode.com/api?act=code&apik="+ self.key +"&id="+ self.id;
  	chrome.runtime.sendMessage({
		type: "page-ajax",
		url: url,
		data: {},
		method: "GET"
	}, function (jsonResponse) {
		console.log(jsonResponse);
		if (jsonResponse.Result.Code) {
			self.code = jsonResponse.Result.Code;
			callback(self.code);
		} else {
			callback(false);
		};
	});
  }
}