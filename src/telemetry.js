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
const stats = dgram.createSocket('udp4')

const WebSocket = require('ws')

const wss = new WebSocket.Server({ port: 48949 })

stats.bind(8890)

wss.on('connection', function connection (ws) {
  console.log('Client Connected')
})

stats.on('message', (msg) => {
  wss.clients.forEach(function each (client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(parseStatsMsg(msg.toString())))
    }
  })
})

function parseStatsMsg (msg) {
  let res = {}
  let x = msg.toString().split(';')
  x.forEach(function (value) {
    let _item = value.split(':')
    if (_item[0]) res[_item[0]] = _item[1]
  })
  return res
}
