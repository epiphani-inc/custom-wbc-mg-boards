import React, { useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Alert from '@mui/material/Alert';
import {v4 as uuidv4} from 'uuid';
import './App.css';

// *********************************
// IMPORTANT ADD YOUR API KEY HERE !
const WBCAPIKEY=""
// *********************************

function App() {
  const [boards, setBoards] = useState([]);
  const [viewBoardURL, setViewBoardURL] = useState("");
  const [copiedConfMsg, setCopiedConfMsg] = useState(false);

  const action = (
    <React.Fragment>
      {/* <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button> */}
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleCopiedConfClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  function addBoard() {
    let newUUID = uuidv4();
    console.log('Your UUID is: ' + newUUID);
    setBoards(p => [...p, newUUID]);
    loadBoard(newUUID);
  }

  function loadBoard(uuid) {
    setViewBoardURL(p => "https://whiteboard.chat/apiaccess/createjoin/" + uuid + "-pgNum-1?key=" + WBCAPIKEY + "&teacher=true&username=Tina&userEmail=sid@epiphani.io&disableNav=true");
  }

  function copyStudentInvite(uuid) {
    var studentInviteURL = "https://whiteboard.chat/apiaccess/join/" + uuid + "-pgNum-1?key=" + WBCAPIKEY + "&resetStore=true&teacher=false&username=Lisa&userEmail=sid@epiphani.ai&disableNav=true";
    navigator.clipboard.writeText(studentInviteURL)
    console.log("student invite = ", studentInviteURL)
    showCopiedConfMsg();
  }

  function showCopiedConfMsg() {
    setCopiedConfMsg(true);
  }

  function handleCopiedConfClose() {
    setCopiedConfMsg(false);
  }

  return (
    <div className="App">
      <button className="button" onClick={addBoard}>Add Board</button>
      <p>
      List of Boards (Click to load board below):
      </p>
      <table><tbody>
      {boards.map(b => 
      <tr key={b}><td>
        {
          <button className="button boardButton" onClick={() => loadBoard(b)}>{b}</button>
        }
      </td>
      <td>
        {
          <button className="button" onClick={() => copyStudentInvite(b)}>
            Copy Student Invite
          </button>
        }
      </td>
      </tr>)}
      </tbody></table>
      <Snackbar
          open={copiedConfMsg}
          autoHideDuration={2500}
          onClose={handleCopiedConfClose}
          // message="Student Invite Copied to Clipboard."
          action={action}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
       >
        <Alert severity="info">Student Invite Copied to Clipboard.</Alert>
      </Snackbar>
      <div style={{marginTop: '10px'}}></div>
      {viewBoardURL === "" ?
      <div style={{width: '95vw', height: '75vh', border: '1px grey solid'}}>
      <div style={{padding: '20px', color: 'grey'}}>Select a board from the above table.</div>
      </div> :
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
