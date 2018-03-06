export function updateInputs(num) {
  return {
    type: 't.updateInputs',
    payload: num,
  }
}

export function updateController() {
  return {
    type: 't.updateController',
    payload: -1,
  }
}

export function start() {
  return {
    type: 't.start',
    payload: 'Running',
  }
}

export function partialS(arr) {
  return {
    type: 't.partialS',
    payload: arr,
  }
}

export function changeTurnToPlayer() {
  return {
    type: 't.changeTurn',
    payload: 'player',
  }
}

export function toggleStrict() {
  return {
    type: 't.setStrict',
    payload: null,
  }
}

export function restart() {
  return {
    type: 't.restart',
    payload: null,
  }
}
