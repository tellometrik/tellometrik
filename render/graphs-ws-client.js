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

var dataLimit = 300

var telemetrySocket = new WebSocket('ws://localhost:48949')

telemetrySocket.onmessage = function (event) {
  var msg = JSON.parse(event.data)

  $('#headerVelocityX').text(msg.vgx)
  $('#headerVelocityY').text(msg.vgy)
  $('#headerVelocityZ').text(msg.vgz)
  $('#headerRoll').text(msg.roll)
  $('#headerPitch').text(msg.pitch)
  $('#headerYaw').text(msg.yaw)
  $('#headerBattery').text(msg.bat)
  $('#headerTime').text(msg.time)
  $('#headerHeight').text(msg.h)

  // dataPoints.push({x: new Date(), y: parseFloat(msg.baro)})
  // console.log(msg)
  	pry.data.datasets[0].data.push(Number(msg.pitch))
  pry.data.datasets[1].data.push(Number(msg.roll))
  pry.data.datasets[2].data.push(Number(msg.yaw))
  pry.data.labels.push(pry.data.labels.length + 1)

  if (pry.data.labels.length > dataLimit) {
    pry.data.labels.shift()
    pry.data.datasets[0].data.shift()
    pry.data.datasets[1].data.shift()
    pry.data.datasets[2].data.shift()
  }

  pry.update()

  v.data.datasets[0].data.push(Number(msg.vgx))
  v.data.datasets[1].data.push(Number(msg.vgy))
  v.data.datasets[2].data.push(Number(msg.vgz))
  v.data.labels.push(v.data.labels.length + 1)
  if (v.data.labels.length > dataLimit) {
    v.data.labels.shift()
    v.data.datasets[0].data.shift()
    v.data.datasets[1].data.shift()
    v.data.datasets[2].data.shift()
  }

  v.update()

  temp.data.datasets[0].data.push(Number(msg.temph))
  temp.data.datasets[1].data.push(Number(msg.templ))

  temp.data.labels.push(temp.data.labels.length + 1)
  if (temp.data.labels.length > dataLimit) {
    temp.data.labels.shift()
    temp.data.datasets[0].data.shift()
    temp.data.datasets[1].data.shift()
  }
  temp.update()

  height.data.datasets[0].data.push(Number(msg.h))
  height.data.labels.push(height.data.labels.length + 1)
  if (height.data.labels.length > dataLimit) {
    height.data.labels.shift()
    height.data.datasets[0].data.shift()
  }
  height.update()

  bat.data.datasets[0].data.push(Number(msg.bat))

  bat.data.labels.push(bat.data.labels.length + 1)
  if (bat.data.labels.length > dataLimit) {
    bat.data.labels.shift()
    bat.data.datasets[0].data.shift()
  }
  bat.update()

  baro.data.datasets[0].data.push(Number(msg.baro))
  baro.data.labels.push(baro.data.labels.length + 1)
  if (baro.data.labels.length > dataLimit) {
    baro.data.labels.shift()
    baro.data.datasets[0].data.shift()
  }
  baro.update()

  time.data.datasets[0].data.push(Number(msg.time))
  time.data.labels.push(time.data.labels.length + 1)
  if (time.data.labels.length > dataLimit) {
    time.data.labels.shift()
    time.data.datasets[0].data.shift()
  }
  time.update()

  a.data.datasets[0].data.push(Number(msg.agx))
  a.data.datasets[1].data.push(Number(msg.agy))
  a.data.datasets[2].data.push(Number(msg.agz))
  a.data.labels.push(a.data.labels.length + 1)
  if (a.data.labels.length > dataLimit) {
    a.data.labels.shift()
    a.data.datasets[0].data.shift()
    a.data.datasets[1].data.shift()
    a.data.datasets[2].data.shift()
  }
  a.update()
}
