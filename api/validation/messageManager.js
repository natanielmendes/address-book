module.exports.ErrorMessage = function(errorCode, additionalInfo) {
  let message
  switch(errorCode) {
    case 'INVALID_SYNTAX':
      message = 'Invalid syntax'
      break
    case 'INV_REQ_BODY_PARAM':
      message = 'Invalid request body parameter: ' + additionalInfo
      break
    case 'USER_ALREADY_EXISTS':
      message = 'Email address already in use'
      break
    case 'USER_REGISTRATION_FAILED':
      message = 'User registration failed'
      break
    case 'USER_NOT_FOUND':
      message = 'User not found'
      break
    case 'INVALID_PASSWORD':
      message = 'Invalid password'
      break
    case 'MISSING_TOKEN':
      message = 'No token provided'
      break
    case 'INVALID_TOKEN_FORMAT':
      message = 'Invalid token format'
      break
    case 'INVALID_TOKEN':
      message = 'Invalid token'
      break
    default:
      message = 'UNKNOWN_OPERATION_STATUS_WITH_ERROR_VALUE ' + errorCode
      break
  }
  return message
}