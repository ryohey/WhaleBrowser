const electron = require("electron")
const BrowserWindow = electron.BrowserWindow
const app = electron.app

let mainWindow

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") {
    app.quit()
  }
})

app.on("ready", function () {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
  })
  // TODO: load the production static html
  mainWindow.loadURL("http://localhost:8080/index.html")
  mainWindow.webContents.openDevTools()
  mainWindow.on("closed", function () {
    mainWindow = null
  })
})

app.on("activate", function () {
  if (mainWindow === null) {
    createWindow()
  }
})
