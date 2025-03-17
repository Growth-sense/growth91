import "./encryptionHelper";
import encryptionHelper from "./encryptionHelper";

let encryptedKeys = [
  "Parent_investor_id",
  "Parent_investor_email",
  "Parent_investor_kycstatus",
  "Parent_investor_name",
  "investor_id",
  "founder_id",
  "investor_email",
  "founder_email",
  "investor_kycstatus",
  "founder_kycstatus",
  "investor_name",
  "founder_name",
];

const originalLocalStorage = {
  getItem: window.localStorage.getItem.bind(window.localStorage),
  setItem: window.localStorage.setItem.bind(window.localStorage),
  removeItem: window.localStorage.removeItem.bind(window.localStorage),
  clear: window.localStorage.clear.bind(window.localStorage),
  key: window.localStorage.key.bind(window.localStorage),
  length: window.localStorage.length,
};

// Create a wrapper around localStorage
const secureStorage = {
  isEncrypted: (str) => {
    try {
      let decrypted = encryptionHelper.decrypt(str);
      return !!decrypted;
    } catch (err) {
      return false;
    }
  },

  // Override setItem to encrypt data before storing
  setItem: (key, value) => {
    console.log("Set item called with ", key, value);
    try {
      if (encryptedKeys.includes(key)) {
        value = encryptionHelper.encrypt(JSON.stringify(value));
      }
      originalLocalStorage.setItem(key, value);
    } catch (err) {
      console.error("Error encrypting data:", err);
    }
  },

  // Override getItem to decrypt data after retrieval
  getItem: (key) => {
    try {
      if (!encryptedKeys.includes(key)) {
        let value = originalLocalStorage.getItem(key);
        if(key == "admin_login"){
            let json_Admin = JSON.parse(value);
            if(json_Admin['expiry'] < new Date().getTime()){
                localStorage.removeItem("admin_login");
                return null;
            }
            return value;
        }
        
        return originalLocalStorage.getItem(key);
      }

      // if key doesn't exist return null
      const value = originalLocalStorage.getItem(key);
      
      if (!value) {
        console.log("Value null, Get item called with ", key, value);
        return null;
      }
      // if key exist it shoule be encrypted
      if (secureStorage.isEncrypted(value)) {
        let decryptedValue = JSON.parse(encryptionHelper.decrypt(value));
        console.log("Value Encrypted, Get item called with ", key, decryptedValue);
        return decryptedValue;
      } else {
        console.log("Value not Encrypted, Get item called with ", key, value);
        return value;
      }
    } catch (err) {
      return null;
    }
  },

  // Keep other methods the same
  removeItem: (key) => originalLocalStorage.removeItem(key),
  clear: () => originalLocalStorage.clear(),
  key: (index) => originalLocalStorage.key(index),
  length: originalLocalStorage.length,
};

// Monkey patch the global localStorage object
Object.defineProperty(window, "localStorage", {
  value: secureStorage,
  configurable: true,
  enumerable: true,
  writable: true,
});

export default secureStorage;
