import * as React from "react"
import * as ReactDOM from "react-dom"
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import "./style.css"
import Main from './containers/main'
import reducerApp from './reducers/app'
import { initialState } from "./reducers/app"

let store = createStore(reducerApp, initialState, 
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

ReactDOM.render(
    <Provider store={store}>
        <Main />
    </Provider>,
    document.getElementById("root"),
)