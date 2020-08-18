const crypto = require("crypto");
const { encode } = require("querystring");

export function toQuery(params) {
  return encode(params);
}

export function generateRandomString(len) {
  return crypto.randomBytes(len);
}

export function base64UrlEncode(str) {
  return str.toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}

export function generateHash(verifier) {
  return crypto.createHash('sha256').update(verifier).digest();
}