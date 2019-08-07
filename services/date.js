const { tz } = require("moment-timezone");

const { TIMEZONE } = require("./constants");

const formatDate = dateString => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return tz(date, TIMEZONE)
        .format("DD-MM-YYYY")
        .toUpperCase();
};

const getCurrentDateAndTime = () => {
    const dateString = tz(Date.now(), TIMEZONE).format(
        "DD/MM/YYYY HH:mm"
    );
    return dateString;
};

const checkIfExpired = dateString => {
    const expiryDate = new Date(dateString);
    const now = new Date();
    return expiryDate.getTime() < now.getTime();
};

module.exports = {
    formatDate,
    getCurrentDateAndTime,
    checkIfExpired
}