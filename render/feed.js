// Copyright 2019 Nikola Jokic (Croatia) <nikolajokic@protonmail.com>
// This file is part of Tellometrik.

// Tellometrik is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// Tellometrik is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with Tellometrik.  If not, see <http://www.gnu.org/licenses/>.

const dgram = require('dgram')
const feed = dgram.createSocket('udp4')
const ffmpeg = require('ffmpeg-binaries')
const { spawn } = require('child_process')

feed.bind(11111)

feed.on('message', (msg) => {
  parseMsg(msg)
})

var player = process.env.VIDEO_PLAYER || 'mplayer'

if (player === 'mplayer') {
  $('#video_space').hide()
  var h264encoder_spawn = {
    'command': 'mplayer',
    'args': [ '-gui', '-nolirc', '-fps', '35', '-really-quiet', '-' ]
  }

  var h264encoder = spawn(h264encoder_spawn.command, h264encoder_spawn.args)

  var parseMsg = function (data) {
    h264encoder.stdin.write(data)
  }
} else if (player === 'jmuxer') {
  var jmuxer = new JMuxer({
    node: 'player',
    mode: 'video',
    fps: 30,
    flushingTime: 1

  })
  // jmuxer
  var h264chunks = []

  var numChunks = 3
  var numChunkz = 0

  var parseMsg = function (data) {
    var idx = data.indexOf(Buffer.from([0, 0, 0, 1]))
    if (idx > -1 && h264chunks.length > 0) {
      h264chunks.push(data.slice(0, idx))
      numChunkz = numChunkz + 1
      if (numChunkz === numChunks) {
        jmuxer.feed({
          video: Uint8Array.from(Buffer.concat(h264chunks))
        })
        h264chunks = []
        numChunkz = 0
      }
      //
      h264chunks.push(data.slice(idx))
    } else {
      h264chunks.push(data)
    }
  }
} else if (player === 'ffmpeg') {
  $('#player').hide()
  var h264encoder_spawn = {
    'command': ffmpeg, // for mac just change to ./ffmpeg and put ffmpeg binary into the same folder
    // "args"    : [ '-fflags', 'nobuffer', '-f', 'h264', '-i', "-", '-c:v', 'libx264', '-b:v', '3M', '-profile', 'baseline', '-preset', 'ultrafast', '-pass', '1', '-coder', '0', '-bf', '0', '-flags', '-loop', '-wpredp', '0', '-an', '-f', 'h264', '-']
    // "args"      : [ '-f', 'h264', '-i', "-", '-r', '35', '-c:v', 'libx264', '-b:v', '3M', '-profile', 'baseline', '-preset', 'ultrafast', '-tune', 'zerolatency', '-vsync', '0', '-async', '1', '-bsf:v', 'h264_mp4toannexb', '-x264-params','keyint=15:scenecut=0', '-an', '-f', 'h264', '-']
    // "args"      : [ '-f', 'h264', '-i', "-", '-r', '30', '-c:v', 'libx264', '-b:v', '3M', '-profile', 'baseline', '-preset', 'ultrafast', '-tune', 'zerolatency', '-vsync', '0', '-async', '1', '-bsf:v', 'h264_mp4toannexb', '-an', '-f', 'h264', '-']
    'args': [ '-fflags', 'nobuffer', '-f', 'h264', '-i', '-', '-r', '30', '-c:v', 'libx264', '-b:v', '2M', '-profile', 'baseline', '-preset', 'ultrafast', '-tune', 'zerolatency', '-vsync', '0', '-async', '0', '-bsf:v', 'h264_mp4toannexb', '-x264-params', 'keyint=5:scenecut=0', '-an', '-f', 'h264', '-analyzeduration', '10000', '-probesize', '32', '-']
    // "args"      : [ '-f', 'h264', '-i', "-", '-r', '30', '-c:v', 'libx264', '-b:v', '3M', '-profile', 'baseline', '-preset', 'ultrafast', '-tune', 'zerolatency', '-async', '1', '-an', '-f', 'h264', '-']
  }

  var h264encoder = spawn(h264encoder_spawn.command, h264encoder_spawn.args)

  var headers = {
    'h264_baseline': Buffer([0, 0, 0, 1]) // h264 NAL unit
  }

  var h264chunks = []
  var h264encoder = spawn(h264encoder_spawn.command, h264encoder_spawn.args)
  var numChunks = 1
  var numChunkz = 0

  var parseMsg = function (data) {
    h264encoder.stdin.write(data)
  }
  var h264_player = new window.Player({
    useWorker: true,
    workerFile: 'render/ffmpeg-stream/Decoder.js',
    webgl: 'auto',
    size: { width: 960 / 4, height: 720 / 3 }
  })
  document.getElementById('videoFeed').appendChild(h264_player.canvas)

  h264encoder.stdout.on('data', function (data) {
    var idx = data.indexOf(headers['h264_baseline'])
    if (idx > -1 && h264chunks.length > 0) {
      h264chunks.push(data.slice(0, idx))
      h264_player.decode(Uint8Array.from(Buffer.concat(h264chunks)))
      h264chunks = []
      h264chunks.push(data.slice(idx))
    } else {
      h264chunks.push(data)
    }
  })
}
