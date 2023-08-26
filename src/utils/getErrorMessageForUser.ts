type ErrorMessage = {
  serverMessage: string;
  userMessage: string;
};

const errorMessages: ErrorMessage[] = [
  {
    serverMessage: 'Customer account with the given credentials not found.',
    userMessage: 'Invalid credentials (incorrect email or password)!',
  },
  {
    serverMessage: 'There is already an existing customer with the provided email.',
    userMessage: 'Account with this email already exists. Please try an another email!',
  },
  {
    serverMessage: 'The given current password does not match.',
    userMessage: 'The given current password does not match!',
  },
];

function getErrorMessageForUser(serverMessage: string) {
  const errorMessage = errorMessages.find((error) => error.serverMessage === serverMessage);

  return errorMessage?.userMessage || 'Sorry! Unknown error!';
}

export default getErrorMessageForUser;
