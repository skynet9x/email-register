var $db = function () {};
$db.prototype.get = function (val, callback) {
	if (callback) {
	 	chrome.storage.sync.get(val, callback);
	} else {
		chrome.storage.sync.get(val);
	}
};
$db.prototype.set = function (val, callback) {
	if (callback) {
	 	chrome.storage.sync.set(val, callback);
	} else {
		chrome.storage.sync.set(val);
	}
};

$db.prototype.remove = function (val, callback) {
	if (callback) {
	 	chrome.storage.sync.remove(val, callback);
	} else {
		chrome.storage.sync.remove(val);
	}
};

$db.prototype.reload = function () {
	chrome.storage.sync.get(null, function(items) {
	    var allKeys = Object.keys(items);
	    for (var i  = 0; i < allKeys.length;i++) {
	    	if (["uid", "task", "start", "client_id"].indexOf(allKeys[i]) == -1 && allKeys[i].indexOf("sky_") == -1) {
	    		chrome.storage.sync.remove(allKeys[i]);
	    	}
	    }
	});
}
