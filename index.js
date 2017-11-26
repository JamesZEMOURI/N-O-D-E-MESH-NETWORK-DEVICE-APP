const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const ipcMain = electron.ipcMain;
let mainWindow;
let childWindow;

function createWindow() {

  mainWindow = new BrowserWindow({
    titleBarStyle: 'hidden',
    width: 800,
    height: 600,
    minWidth: 800,
    minHeight: 600,
    title: 'n-o-d-e',
    icon: 'assets/logo.png',
    show: false,
    frame: true

  })


  childWindow = new BrowserWindow({

    width: 405,
    height: 185,
    icon: 'assets/logo.png',
    backgroundColor: '#1F1F1F',
    title: 'n-o-d-e / load',
    show: false,
    frame: false,
    parent: mainWindow,
    resizable: false,
    show: false

  });


  childWindow.once('ready-to-show', () => {
    //  mainWindow.show()
    childWindow.show()

  })

  ipcMain.on('open-calc', (event, msg) => {

    console.log(msg);

    mainWindow.show()

    childWindow.hide();
    
    childWindow = null;

    });

  childWindow.loadURL(`file://${__dirname}/load.html`);

  mainWindow.loadURL(`file://${__dirname}/main.html`);

  childWindow.on('closed', () => {

    if (mainWindow !== null) {

      app.quit();

    } else {

      childWindow = null;
    }


  })


  mainWindow.on('closed', () => {

    mainWindow = null;

  })
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {

    app.quit();

  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
