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

'use strict'

const dgram = require('dgram')

const client = dgram.createSocket('udp4')
client.bind(8889)

class Commander {
  constructor (host, port) {
    this.host = host || process.env.TelloCommandHost || '192.168.10.1'
    this.port = port || process.env.TelloCommandPort || 8889
    this.client = client
  }

  command (cb) {
    this.raw('command', cb)
  }

  takeoff (cb) {
    this.raw('takeoff', cb)
  }

  land (cb) {
    this.raw('land', cb)
  }

  streamon (cb) {
    this.raw('streamon', cb)
  }

  streamoff (cb) {
    this.raw('streamoff', cb)
  }

  emergency (cb) {
    this.raw('emergency', cb)
  }

  up (x, cb) {
    this.raw('up ' + x, cb)
  }

  down (x, cb) {
    this.raw('down ' + x, cb)
  }

  left (x, cb) {
    this.raw('left ' + x, cb)
  }

  right (x, cb) {
    this.raw('right ' + x, cb)
  }

  forward (x, cb) {
    this.raw('forward ' + x, cb)
  }

  back (x, cb) {
    this.raw('back ' + x, cb)
  }

  cw (x, cb) {
    this.raw('cw ' + x, cb)
  }

  ccw (x, cb) {
    this.raw('ccw ' + x, cb)
  }

  // l (left) r (right) f (forward) b (back)
  flip (x, cb) {
    this.raw('flip ' + x, cb)
  }

  go (x, y, z, speed, cb) {
    this.raw('go ' + x + ' ' + y + ' ' + z + ' ' + speed, cb)
  }

  curve (x1, y1, z1, x2, y2, z2, speed, cb) {
    this.raw('curve ' + x1 + ' ' + y1 + ' ' + z1 + ' ' + x2 + ' ' + y2 + ' ' + z2 + ' ' + speed, cb)
  }

  speed (x, cb) {
    this.raw('speed ' + x, cb)
  }

  rc (a, b, c, d, cb) {
    this.raw('rc ' + a + ' ' + b + ' ' + c + ' ' + d, cb)
  }

  wifi (ssid, pass, cb) {
    this.raw('wifi ' + ssid + ' ' + pass, cb)
  }

  getSpeed (cb) {
    this.raw('speed?', cb)
  }

  getBattery (cb) {
    this.raw('battery?', cb)
  }

  getTime (cb) {
    this.raw('time?', cb)
  }

  getHeight (cb) {
    this.raw('height?', cb)
  }

  getTemp (cb) {
    this.raw('temp?', cb)
  }

  getAttitude (cb) {
    this.raw('attitude?', cb)
  }

  getBaro (cb) {
    this.raw('baro?', cb)
  }

  getAcceleration (cb) {
    this.raw('acceleration?', cb)
  }

  getTOF (cb) {
    this.raw('tof?', cb)
  }

  getWifi (cb) {
    this.raw('wifi?', cb)
  }

  raw (command, cb) {
    const msg = Buffer.from(command)
    this.client.send(msg, 0, msg.length, this.port, this.host, cb)
  }
}

module.exports = Commander
