should = require 'should'
Elevator = require '../server/elevator.js'

describe 'Elevator module', () ->

   describe '#nextCommand', () ->

      it 'should return NOTHING', () ->
          elevator = new Elevator()
          elevator.nextCommand().should.equal 'NOTHING'

      it 'should return UP', () ->
          elevator = new Elevator(0, 'UP', 5, false)
          elevator.nextCommand().should.equal 'UP'

      it 'should return DOWN', () ->
          elevator = new Elevator(5, 'DOWN', 1, false)
          elevator.nextCommand().should.equal 'DOWN'
