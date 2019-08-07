const axios = require("axios");
const { getData } = require("@govtechsg/open-attestation");
const { checkIfExpired } = require("./date");
const { verifyUrl, contractStore } = require("./constants");
// is this a secret?

// extended status enums in anticipation of future changes
/* eslint-disable no-unused-vars */
const verificationStatusEnum = {
  VALID: 0,
  EXPIRED: 1,
  TAMPERED: 2,
  REVOKED: 3,
  INVALID_ISSUER: 4,
  INVALID: 5
}
/* eslint-enable */

const verifyWorkpass = async document => {
  // check expiry first
  const cleanDoc = getData(document);
  if (cleanDoc === undefined) return verificationStatusEnum.INVALID;
  if (checkIfExpired(cleanDoc.pass.expiryDate))
    return verificationStatusEnum.EXPIRED;

  // then check tampered n revoked
  const result = await axios.post(verifyUrl, { document });
  if (result.data.message) {
    return verificationStatusEnum.INVALID;
  }
  if (!result.data.hash.valid) return verificationStatusEnum.TAMPERED;
  if (!result.data.revoked.valid) return verificationStatusEnum.REVOKED;

  // check issuer
  let isAllIssuerValid = true;
  Object.keys(result.data.issued.issued).forEach(key => {
    isAllIssuerValid = isAllIssuerValid && contractStore.includes(key);
  });

  if (!isAllIssuerValid || !result.data.issued.valid)
    return verificationStatusEnum.INVALID_ISSUER;

  if (result.data.valid) return verificationStatusEnum.VALID;
  return verificationStatusEnum.INVALID;
};

const verifyWorkpassBoolean = async document => {
  const isValid = await verifyWorkpass(document);
  return isValid === verificationStatusEnum.VALID;
};

module.exports = {
  verifyWorkpassBoolean
}
