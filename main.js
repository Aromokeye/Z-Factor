const {app, BrowserWindow, Menu, globalShortcut, ipcMain, shell} = require('electron')
const path = require('path')

//environment settings
process.env.NODE_ENV = 'production'

const isDev = process.env.NODE_ENV !== 'production' ? true : false
const isMac = process.platform === 'darwin' ? true : false
isWindows = process.platform === 'win32' ? true : false

let mainWindow
let aboutWindow

function createMainWindow() {
    mainWindow = new BrowserWindow({
        title: 'Z-Factor || Gas Compressibility Factor',
        width: isDev ? 800 : 550,
        height: 600,
        icon: `${__dirname}./Assets/icons/icon.png`,
        resizable: isDev,
        webPreferences: {
            contextIsolation: true,
            nodeIntegration: true
          }
    })
    mainWindow.loadFile('./App/index.html')

    if(isDev){
      mainWindow.webContents.openDevTools()
    }
}

function createAboutWindow (){
  aboutWindow = new BrowserWindow({
      title: 'About Image Shrink',
      width: 300,
      height: 300,
      resizable: false,
      icon: `${__dirname}./Assets/icons/Icon.png`,
      webPreferences: {
          contextIsolation: true,
          nodeIntegration: true
        }
  })

  //mainWindow.loadURL(`file://${__dirname}/app/index.html`)
  aboutWindow.loadFile('./App/about.html')
}

app.on('ready', ()=>{
    createMainWindow()
    //createAboutWindow()
    const mainMenu = Menu.buildFromTemplate(menu)
    Menu.setApplicationMenu(mainMenu)

    globalShortcut.register('CmdOrCtrl+R', ()=> mainWindow.reload())
    globalShortcut.register(isMac ? 'Command+Alt+I' : 'Ctrl+Shift+I', 
                            ()=> mainWindow.toggleDevTools())

    mainWindow.on('closed', ()=>mainWindow = null)
})




//menu design
const menu = [
    ...(isMac ? [{
      label: app.name,
      submenu: [
        {
          label: 'About',
          click: createAboutWindow
        }
      ]
    }] : [] ),
    
    {
      role: 'fileMenu',
    },
    ...(isWindows && [
      {
        label: 'Help',
        submenu:[
          {
            label: 'About',
            click: createAboutWindow,
          }
        ]
      }
    ]),
    ...(isDev
      ? [
          {
            label: 'Developer',
            submenu: [
              { role: 'reload' },
              { role: 'forcereload' },
              { type: 'separator' },
              { role: 'toggledevtools' },
            ],
          },
        ]
      : []),
  ]

  app.on('window-all-closed', () => {
    if (!isMac) {
      app.quit()
    }
  })
  
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow()
    }
  })
  
  app.allowRendererProcessReuse = true