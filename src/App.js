import React, { useState } from 'react';
import {v4 as uuidv4} from 'uuid';
import './App.css';


// *********************************
// IMPORTANT ADD YOUR API KEY HERE !
const WBCAPIKEY="c487a902-8bda-4caf-a885-e430451d3428"
// *********************************


function App() {
  const [boards, setBoards] = useState([]);
  const [viewBoardURL, setViewBoardURL] = useState("");
  function addBoard() {
    let newUUID = uuidv4();
    console.log('Your UUID is: ' + newUUID);
    setBoards(p => [...p, newUUID]);
  }

  function loadBoard(uuid) {
    setViewBoardURL(p => "https://whiteboard.chat/apiaccess/createjoin/" + uuid + "-pgNum-1?key=" + WBCAPIKEY + "&teacher=true&username=tina&userEmail=sid@epiphani.io&disableNav=true");
  }

  return (
    <div className="App">
      <button onClick={addBoard}>Add Board</button>
      <p>
      List of Boards (Click to load board below):
      </p>
      <table><tbody>
      {boards.map(b => 
      <tr key={b}><td>
        {
          <button onClick={() => loadBoard(b)}>{b}</button>
        }
      </td></tr>)}
      </tbody></table>
      {viewBoardURL === "" ? <></> :
      <div style={{width: '95vw', height: '95vh'}}>
      <iframe title="Whiteboard.chat In iframe"
        style={{position:'relative', width:'100%', height:'80%', minWidth:'1000px'}}
        src={viewBoardURL}
        frameborder="0"
        allow="camera; microphone">
      </iframe>
      </div>
      }

    </div>
  );
}

export default App;
