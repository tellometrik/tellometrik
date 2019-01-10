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

var controllerSocket = new WebSocket('ws://localhost:48950')

controllerSocket.onmessage = function (event) {
  console.log(event.data)

  var elem = $('#controllerOutput')
  elem.append('<samp>->  ' + event.data + '</samp><br>')
	  var height = elem[0].scrollHeight
	  elem.scrollTop(height)
}

function sendCommand (argument) {
  // body...
  controllerSocket.send(argument)
}
