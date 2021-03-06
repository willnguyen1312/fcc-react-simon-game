import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {
  changeTurnToPlayer,
  updateController,
  partialS,
  start,
  toggleStrict,
  restart,
} from '../actions'

class Control extends Component {
  startGame = () => {
    const first = this.props.series.slice(0, 3)
    const { dispatch } = this.props

    this.playSeq(first)

    dispatch(start())
    dispatch(partialS(first))
  }

  toggle = () => {
    this.props.dispatch(toggleStrict())
  }

  restart = () => {
    this.props.dispatch(restart())
  }

  playSeq = (sequence) => {
    let i = 0
    const interval = setInterval(() => {
      this.props.lightUp(sequence[i])
      i += 1
      if (i >= sequence.length) {
        clearInterval(interval)
        this.props.dispatch(changeTurnToPlayer())
        this.props.dispatch(updateController())
      }
    }, 1200)
  }

  render() {
    // eslint-disable-next-line
    if (this.props.turn === 'PlaySeq') {
      this.playSeq(this.props.partialSeries)
    }

    return (
      <div className={this.props.name}>
        <h2 style={{ marginTop: 10 }}>Simon Game</h2>
        <div>
          <h1 className="count" style={{ float: 'left' }}>
            {this.props.partialSeries.length}
          </h1>

          <button
            className={
              // eslint-disable-next-line
              this.props.status !== 'Beginning'
                ? 'btn btn-danger disabled'
                : 'btn btn-danger  active'
            }
            onClick={this.props.status === 'Beginning' ? this.startGame : null}
            style={{ float: 'left', marginRight: -15 }}
          >
            {' '}
            Start{' '}
          </button>
        </div>
        <div>
          <button
            className="round-btn"
            style={{
              top: 5,
              backgroundColor: this.props.mode ? 'red' : 'blue',
            }}
            onClick={this.toggle}
          />
          <h5>{this.props.mode ? 'HARD' : 'EASY'}</h5>
        </div>

        <button className="btn btn-primary" style={{ marginTop: -8 }} onClick={this.restart}>
          {' '}
          Restart Game{' '}
        </button>
      </div>
    )
  }
}

Control.propTypes = {
  series: PropTypes.arrayOf(PropTypes.number).isRequired,
  dispatch: PropTypes.func.isRequired,
}

export default connect()(Control)
