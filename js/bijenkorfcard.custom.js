function isAndroid() {
  return navigator.userAgent.toLowerCase().indexOf("android") > -1;
}

function isIOS() {
  return navigator.userAgent.match(/(iPad|iPhone|iPod)/i);
}

function rememberLogin(loginName, password, keepLoggedIn) {
  localStorage.setItem("loginName", loginName);
  localStorage.setItem("password", password);
  localStorage.setItem("keepLoggedIn", keepLoggedIn);
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