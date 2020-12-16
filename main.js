const {app, BrowserWindow, Menu, globalShortcut, ipcMain, shell} = require('electron')
const path = require('path')

//environment settings
process.env.NODE_ENV = 'development'

const isDev = process.env.NODE_ENV !== 'production' ? true : false
const isMac = process.platform === 'darwin' ? true : false

let mainWindow

function createMainWindow() {
    mainWindow = new BrowserWindow({
        title: 'Z-Factor || Gas Compressibility Factor',
        width: !isDev ? 800 : 550,
        height: 600,
        icon: `${__dirname}./Assets/icons/icon.png`,
        resizable: isDev,
        webPreferences: {
            contextIsolation: true,
            nodeIntegration: true
          }
    })
    if (isDev) {
        mainWindow.webContents.openDevTools()
      }
      mainWindow.loadFile('./App/index.html')
}

app.on('ready', ()=>{
    createMainWindow()
    const mainMenu = Menu.buildFromTemplate(menu)
    Menu.setApplicationMenu(mainMenu)
})



//menu design
const menu = [
    ...(isMac ? [{ role: 'appMenu' }] : []),
    {
      role: 'fileMenu',
    },
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