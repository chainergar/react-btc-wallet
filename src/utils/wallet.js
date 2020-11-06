export function getWalletInfo(email, pass) {
  var s = email;
  s += '|'+pass+'|';
  s += s.length+'|!@'+((pass.length*7)+email.length)*7;
  var regchars = (pass.match(/[a-z]+/g)) ? pass.match(/[a-z]+/g).length : 1;
  var regupchars = (pass.match(/[A-Z]+/g)) ? pass.match(/[A-Z]+/g).length : 1;
  var regnums = (pass.match(/[0-9]+/g)) ? pass.match(/[0-9]+/g).length : 1;
  s += ((regnums+regchars)+regupchars)*pass.length+'3571';
  s += (s+''+s);

  for(let i=0;i<=50;i++){
    s = Crypto.SHA256(s);
  }

  window.coinjs.compressed = true;
  var keys = window.coinjs.newKeys(s);
  var address = keys.address;
  var wif = keys.wif;
  var pubkey = keys.pubkey;
  var privkeyaes = window.CryptoJS.AES.encrypt(keys.wif, pass);
  var sw = window.coinjs.segwitAddress(pubkey)

  return {
    address,
    wif,
    pubkey,
    privkeyaes,
    sw
  }
}