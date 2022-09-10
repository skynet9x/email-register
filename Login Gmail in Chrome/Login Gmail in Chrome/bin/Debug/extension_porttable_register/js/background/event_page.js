function toDataURL(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.onload = function() {
    var reader = new FileReader();
    reader.onloadend = function() {
      callback(reader.result);
    }
    reader.readAsDataURL(xhr.response);
  };
  xhr.open('GET', url);
  xhr.responseType = 'blob';
  xhr.send();
};

function dataURLtoFile(dataurl, filename) {
  var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
  bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
  while(n--){
      u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, {type:mime});
};

chrome.runtime.onMessage.addListener(function(request, sender, sendResponseParam) {
  var responseStatus = { bCalled: false };
  function sendResponse(a) { 
      try {
          sendResponseParam(a);
      } catch (e) {
          console.log({error: e});
      }
      responseStatus.bCalled= true;
  };

  switch(request.type) {
    case "tab-info":
      sendResponse(sender.tab.id);
    break;

    case "check_mail_load":
        $.ajax({
            type: "POST",
            url: host + "/api/google/load?email="+ request.email,
            async: false,
            headers: {
              "Authorization": "Bearer " + dataConfig.access_token
          },
          success: sendResponse
        });
      if (!responseStatus.bCalled)
        return true;
    break;

    case "get_video_keyword":
        $.ajax({
            type: "GET",
            url: host + "/api/youtube/video?keyword="+ request.keyword + "&limit="+ request.limit + "&user_id="+ request.user_id,
            async: false,
            headers: {
              "Authorization": "Bearer " + dataConfig.access_token
          },
          success: sendResponse,
          error: function ()
          {
            sendResponse(false);
          }
        });
      if (!responseStatus.bCalled)
        return true;
    break;

    case "tab-create":
      chrome.tabs.create({
        url: request.data.url
      }, function (res)
      {
        JOTab[res.id] = {
          info: res,
          type: request.data.model,
          url: request.data.url
        };
        sendResponse(JOTab[res.id]);
      });
      if (!responseStatus.bCalled)
        return true;
    break;

    case "fb-get-cookie":
      chrome.cookies.getAll({domain: '.facebook.com'}, function(cookies){
          var cookie_str = "";
          var cookie_ary = [];

          $.each(cookies, function (i, item)
          {
            if (item.name != "")
              cookie_ary.push(item.name + "=" + item.value);
          });
          cookie_str = cookie_ary.join(";");
          sendResponse(cookie_str);
      });
      if (!responseStatus.bCalled)
        return true;
      break;

    case "youtube-get-cookie":
      chrome.cookies.getAll({"url": "https://www.youtube.com/"}, function(cookie) {
        var aryCookie = [];
        for (var i = 0; i < cookie.length; i++)
        {
          aryCookie.push(cookie[i].name + "=" + cookie[i].value);
        };
        sendResponse(aryCookie.join("; "));
      });
      if (!responseStatus.bCalled)
        return true;
      break;

    case "page-ajax":
      $.ajax({
        type: request.method,
        url: request.url,
        data: request.data,
        headers: request.header,
        error: function (res) { sendResponse(false) }
      }).done(function (res)
      {
        sendResponse(res);
      });
      
      if (!responseStatus.bCalled)
        return true;
      break;

    case "update_change_password":
        $.ajax({
            type: "POST",
            url: host + "/api/gmail/update/"+ request.email_id,
            data: {
              email_recovery: request.email_recovery,
              password: request.password
            },
            async: false,
            headers: {
              "Authorization": "Bearer " + dataConfig.access_token
          },
          success: sendResponse
        });
        if (!responseStatus.bCalled)
          return true;
      break;

    case "create-request-phone":
        $.get("http://api.simthue.com/request/create?key="+ request.key +"&service_id=37")
        .then(function (res)
        {
          sendResponse(res);
        }, function ()
        {
          sendResponse(false);
        });
        if (!responseStatus.bCalled)
          return true;
      break;

    case "get-request-phone":
        $.get("http://api.simthue.com/request/check?key="+ request.key +"&id="+ request.id)
        .then(function (res)
        {
          sendResponse(res);
        }, function ()
        {
          sendResponse(false);
        });
        if (!responseStatus.bCalled)
          return true;
      break;

    case "decaptcha":
        var formData = new FormData();
        var imageUrl = request.img_captcha;
        
        toDataURL(imageUrl, function (codeBase64) {
          dataURLtoFile(codeBase64, function (file) {
            formData.append('pict', file);
            formData.append('username', "skynet");
            formData.append('password', "a147369852");
            formData.append('function', "picture2");

            $.ajax({
               url : 'http://poster.de-captcher.com',
               type : 'POST',
               data : formData,
               processData: false,  // tell jQuery not to process the data
               contentType: false,  // tell jQuery not to set contentType
               success : function(data) {
                  sendResponse(data);
               }
            });


          });
        });

        if (!responseStatus.bCalled)
          return true;
      break;

    case "close-all":
        chrome.tabs.query({}, function (tabs) {
          for (var i = 0; i < tabs.length; i++) {
              chrome.tabs.remove(tabs[i].id);
          }
        });
      break;
  };
});