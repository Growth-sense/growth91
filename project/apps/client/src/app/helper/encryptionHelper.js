import CryptoJS from 'crypto-js';

const SECRET_KEY = 'kIYFZKnwVRkhgFB5nzz3NbAho6ei3Z5v';

const encryptionHelper = {
  encrypt: (value) => {
    try {
      const encrypted = CryptoJS.AES.encrypt(value, SECRET_KEY).toString();
      return encrypted;
    } catch (err) {
      console.error('Error encrypting data:', err);
      return null;
    }
  },

  decrypt: (value) => {
    try {
      const decrypted = CryptoJS.AES.decrypt(value, SECRET_KEY).toString(CryptoJS.enc.Utf8);
      return decrypted;
    } catch (err) {
      console.error('Error decrypting data:', err);
      return null;
    }
  },
};


export default encryptionHelper;