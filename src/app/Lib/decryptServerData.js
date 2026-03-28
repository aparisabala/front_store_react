// utils/decrypt.js
import CryptoJS from 'crypto-js';

const AES_KEY = '=^%7@84%0^!8892-';

export function decryptServerData(encryptedBase64) {
  if (!encryptedBase64 || typeof encryptedBase64 !== 'string') {
    throw new Error('Invalid encrypted string');
  }

  try {
    // Decode Base64
    const encryptedBytes = CryptoJS.enc.Base64.parse(encryptedBase64.trim());

    // AES-128-ECB Decrypt
    const key = CryptoJS.enc.Utf8.parse(AES_KEY);

    const decrypted = CryptoJS.AES.decrypt(
      { ciphertext: encryptedBytes },
      key,
      {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.NoPadding,
      }
    );

    let decryptedStr = decrypted.toString(CryptoJS.enc.Latin1);

    // Remove PKCS7 padding
    const paddingValue = decryptedStr.charCodeAt(decryptedStr.length - 1);
    if (paddingValue > 0 && paddingValue <= 16) {
      decryptedStr = decryptedStr.slice(0, -paddingValue);
    }

    // Extract JSON
    const startIndex = decryptedStr.indexOf('{');
    const endIndex = decryptedStr.lastIndexOf('}') + 1;

    if (startIndex === -1 || endIndex <= startIndex) {
      throw new Error('No JSON found after decryption');
    }

    let jsonStr = decryptedStr
      .slice(startIndex, endIndex)
      .replace(/\0/g, '')
      .trim();

    // Fix missing brackets (heuristic)
    const count = (char) =>
      (jsonStr.match(new RegExp(`\\${char}`, 'g')) || []).length;

    while (count(']') < count('[')) jsonStr += ']';
    while (count('}') < count('{')) jsonStr += '}';

    return JSON.parse(jsonStr);
  } catch (err) {
    console.error('Decryption failed:', err);
    throw new Error(`Decryption failed: ${err.message}`);
  }
}