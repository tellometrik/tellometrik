<h2 align="center">Tellometrik</h2>
<h4 align="center">Desktop Electron app for Tello Ryze DJI drone</h4>

<p align="center"><a href="https://www.gnu.org/licenses/gpl-3.0.en.html" target="_blank"><img src="https://img.shields.io/badge/license-GPL%20v3-green.svg" /></a></p>

**Use at your own risk. Remove the props before testing.** This is a early version of the software, read the sourcecode before use.

- PS4 Dualshock controller support for controlling Tello
- Telemetry data display
- Wifi and Dualshock autoconnect
- Three video streams modes supported (mplayer, ffmpeg, jmuxer)

## Technical Overview

To clone and run this repository you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

```bash
# Clone this repository
git clone https://github.com/tellometrik/tellometrik.git
# Go into the repository
cd tellometrik
# Install dependencies
npm install
# Run the app
npm start
```

## Video stream Overview

To change the vide player set VIDEO_PLAYER environment variable to 'mplayer', 'ffmpeg' or 'jmuxer'

```bash
# Set env variable
export VIDEO_PLAYER=jmuxer
```

You will need to install mplayer separately, ffmpeg binaries will be installed automatically.

Mplayer will be started in a separate window, and it seems to provide best results.
jmuxer and ffmpeg streams will be displayed in-app.


## Controller overview

Check out src/controller.js for details on Dualshock implementation. You can tweak values there to achieve different behaviours.
It will attempt to connect to controller automatically every five seconds.

Gampad controls:

- touchpad press: Emergency shutdown

- triangle: takeoff
- square: land
- cross: send 'command'
- circle: toggle streamon / streamoff

- up/down/left/right buttons - flips

- L2/R2 - yaw

- Left stick - up/down/yaw
- Right stick - left/right/forward/back 


## Wifi overview

Check out src/wifi.js for details on wifi implementation.

If the network containing 'TELLO' in the ssid is available it will autmatically try to connect. It expects no password is required for connection.


## License

Copyright 2019 Nikola Jokic (Croatia) <nikolajokic@protonmail.com>

Tellometrik is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

Tellometrik is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with Tellometrik.  If not, see <http://www.gnu.org/licenses/>.
