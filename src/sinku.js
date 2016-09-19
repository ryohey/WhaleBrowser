// Sinku Console Wrapper

/**
  Sinku Console ver 1.2

  例：sinku.exe C:\in.avi
    <fields>
     <container/>
     <video/>
     <audio/>
     <extra/>
     <movie_length/> //s
     <movie_size/>   //kb
    </fields>

  時間、サイズ以外の出力はsinku.dll(format.ini)の仕様に従います。
*/


const { remote } = window.require("electron")
const child_process = remote.require("child_process")
import { parseString } from "xml2js"
import path from "path"

const processPath = ".\\bin\\sinku.exe"

export default function(file, callback) {
  const commandOptions = {
    cwd: path.dirname(processPath),
    encoding: "sjis",
    timeout: 20000
  }

  child_process.exec(`${path.basename(processPath)} "${file}"`, commandOptions, (error, stdout) => {
    if (error) {
      return callback(error)
    }
    parseString(stdout.toString(), (error, result) => {
      callback(error, result.fields)
    })
  })
}
