//View.js
import React, { useState } from 'react';
//
//
function View (props) {
  // read the info from props, coming from the ancestor component
  const { screen, setScreen } = props;
  // return a stateful value and funcion to update it
  const [data, setData] = useState();
  //

  const deleteCookie = async () => {
    try {
      //await axios.get('/signout');
      //setScreen('auth');
    } catch (e) {
      console.log(e);
    }
  };
  // called when user clicks on Verify Cookie button
  // end-point demonstrates another example for the use
  // of cookie specific response from the server.
  const verifyCookie = async () => {
    try {
      //const res = await axios.get('/welcome');
      //console.log(res.data)
      //setData(res.data);
    } catch (e) {
      console.log(e);
    }
  }
  //
  return (
    <div className="App">
                
      <p>{screen}</p>
      <p>{data}</p>
      <button onClick={verifyCookie}>Verify Cookie</button>
      

      <button onClick={deleteCookie}>Log out</button>        

    </div>
  );
}
//
export default View;
