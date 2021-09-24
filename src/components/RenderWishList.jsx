import { useState, useEffect } from "react";

export default function RenderWishList() {

  // Use ipcRenderer + remote that can connect to Electron
  // methods only available on the Node side otherwise
  const { ipcRenderer } = window.require('electron');
  const remote = window.require('@electron/remote');

  const require = window.require;
  // Use dialog via remote
  const { dialog } = remote;

  // Use the fs and paths modules from node
  const fs = require('fs');
  const path = require('path');

  // State variables
  const [menuChoice, setMenuChoice] = useState('');

  useEffect(() => {
    ipcRenderer.on('menuChoice', (ipcEvent, choice) => {
      if (choice === 'Save current wish list') {
        let filePath = dialog.showSaveDialogSync({
          properties: ['createDirectory']
        });
        // your logic and something with fs and path eventually to save
      }
      if (choice === 'Load a wish list') {
        let filePaths = dialog.showOpenDialogSync({
          properties: ['openFile'],
          options: { filters: { extensions: ['.json'] } }
        });
        console.log(filePaths[0]); //borde va sökväg
        // your logic and something with fs and path eventually to load
        let jsonData = fs.readFileSync(filePaths[0], 'utf8');
        console.log('json parsad fil: ');
        console.log(JSON.parse(jsonData));
        let wishlistImportedObj = JSON.parse(jsonData);
      }
      setMenuChoice(choice);
    });

    // Return a function to run on unmount of the component
    // that will remove the ipcrenderer
    return () => ipcRenderer.removeAllListeners('menuChoice');

  }, [])
  // Listen to menuChoices from the main process
  // Listen for main message
  

  return <>
    <h3>Electron Specific Component</h3>
    <p>Last menu choice: {menuChoice}</p>
  </>
}