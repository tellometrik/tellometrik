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

var options = {
  maintainAspectRatio: false,
  title: {
    display: false
  },
  scales: {
    yAxes: [{
      ticks: {
        display: true,
        fontSize: 8
        //                suggestedMin: 10,
        // // the data maximum used for determining the ticks is Math.max(dataMax, suggestedMax)
        // suggestedMax: 50

      },
      gridLines: {
        display: false
      }
    }],
    xAxes: [{
      ticks: {
        display: false,
        fontSize: 8
      },
      gridLines: {
        display: false
      }
    }]
  },
  legend: {
    display: false
  },
  tooltips: {
    enabled: false
  },
  elements: {
    point: {
      radius: 0
    }
  }
}

Chart.defaults.scale.gridLines.display = false

var pryCtx = document.getElementById('pry').getContext('2d')
var pry = new Chart(pryCtx, {
  type: 'line',
  data: {
    labels: [],
    datasets: [{
      label: 'Pitch',
      data: [],
      steppedLine: true,
      borderColor: '#3e95cd',
      borderWidth: 1
    }, {
      label: 'Roll',
      data: [],
      steppedLine: true,
      borderColor: '#cc0088',
      borderWidth: 1
    }, {
      label: 'Yaw',
      data: [],
      steppedLine: true,
      borderColor: '#fa6538',
      borderWidth: 1
    }]
  },
  options: options
})

var vCtx = document.getElementById('v').getContext('2d')
var v = new Chart(vCtx, {
  type: 'line',
  data: {
    labels: [],
    datasets: [{
      label: 'vgx',
      data: [],
      steppedLine: true,
      borderColor: '#3e95cd',
      borderWidth: 1
    }, {
      label: 'vgy',
      data: [],
      steppedLine: true,
      borderColor: '#cc0088',
      borderWidth: 1
    }, {
      label: 'vgz',
      data: [],
      steppedLine: true,
      borderColor: '#fa6538',
      borderWidth: 1
    }]
  },
  options: options
})

var tempCtx = document.getElementById('temp').getContext('2d')
var temp = new Chart(tempCtx, {
  type: 'line',
  data: {
    labels: [],
    datasets: [{
      label: 'temph',
      data: [],
      steppedLine: true,
      borderColor: '#3e95cd',
      borderWidth: 1
    }, {
      label: 'templ',
      data: [],
      steppedLine: true,
      borderColor: '#cc0088',
      borderWidth: 1
    }]
  },
  options: options
})

var heightCtx = document.getElementById('height').getContext('2d')
var height = new Chart(heightCtx, {
  type: 'line',
  data: {
    labels: [],
    datasets: [{
      label: 'height',
      data: [],
      steppedLine: true,
      borderColor: '#3e95cd',
      borderWidth: 1
    }]
  },
  options: options
})

var batCtx = document.getElementById('bat').getContext('2d')
var bat = new Chart(batCtx, {
  type: 'line',
  data: {
    labels: [],
    datasets: [{
      label: 'bat',
      data: [],
      steppedLine: true,
      borderColor: '#3e95cd',
      borderWidth: 1
    }]
  },
  options: options
})

var baroCtx = document.getElementById('baro').getContext('2d')
var baro = new Chart(baroCtx, {
  type: 'line',
  data: {
    labels: [],
    datasets: [{
      label: 'baro',
      data: [],
      steppedLine: true,
      borderColor: '#3e95cd',
      borderWidth: 1
    }]
  },
  options: options
})

var timeCtx = document.getElementById('time').getContext('2d')
var time = new Chart(timeCtx, {
  type: 'line',
  data: {
    labels: [],
    datasets: [{
      label: 'time',
      data: [],
      steppedLine: true,
      borderColor: '#3e95cd',
      borderWidth: 1
    }]
  },
  options: options
})

var aCtx = document.getElementById('a').getContext('2d')
var a = new Chart(aCtx, {
  type: 'line',
  data: {
    labels: [],
    datasets: [{
      label: 'agx',
      data: [],
      steppedLine: true,
      borderColor: '#3e95cd',
      borderWidth: 1
    }, {
      label: 'agy',
      data: [],
      steppedLine: true,
      borderColor: '#cc0088',
      borderWidth: 1
    }, {
      label: 'agz',
      data: [],
      steppedLine: true,
      borderColor: '#fa6538',
      borderWidth: 1
    }]
  },
  options: options
})
