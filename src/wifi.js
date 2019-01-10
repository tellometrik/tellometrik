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

var wifi = require('node-wifi')
const WebSocket = require('ws')

//  Initialize wifi-control package with verbose output
wifi.init({
  iface: null // network interface, choose a random wifi interface if set to null
});

module.exports = function (wss) {
  function seekWifi () {

    wifi.getCurrentConnections(function(err, currentConnections) {
      if (err) {
        console.log(err);
      }
      if (currentConnections.length > 0 && currentConnections[0].ssid.indexOf('TELLO') > -1){
        return
      }
    
          sendLog('seeking Wifi enpoints, searching for TELLO*')

    wifi.scan(function(err, response) {
      if (err) console.log(err)
      console.log(response)
      for (var i = response.length - 1; i >= 0; i--) {
        if (response[i].ssid.indexOf('TELLO') > -1) {
          var results = wifi.connect(response[i], function (err, response) {
            if (err) {
              console.log(err)
              sendLog('Wifi connection error.')
              return
            }
            sendLog('Wifi connection to Tello established.')
            console.log(response)
          })
        } else {

        }
      };
    })

    });
  }

  seekWifi()
  setInterval(function (argument) {
    seekWifi()
  }, 10000)

  function sendLog (msg) {
    wss.clients.forEach(function each (client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(msg)
      }
    })
  }
}
