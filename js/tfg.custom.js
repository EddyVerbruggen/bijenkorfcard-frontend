"use strict";

// generic catch for errors
window.onerror = function(message, file, line) {
//  alert('Error gevangen: ' + file + ':' + line + '\n' + message);
  console.log('Error gevangen: ' + file + ':' + line + '\n' + message);
};

// override some JQM defaults
$(document).bind("mobileinit", function(){
  $.extend(
      $.mobile, {
        defaultPageTransition: "slide"
      })
});

function getUrlParam(name){
   if(name=(new RegExp('[?&]'+encodeURIComponent(name)+'=([^&]*)')).exec(location.search)) {
     return decodeURIComponent(name[1]);
   } else {
     return null;
   }
}

function isAndroid() {
  return navigator.userAgent.toLowerCase().indexOf("android") > -1;
}

function isIOS() {
  return navigator.userAgent.match(/(iPad|iPhone|iPod)/i);
}

function isMacBookBas() {
  return window.location.hostname == 'tfgbas';
}

function isServerStubMode() {
  return true; // Always using server stub mode for now
  //return window.location.hostname == 'tfg'; // Bas stub mode
}

function getServiceURL(servicePath) {
  // on a device, connect to the testserver, otherwise to the dev machine
  if (isServerStubMode()) {
    return "serverstub" + servicePath + ".json";
  } else {
    if (isAndroid() || isIOS()) {
      return "http://www.thumbrater.com:9006" + servicePath;
    } else if (isMacBookBas()) {
      return "http://localhost:9005" + servicePath;
    } else {
      return "http://www.thumbrater.com:9005" + servicePath;
    }
  }
}

function logout() {
  localStorage.setItem("password", null);
}

function isLoggedIn() {
  return getPassword() != null;
}

function registerTfgPartner(loginName, password, keepLoggedIn) {
  localStorage.setItem("registeredForApp", true);
  localStorage.setItem("keepLoggedIn", keepLoggedIn);
  localStorage.setItem("password", password);
  localStorage.setItem("loginName", loginName);
}

function isRegisteredTfgPartner() {
  return localStorage.getItem("registeredForApp") == "true";
}

function isKeepLoggedIn() {
  return localStorage.getItem("keepLoggedIn") == "true";
}

function getLoginName() {
  return localStorage.getItem("loginName");
}

function getPassword() {
  return localStorage.getItem("password");
}


/* Method to load the user data from the backend */
function loadUser() {
  // TODO: Sometimes we need to refresh. Do this async?
  if (getUser() == null) {
    $.getJSON(getServiceURL("/user/load/"+getLoginName()))
        .success(function(data) {
          if (data != null) {
            storeUser(data);
          }
        })
        .error(function(XMLHttpRequest, textStatus, errorThrown) {
          if (XMLHttpRequest.status == 0) {
            alert("Server onbereikbaar: " + getServiceURL(""));
          } else {
            alert(textStatus);
          }
        })
  }
}

function storeUser(obj) {
  return localStorage.setItem("user", JSON.stringify(obj));
}

function getUser() {
  var usr = localStorage.getItem("user");
  if (usr == null) {
    return null;
  } else {
    return JSON.parse(usr);
  }
}
