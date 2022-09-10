function eventPage () {};

eventPage.prototype.call = function(type, data, callback) {
	chrome.runtime.sendMessage({
		type: type,
		data: data
	}, callback);
};

eventPage.prototype.ajax = function (method, url, data, header, callback)
{
	chrome.runtime.sendMessage({
		type: "page-ajax",
		method: method,
		url: url,
		data: data,
		header: header
	}, callback);
};