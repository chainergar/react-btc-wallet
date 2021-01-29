const axios = require('axios');
const crypto = require('crypto');
const txFee = 0.0001;
const devFee = 0.0001;

export function getWalletInfo(masterKey, masterKey2) {
  var s = masterKey;
  s += '|' + masterKey2 + '|';
  s += s.length + '|!@' + (masterKey2.length * 7 + masterKey.length) * 7;
  var regchars = masterKey2.match(/[a-z]+/g) ? masterKey2.match(/[a-z]+/g).length : 1;
  var regupchars = masterKey2.match(/[A-Z]+/g) ? masterKey2.match(/[A-Z]+/g).length : 1;
  var regnums = masterKey2.match(/[0-9]+/g) ? masterKey2.match(/[0-9]+/g).length : 1;
  s += (regnums + regchars + regupchars) * masterKey2.length + '3571';
  s += s + '' + s;

  for (let i = 0; i <= 50; i++) {
    s = Crypto.SHA256(s);
  }

  window.window.coinjs.compressed = true;
  var keys = window.window.coinjs.newKeys(s);
  var address = keys.address;
  var wif = keys.wif;
  var pubkey = keys.pubkey;
  var privkeyaes = window.CryptoJS.AES.encrypt(keys.wif, masterKey2);
  var sw = window.window.coinjs.segwitAddress(pubkey);

  return {
    address,
    wif,
    pubkey,
    privkeyaes,
    sw
  };
}

export async function getWalletInfoFromAddress(address) {
  try {
    const res = await axios.get(
      `https://blockchain.info/q/addressbalance/${address}`
    );
    // console.log('\n\n === response === \n\n', res);
    return {
      balance: res.data,
    };
  } catch (e) {
    console.log(e);
    return {};
  }
}

export function send(receipant, amount, pubkey, privkey, walletAaddress) {
  var tx = window.coinjs.transaction();
  var devaddr = window.coinjs.developer;
  var devamount = devFee;

  if (devamount > 0) {
    tx.addoutput(devaddr, devamount);
  }

  var total = devamount + txFee;

  if (amount > 0) {
    total += amount * 1;
    tx.addoutput(receipant, amount);
  }

  var script = false;
  // if($("#walletSegwit").is(":checked")){
  // 	if($("#walletSegwitBech32").is(":checked")){
  // 		var sw = window.coinjs.bech32Address($("#walletKeys .pubkey").val());
  // 	} else {
  // 		var sw = window.coinjs.segwitAddress($("#walletKeys .pubkey").val());
  // 	}
  // 	script = sw.redeemscript;
  // }

  var sw = window.coinjs.segwitAddress(pubkey);
  script = sw.redeemscript;

  var sequence = 0xffffffff - 1;
  // if($("#walletRBF").is(":checked")){
  // 	sequence = 0xffffffff-2;
  // }

  tx.addUnspent(walletAaddress, function (data) {
    var dvalue = (data.value / 100000000).toFixed(8) * 1;
    total = (total * 1).toFixed(8) * 1;

    if (dvalue >= total) {
      var change = dvalue - total;
      if (change * 1 > 0) {
        tx.addoutput(walletAaddress, change);
      }

      // clone the transaction with out using window.coinjs.clone() function as it gives us trouble
      var tx2 = window.coinjs.transaction();
      var txunspent = tx2.deserialize(tx.serialize());

      // then sign
      var signed = txunspent.sign(privkey);

      // and finally broadcast!

      tx2.broadcast(function (data) {
        console.log('\n\n\n === broadcast result === \n\n\n', data);
      }, signed);
    } else {
      console.log(
        'You have a confirmed balance of ' +
          dvalue +
          ' BTC unable to send ' +
          total +
          ' BTC'
      );
    }
  }, script, script, sequence);
}
