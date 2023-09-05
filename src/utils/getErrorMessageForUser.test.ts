import getErrorMessageForUser from './getErrorMessageForUser';

describe('getErrorMessageForUser', () => {
  it('returns the user-friendly message for a known server message', () => {
    const serverMessage = 'Customer account with the given credentials not found.';
    const expectedUserMessage = 'Invalid credentials (incorrect email or password)!';
    const result = getErrorMessageForUser(serverMessage);
    expect(result).toEqual(expectedUserMessage);
  });

  it('returns a default message for an unknown server message', () => {
    const serverMessage = 'Unknown server error message';
    const expectedUserMessage = 'Sorry! Unknown error!';
    const result = getErrorMessageForUser(serverMessage);
    expect(result).toEqual(expectedUserMessage);
  });
});
