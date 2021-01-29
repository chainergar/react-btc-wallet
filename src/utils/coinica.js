const crypto = require('crypto');
const algorithm = 'aes-256-ctr';
const iv = crypto.randomBytes(16);

export const encrypt = (text, key) => {
  key = Buffer.from(key, 'hex');
  const cipher = crypto.createCipheriv(algorithm, Buffer.from(key, 'hex'), iv);

  const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);

  return {
    iv: iv.toString('hex'),
    content: encrypted.toString('hex'),
  };
};

export const decrypt = (hash, key) => {
  const decipher = crypto.createDecipheriv(
    algorithm,
    Buffer.from(key, 'hex'),
    Buffer.from(hash.iv, 'hex')
  );

  const decrpyted = Buffer.concat([
    decipher.update(Buffer.from(hash.content, 'hex')),
    decipher.final(),
  ]);

  return decrpyted.toString();
};

export function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

export function setCookie(name, value, path='/') {
  document.cookie = `${name}=${value}; path=${path}`
}

export function deleteCookie(name, path='/') {
  document.cookie = `${name}=; path=${path}`
}

export const getRandomMasterKey = () => {
  const masterKey = crypto.randomBytes(32);
  return masterKey.toString('hex');
};

export const getLocalStoreItem = (name) => {
  try {
    const storageData = JSON.parse(localStorage.getItem(name))
    const hashKey = getCookie(name)
    console.log(storageData, hashKey)
    const decryptedData = decrypt(storageData, hashKey)
    return JSON.parse(decryptedData)
  } catch(e) {
    console.log(e)
    return {}
  }
}

export const setLocalStoreItem = (name, data) => {
  try {
    console.log('setLocalStoreItem: \n', name, data)
    const beforeData = getLocalStoreItem(name)
    console.log('beforeData: \n', beforeData)
    
    data = {
      ...beforeData,
      ...data
    }

    const hashKey = getCookie(name)
    const encryptedData = encrypt(
      JSON.stringify(data), hashKey
    )
    localStorage.setItem(name, JSON.stringify(encryptedData))
  } catch(e) {
    console.log(e)
  }
}