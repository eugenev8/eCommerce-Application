import './App.css';
import rootApi, { Credentials } from './sdk/root';

function App() {
  function handleClick() {
    async function getData() {
      const credentials: Credentials = {
        projectKey: 'svhg732edc720d',
        clientID: 'q6wpq4NpUNJjS2ztD5a_-DSC',
        clientSecret: 'FjO0Xm_Zm8C8f4X206dMJzWt2TRGujkt',
        scopes: 'manage_project:svhg732edc720d',
      };
      const data = await rootApi(credentials).products().get().execute();
      console.log(data);
    }
    getData();
  }

  return (
    <>
      <h1>Our page</h1>
      <button onClick={handleClick} type="button">
        Get data
      </button>
    </>
  );
}

export default App;
