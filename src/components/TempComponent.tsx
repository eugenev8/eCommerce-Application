import { useState } from 'react';
import { createClientApiRoot, createAnonApiRoot } from '../sdk/root';

export default function TempComponent() {
  const [email, setEmail] = useState<string>('test_email@gmial.com');
  const [password, setPassword] = useState<string>('123456');
  // const [customerId, setCustomerId] = useState<string>(localStorage.getItem('customerId') || '');

  function handleLogout() {
    console.log('logout');
  }

  function handleLogin() {
    async function log() {
      await createClientApiRoot(email, password);

      // const cust = await userRoot.me().get().execute();
      // setName(cust.body.firstName || '');
    }

    log();
  }

  function handleAnonLogin() {
    async function log() {
      await createAnonApiRoot();
    }

    log();
  }

  return (
    <>
      {/* <h1>ID: {customerId}</h1> */}
      <button onClick={handleAnonLogin} type="button">
        Login Anon
      </button>
      <br />
      <br />
      <button onClick={handleLogin} type="button">
        Login
      </button>
      <button onClick={handleLogout} type="button">
        Logout
      </button>
      <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email" />
      <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="password" />
    </>
  );
}
