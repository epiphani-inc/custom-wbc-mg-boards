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
    setBoards(p => [...p, {uuid: newUUID, simpleMode: false, collabMode: false}]);
    loadBoard(newUUID, false, false);
  }

  function addSimpleBoard() {
    let newUUID = uuidv4();
    console.log('Your simple board UUID is: ' + newUUID);
    setBoards(p => [...p, {uuid: newUUID, simpleMode: true, collabMode: false}]);
    loadBoard(newUUID, true, false);
  }

  function addCollabBoard() {
    let newUUID = uuidv4();
    console.log('Your collab board UUID is: ' + newUUID);
    setBoards(p => [...p, {uuid: newUUID, simpleMode: false, collabMode: true}]);
    loadBoard(newUUID, false, true);
  }

  function loadBoard(uuid, simple, collab) {
    let url = "https://whiteboard.chat/apiaccess/createjoin/" + uuid + "-pgNum-1?key=" + WBCAPIKEY + "&teacher=true&username=Tina&userEmail=sid@epiphani.io&disableNav=true";
    if (simple) {
      url = url + "&simpleMode=true"
    } else if (collab) {
      url = url + "&collabMode=true"
    }
    setViewBoardURL(p => url)
  }

  function copyStudentInvite(uuid, simple, collab) {
    var studentInviteURL = "https://whiteboard.chat/apiaccess/join/" + uuid + "-pgNum-1?key=" + WBCAPIKEY + "&resetStore=true&teacher=false&username=Lisa&userEmail=sid@epiphani.ai&disableNav=true";
    if (simple) {
      studentInviteURL = studentInviteURL + "&simpleMode=true"
    } else if (collab) {
      studentInviteURL = studentInviteURL + "&collabMode=true"
    }
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
      <button className="button ctabutton" onClick={addBoard}>Add Teaching Board</button>
      <button className="button ctabutton" onClick={addSimpleBoard}>Add Simple Teaching Board</button>
      <button className="button ctabutton" onClick={addCollabBoard}>Add Collaboration Board</button>
      <h3>List of Boards:</h3>
      (Click the board UUID button to load the board into the iframe below.
      The Student Invite URL should be pasted into an incognito browser window or an entirely different browser)
      <table><tbody>
      {boards.map((b) =>
      <tr key={b.uuid}><td>
        {
          <button className="button boardButton" onClick={() => loadBoard(b.uuid, b.simpleMode, b.collabMode)}>{b.uuid}</button>
        }
      </td>
      <td>
        {
          <button className="button" onClick={() => copyStudentInvite(b.uuid, b.simpleMode, b.collabMode)}>
            Copy {b.collabMode ? "" : "Student"} Invite
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
        frameBorder="0"
        allow="camera; microphone">
      </iframe>
      </div>
      }

    </div>
  );
}

export default App;
