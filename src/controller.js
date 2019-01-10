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

const Commander = require('./commander.js')

const commander = new Commander()

const WebSocket = require('ws')

const wss = new WebSocket.Server({ port: 48950 })

const wifi = require('./wifi.js')(wss)

wss.on('connection', function connection (ws) {
  console.log('Client Connected')
  ws.on('message', function incoming (message) {
    console.log('received: %s', message)
    switch (message) {
      case 'land':
        commander.land()
        break
      case 'takeoff':
        commander.takeoff()
        break
      case 'emergency':
        commander.emergency()
        // code block
        break
      default:
        commander[message]()
    }
  })
})

function sendLog (msg) {
  wss.clients.forEach(function each (client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(msg)
    }
  })
}

setInterval(function () {
  commander.command()
  // commander.streamon();
}, 2000)

commander.command()
commander.streamon()

commander.client.on('message', (msg, info) => {
  sendLog('Data received from drone : ' + msg.toString())
})

commander.client.on('error', (msg, info) => {
  sendLog('Error received from drone : ' + msg.toString())
})

commander.streamon()

const ds = require('dualshock')
var list
var device
var gamepad

function getDevice () {
  // body...
  list = ds.getDevices()
  device = list[0]
  console.log(device)
  if (device) {
    gamepad = ds.open(device, { smoothAnalog: 20, smoothMotion: 20, joyDeadband: 4, moveDeadband: 4 })
    registerGamepad()
  } else {
    sendLog('No DualShock controller found. Retrying in 5 seconds...')
    setTimeout(function (argument) {
      getDevice()
    }, 5000)
  }
}

function registerGamepad () {
  sendLog('Registering DualShock controller!')
  gamepad.onmotion = true
  gamepad.onstatus = true

  var isStream = false

  gamepad.ondigital = function (button, value) {
  // console.log("BUTTON '"+button+"' = "+value);
    if (button === 'triangle' && value === false) {
      sendLog('Sending Takeoff command')
      commander.takeoff()
    }
    if (button === 'square' && value === false) {
      sendLog('Sending Land command')
      commander.land()
    }
    if (button === 'pad' && value === true) {
      sendLog('Sending Emergency command')
      commander.emergency()
    }
    if (button === 'up' && value === false) {
      sendLog('Sending f Flip command')
      commander.flip('f')
    }
    if (button === 'down' && value === false) {
      sendLog('Sending b Flip command')
      commander.flip('b')
    }
    if (button === 'left' && value === false) {
      sendLog('Sending l Flip command')
      commander.flip('l')
    }
    if (button === 'right' && value === false) {
      sendLog('Sending r Flip command')
      commander.flip('r')
    }
    if (button === 'cross' && value === false) {
      sendLog('Sending command command')
      commander.command()
    }

    if (button === 'circle' && value === false) {
      sendLog('Sending command')
      isStream ? commander.streamoff() : commander.streamon()
      isStream ? sendLog('Sending streamoff command') : sendLog('Sending streamon command')
      isStream = !isStream
    }
  }

  gamepad.onanalog = function (axis, value) {
  // console.log("ANALOG '"+axis+"' = "+value);
    if (axis === 'r2') {
      updateRC('d', scale(value, 0, 255, 0, 100))
    }
    if (axis === 'l2') {
      updateRC('d', -scale(value, 0, 255, 0, 100))
    }
    if (axis === 'lStickY') {
      updateRC('c', scale(value, 0, 255, 100, -100))
    }
    if (axis === 'lStickX') {
      updateRC('d', -scale(value, 0, 255, 100, -100))
    }
    if (axis === 'rStickX') {
      updateRC('a', -scale(value, 0, 255, 100, -100))
    }
    if (axis === 'rStickY') {
      updateRC('b', scale(value, 0, 255, 100, -100))
    }
  }

  gamepad.ondisconnect = function () {
    sendLog(gamepad.type.toUpperCase() + ' disconnected!')
    getDevice()
  }

  gamepad.onerror = function (error) {
  // TODO: handle this better
    sendLog('DualShock error.')
    console.log(error)
  }
}

//  Send RC control via four channels. a: left/right (-100~100)
// b: forward/backward (-100~100) c: up/down (-100~100)
// d: yaw (-100~100)

let rcObj = {
  a: 0,
  b: 0,
  c: 0,
  d: 0
}

function updateRC (k, v) {
  rcObj[k] = v
  commander.rc(rcObj.a, rcObj.b, rcObj.c, rcObj.d)
}

const scale = (num, inMin, inMax, outMin, outMax) => {
  let res = Math.round((num - inMin) * (outMax - outMin) / (inMax - inMin) + outMin)
  return res
}

getDevice()
