import app, { initialState } from "../../src/reducers/app"
import * as actions from "../../src/actions/index"

describe('reducers', () => {
    it('should use default', () => {
        var reducedState = app(undefined, actions.connected())
        expect(reducedState).toEqual(initialState)  
    })

    it('should connect', () => {
        var reducedState = app(initialState, actions.connected())
        expect(reducedState.connected).toEqual(true)
    })

    it('should set username', () => {
        var reducedState = app(initialState, actions.setUsername("tony"))
        expect(reducedState.username).toEqual("tony")
        expect(reducedState.logged_in).toEqual(true)
    })

    it('should add message', () => {
        var reducedState = app(initialState, actions.connected())
        reducedState = app(reducedState, actions.setUsername("tony"))
        var message = {
            username: "tony",
            body: "hey guys",
            isLog: false
        }
        reducedState = app(reducedState, actions.addChatMessage(message))
        expect(reducedState.messages[0]).toEqual(message)
    })

    it('should not add message - #1', () => {
        var reducedState = Object.assign({}, initialState, { connected: false })
        reducedState = app(reducedState, actions.setUsername("tony"))
        var message = {
            username: "tony",
            body: "hey guys",
            isLog: false
        }
        reducedState = app(reducedState, actions.addChatMessage(message));
        expect(reducedState.messages[0]).toEqual(undefined)
    })

    it('should not add message - #2', () => {
        var reducedState = app(initialState, actions.connected())
        reducedState = app(reducedState, actions.setUsername("tony"))
        reducedState = app(reducedState, actions.addChatMessage(undefined))
        expect(reducedState.messages[0]).toEqual(undefined)
    })
  })

// TODO: enhance tests to pass & add new ones!