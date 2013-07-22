should = require 'should'
server = require '../server/server.js'

describe 'Code Elevator module', () ->
   describe '#dummy', () ->
      it 'should return hello', () ->
          server.dummy().should.equal 'hello'
