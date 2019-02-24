module.exports.ErrorMessage = function(errorCode, additionalInfo) {
  let message;
  switch(errorCode) {
    case 'INVALID_SYNTAX':
      message = 'Invalid syntax';
      break;
    case 'INV_REQ_BODY_PARAM':
      message = 'Invalid request body parameter: ' + additionalInfo;
      break;
    default:
      message = 'UNKNOWN_OPERATION_STATUS_WITH_ERROR_VALUE ' + errorCode ;
      break;
  }
  return message;
};