import { useState } from 'react';
import { MyCustomerUpdate } from '@commercetools/platform-sdk';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { changeCustomerPassword, updateCustomerPersonalData } from '../../reducers/ActionCreators';

function TempComponent() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newFirstName, setNewFirstName] = useState('');
  const [newLastName, setNewLastName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newDateOfBirth, setNewDateOfBirth] = useState('');
  const dispatch = useAppDispatch();

  const customer = useAppSelector((state) => state.customerReducer.customer);

  const [errorMessage, setErrorMessage] = useState('');
  if (!customer) {
    return <p>Error: !customer</p>;
  }
  const { firstName, lastName, email, version, dateOfBirth } = customer;
  const handleChangePassword = () => {
    dispatch(changeCustomerPassword({ currentPassword, newPassword, version, email }));
  };

  const handleUpdatePersonalData = () => {
    const updates: MyCustomerUpdate = { version, actions: [] };
    if (newFirstName && firstName !== newFirstName) {
      updates.actions.push({
        firstName: newFirstName,
        action: 'setFirstName',
      });
    }
    if (newLastName && lastName !== newLastName) {
      updates.actions.push({
        lastName: newLastName,
        action: 'setLastName',
      });
    }
    if (newDateOfBirth && dateOfBirth !== newDateOfBirth) {
      updates.actions.push({
        dateOfBirth: newDateOfBirth,
        action: 'setDateOfBirth',
      });
    }
    if (newEmail && email !== newEmail) {
      updates.actions.push({
        email: newEmail,
        action: 'changeEmail',
      });
    }
    if (updates.actions.length) {
      setErrorMessage('');
      dispatch(updateCustomerPersonalData(updates));
    } else {
      setErrorMessage('No changes!');
    }
  };

  return (
    <div>
      <h3>Hello, {firstName}</h3>
      <h4>Account information</h4>
      <p>
        {firstName} {lastName} {dateOfBirth}
      </p>
      <p>Email: {email}</p>
      <h3>Change personal data</h3>
      <span>FirstName: {firstName}</span>
      <input
        type="text"
        value={newFirstName}
        onChange={(e) => {
          setNewFirstName(e.target.value);
          setErrorMessage('');
        }}
      />
      <br />
      <span>LastName: {lastName}</span>
      <input
        type="text"
        value={newLastName}
        onChange={(e) => {
          setNewLastName(e.target.value);
          setErrorMessage('');
        }}
      />
      <br />
      <span>email: {email}</span>
      <input
        type="text"
        value={newEmail}
        onChange={(e) => {
          setNewEmail(e.target.value);
          setErrorMessage('');
        }}
      />
      <br />
      <span>DateOfBirth: {dateOfBirth}</span>
      <input
        type="text"
        value={newDateOfBirth}
        onChange={(e) => {
          setNewDateOfBirth(e.target.value);
          setErrorMessage('');
        }}
      />
      <br />
      <button type="button" onClick={handleUpdatePersonalData}>
        Change Personal data
      </button>
      {errorMessage && <p style={{ color: 'red', fontWeight: 700 }}>{errorMessage}</p>}
      <h3>Password change block</h3>
      <input type="text" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
      <input type="text" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
      <button type="button" onClick={handleChangePassword}>
        Change Pass
      </button>
    </div>
  );
}

export default TempComponent;
