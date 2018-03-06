import $ from 'jquery'

const sound1 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3')
const sound2 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3')
const sound3 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3')
const sound4 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3')
const soundBoard = [sound1, sound2, sound3, sound4]

function getRandomIntInclusive(f, s) {
  const min = Math.ceil(f)
  const max = Math.floor(s)
  // eslint-disable-next-line
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function getSeries() {
  const series = []
  for (let i = 0; i < 24; i += 1) {
    series[i] = getRandomIntInclusive(0, 3)
  }
  return series
}

function lightUp(tile) {
  const toAnimate = $(`#tile${tile}`)

  toAnimate.addClass('anim')

  soundBoard[tile].playbackRate = 0.7
  soundBoard[tile].play()

  setTimeout(() => {
    toAnimate.removeClass('anim')
  }, 500)
}

function checkEquality(partialSeries, lengthController, playerInput) {
  return partialSeries[lengthController] === playerInput[lengthController]
}

const initialStore = {
  series: getSeries(),
  partialSeries: [],
  playerInputs: [],
  // the mode will be used for setting strict mode or free mode
  strictMode: false,
  // the turn it will be used for playing the automated sequence
  turn: '',
  // the status it will be used for making the divs clickable and the button unclickable
  status: 'Beginning',
  clickable: false,
  lightUp,
  lengthController: -1,
}

export default function reducer(state = initialStore, { type, payload }) {
  switch (type) {
    case 't.start': {
      return { ...state, status: payload }
    }

    case 't.changeTurn': {
      return { ...state, turn: payload, clickable: true }
    }

    // assign partial series
    case 't.partialS': {
      return { ...state, partialSeries: payload }
    }

    case 't.updateController': {
      return { ...state, lengthController: payload }
    }

    case 't.setStrict': {
      return { ...state, strictMode: !state.strictMode }
    }

    case 't.restart': {
      return { ...initialStore, series: getSeries(), strictMode: state.strictMode }
    }

    case 't.updateInputs': {
      // used for checking equality and incrementing partial series when needed
      // eslint-disable-next-line
      state.lengthController += 1
      // we add the input each time with the ... spread operator
      // eslint-disable-next-line
      state.playerInputs = [...state.playerInputs, payload]

      const nextTurn = checkEquality(
        state.partialSeries,
        state.lengthController,
        state.playerInputs,
      )

      // check condition for completing all 24 series
      if (state.partialSeries.length === state.series.length) {
        // eslint-disable-next-line
        alert('You Won')
        return { ...initialStore, series: getSeries() }
      }

      // check condition for incrementing partialSeries
      if (state.playerInputs.length === state.partialSeries.length && nextTurn) {
        state.lightUp(payload)
        const incremented = state.series.slice(0, state.playerInputs.length + 1)

        return {
          ...state,
          partialSeries: incremented,
          turn: 'PlaySeq',
          playerInputs: [],
        }
      }

      if (nextTurn) {
        state.lightUp(payload)
        return { ...state }
      } else if (!state.strictMode) {
        // eslint-disable-next-line
        alert('Miss, play the sequence again?')
        // we use 'NextSeq' to play our sequence again
        return { ...state, turn: 'PlaySeq', playerInputs: [] }
      }
      // eslint-disable-next-line
      alert('Miss, Hard mode will reset everything!')
      // we reset everything back to origin
      return { ...initialStore, series: getSeries(), strictMode: state.strictMode }
    }

    default:
      return state
  }
}
