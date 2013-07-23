frisby = require 'frisby'

HOST = 'http://localhost:8000'

frisby
    .create('Get /')
    .get(HOST + '/')
    .expectStatus(200)
    .toss()

frisby
    .create('Get /reset ')
    .get(HOST + '/reset')
    .expectStatus(200)
    .toss()

frisby
    .create('Get /nextCommand')
    .get(HOST + '/nextCommand')
    .expectStatus(200)
    .expectBodyContains('NOTHING')
    .toss()

frisby
    .create('Get /call?atFloor=4&to=UP')
    .get(HOST + '/call')
    .expectStatus(200)
    .toss()

frisby
    .create('Get /go?floorToGo=5')
    .get(HOST + '/go')
    .expectStatus(200)
    .toss()

frisby
    .create('Get /userHasEntered')
    .get(HOST + '/userHasEntered')
    .expectStatus(200)
    .toss()

frisby
    .create('Get /userHasExited')
    .get(HOST + '/userHasExited')
    .expectStatus(200)
    .toss()

frisby
    .create('Get /infos')
    .get(HOST + '/infos')
    .expectStatus(200)
    .expectJSONTypes({
        currentFloor: Number,
        doorsOpen: Boolean,
        calls: Array
    })
    .toss()

frisby
    .create('Get /api/NotFound')
    .get(HOST + '/api/NotFound')
    .expectStatus(404)
    .toss()

