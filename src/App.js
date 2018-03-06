/* eslint react/jsx-no-target-blank : 0 */
import React, { Component, Fragment } from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import './App.css'

import Footer from './components/Footer'
import reducer from './reducer'

import { updateInputs } from './actions'

import Control from './components/Control'

const store = createStore(
  reducer,
  // eslint-disable-next-line
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
)

export default class App extends Component {
  componentDidMount() {
    this.unsubscribe = store.subscribe(() =>
      // each time the store will update we will re-render
      this.forceUpdate())
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  render() {
    const state = store.getState()

    return (
      <Provider store={store}>
        <Fragment>
          <div className="flex-container">
            <Color1 name="colors t-l" id="tile0" clickable={state.clickable} />
            <Color2 name="colors t-r" id="tile1" clickable={state.clickable} />
            <Color3 name="colors b-l" id="tile2" clickable={state.clickable} />
            <Color4 name="colors b-r" id="tile3" clickable={state.clickable} />
            <Control
              name="center"
              series={state.series}
              lightUp={state.lightUp}
              turn={state.turn}
              status={state.status}
              partialSeries={state.partialSeries}
              mode={state.strictMode}
            />
          </div>
          <Footer>
            Made by{' '}
            <a target="_blank" href="http://namnguyen.design">
              Nam Nguyen
            </a>
            {' - '}
            Inspired by{' '}
            <a target="_blank" href="https://codepen.io/Spartano/">
              victor
            </a>
          </Footer>
        </Fragment>
      </Provider>
    )
  }
}

// eslint-disable-next-line
class Color1 extends Component {
  onClick = () => {
    // eslint-disable-next-line
    if (this.props.clickable) {
      store.dispatch(updateInputs(0))
    }
  }

  render() {
    return <div className={this.props.name} onClick={this.onClick} id={this.props.id} />
  }
}

// eslint-disable-next-line
class Color2 extends Component {
  onClick = () => {
    // eslint-disable-next-line
    if (this.props.clickable) {
      store.dispatch(updateInputs(1))
    }
  }

  render() {
    return <div className={this.props.name} onClick={this.onClick} id={this.props.id} />
  }
}

// eslint-disable-next-line
class Color3 extends Component {
  onClick = () => {
    // eslint-disable-next-line
    if (this.props.clickable) {
      store.dispatch(updateInputs(2))
    }
  }

  render() {
    return <div className={this.props.name} onClick={this.onClick} id={this.props.id} />
  }
}

// eslint-disable-next-line
class Color4 extends Component {
  onClick = () => {
    // eslint-disable-next-line
    if (this.props.clickable) {
      store.dispatch(updateInputs(3))
    }
  }

  render() {
    return <div className={this.props.name} onClick={this.onClick} id={this.props.id} />
  }
}
