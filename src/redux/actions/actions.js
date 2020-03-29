import {
  CHANGEINPUT,
  CHANGESOUND,
  PLAYSOUND,
  STARTCLICKING,
  STOPCLICKING,
} from './actionsTypes';

export function changeInput(data) {
  return {
    type: CHANGEINPUT,
    payload: data,
  };
}

export function startClicking() {
  return {
    type: STARTCLICKING,
  };
}

export function stopClicking() {
  return {
    type: STOPCLICKING,
  };
}

export function changeSound() {
  return {
    type: CHANGESOUND,
  };
}

export function playSound() {
  return {
    type: PLAYSOUND,
  };
}
