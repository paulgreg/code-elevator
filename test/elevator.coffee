should = require 'should'
Elevator = require '../server/elevator.js'

describe 'Elevator module', () ->

   describe '#nextCommand', () ->

      it 'should return NOTHING', () ->
          elevator = new Elevator()
          elevator.nextCommand().should.equal 'NOTHING'
          elevator.nextCommand().should.equal 'NOTHING'

      it 'should return UP, OPEN, NOTHING', () ->
          elevator = new Elevator()
          elevator.call 1, 'UP'
          elevator.nextCommand().should.equal 'UP'
          elevator.nextCommand().should.equal 'OPEN'
          elevator.nextCommand().should.equal 'NOTHING'

      it 'should return DOWN, DOWN, OPEN, NOTHING', () ->
          elevator = new Elevator(2)
          elevator.call 0, 'DOWN'
          elevator.nextCommand().should.equal 'DOWN'
          elevator.nextCommand().should.equal 'DOWN'
          elevator.nextCommand().should.equal 'OPEN'
          elevator.nextCommand().should.equal 'NOTHING'

      it 'should return UP, OPEN, CLOSE, UP, OPEN, NOTHING', () ->
          elevator = new Elevator()
          elevator.call 1, 'UP'
          elevator.call 2, 'UP'
          elevator.nextCommand().should.equal 'UP'
          elevator.nextCommand().should.equal 'OPEN'
          elevator.nextCommand().should.equal 'CLOSE'
          elevator.nextCommand().should.equal 'UP'
          elevator.nextCommand().should.equal 'OPEN'
          elevator.nextCommand().should.equal 'NOTHING'

    describe '#infos', () ->

      it 'should return correct values', () ->
          elevator = new Elevator(3)
          elevator.call 2, 'UP'
          infos = elevator.infos()
          infos.currentFloor.should.equal 3
          infos.doorsOpen.should.equal false
          infos.calls[0].should.equal false
          infos.calls[1].should.equal false
          infos.calls[2].should.equal true
          infos.calls[3].should.equal false
          infos.calls[4].should.equal false
