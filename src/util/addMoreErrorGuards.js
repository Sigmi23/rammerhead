// handle the additional errors: ERR_INVALID_PROTOCOL and ETIMEDOUT
// hammerhead handled errors: ECONNRESET, EPIPE (or ECONNABORTED for windows)

const hGuard = require('testcafe-hammerhead/lib/request-pipeline/connection-reset-guard');
const isConnectionResetError = hGuard.isConnectionResetError;
hGuard.isConnectionResetError = function (err) {
    if (isConnectionResetError(err) || err.code === 'ERR_INVALID_PROTOCOL' || err.code === 'ETIMEDOUT') {
        return true;
    }
    console.error('Unknown crash-inducing error:', err);
    // never return false as to avoid crashing the server
    return true;
};