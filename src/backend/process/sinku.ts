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
import path from "path"
import { promisify } from "util"
import { parseString } from "xml2js"

const processPath = ".\\bin\\sinku.exe"

export default async function (file: string) {
  const commandOptions = {
    cwd: path.dirname(processPath),
    encoding: "sjis",
    timeout: 20000,
  }

  const stdout = await promisify(child_process.exec)(
    `${path.basename(processPath)} "${file}"`,
    commandOptions
  )

  const result: any = await promisify(parseString)(stdout.toString())
  return result.fields
}
