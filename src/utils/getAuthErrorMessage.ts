enum ServerAuthErrorMessage {
  INVALID_CREDENTIALS = 'Customer account with the given credentials not found.',
  ALREADY_EXISTING_CUSTOMER = 'There is already an existing customer with the provided email.',
}

function getAuthErrorMessage(errorMessage: string) {
  switch (errorMessage) {
    case ServerAuthErrorMessage.INVALID_CREDENTIALS:
      return 'Invalid credentials (incorrect email or password)!';
    case ServerAuthErrorMessage.ALREADY_EXISTING_CUSTOMER:
      return 'Account with this email already exists. Please log in or try an another email!';
    default:
      return 'Unknown error!';
  }
}

export default getAuthErrorMessage;
