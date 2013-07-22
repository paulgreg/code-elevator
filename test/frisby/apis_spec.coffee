frisby = require 'frisby'
HOST = 'http://localhost:8000'

frisby.globalSetup({
    request: {
        headers:{'Accept': 'application/json'}
    }
})

frisby
    .create('Get /')
    .get(HOST + '/')
    .expectStatus(200)
    .toss()

frisby
    .create('Get /api/notfound')
    .get(HOST + '/api/notfound')
    .expectStatus(404)
    .toss()

frisby
    .create('Get /api/test data')
    .get(HOST + '/api/test')
    .expectStatus(200)
    .expectHeaderContains('content-type', 'application/json')
    .expectJSON({
        "msg": "Hello"
    })
    .toss()

