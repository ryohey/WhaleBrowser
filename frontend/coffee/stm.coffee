# Simple Thumbnail Maker Wrapper

###
Simple Thumbnail Maker ver 2.6 
　
入力ファイル(必須)
　
-w : サムネイル幅(default 160)
-h : サムネイル高さ(default 120)
-c : 横の枚数(default 1)
-r : 縦の枚数(default 1)
-q : JPEG品質、1～100(default 90)
-a : 出力アスペクト指定、0>自動、1>4:3、2>16:9(default 0)
-d : ランダムフレームモード(default 等間隔)
-f : 連続出力モード、FPSで指定(default 0)
　　 -c*-rで枚数を指定、-oで出力フォルダを指定
　　 -oがなければ入力ファイルと同じフォルダにファイル名フォルダを作る
-s : 時間指定、0秒～(default -1)
　　 指定すればすべてのフレームがこの時間の画像になる
　　 -fと同時指定で連続出力の開始フレームになる
-k : 出力ファイル名の後に.#から始まるHASHキーを追加(default 追加しない)
-o : 出力先パス(default 入力ファイルと同じフォルダに同名jpg)
　　 パス内の'*'は元のファイル名に置換される

例：stm.exe -w 400 -h 300 -d -o "C:\*.jpg" C:\in.avi
例：stm.exe -w 200 -h 150 -c 240 -f 15 -o "C:\out" C:\in.avi
###

remote = global.require "remote"
child_process = remote.require "child_process"
_ = require "underscore"

processPath = "..\\bin\\stm.exe"

###

requiredOptions = 
  input: String
  output: String

callback = (error, stdout, stderr) ->
###
module.exports = (options, callback) ->
  defaults = 
    width: 100 
    height: 100 
    quality: 90 
    addHash: false 
    aspect: 0 
    randomFrame: false 
    horizontalNum: 1 
    verticalNum: 1 
    frame: null

  o = _.extend defaults, options

  args =　[
    "-w #{o.width}"
    "-h #{o.height}"
    "-q #{o.quality}"
    "-a #{o.aspect}"
    "-c #{o.horizontalNum}"
    "-r #{o.verticalNum}"
    if o.addHash then "-k" else "" 
    if o.randomFrame? then "-d" else ""
    if o.frame? then "-f #{o.frame}" else ""
    "-o \"#{o.output}\""
    "\"#{o.input}\""
  ]

  console.log "#{processPath} #{args.join(" ")}"

  commandOptions = 
    encoding: "sjis"
    timeout: 20000

  child_process.exec "#{processPath} #{args.join(" ")}", commandOptions, callback
 # child_process.exec "#{processPath} #{args.join(" ")}", callback
