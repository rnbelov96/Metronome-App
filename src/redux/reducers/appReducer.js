import {
  CHANGESOUND,
  PLAYSOUND,
  CHANGEINPUT,
  STARTCLICKING,
  STOPCLICKING,
} from '../actions/actionsTypes';
import clickSound1 from '../../audio/click1.wav';
import clickSound2 from '../../audio/click2.wav';

const initialState = {
  bpm: 100,
  currentSound: 1,
  isStarted: false,
};

const sounds = {
  clickEl1: new Audio(clickSound1),
  clickEl2: new Audio(clickSound2),
};

export default function(state = initialState, action) {
  switch (action.type) {
    case STARTCLICKING:
      return {
        ...state,
        isStarted: true,
      };

    case STOPCLICKING:
      return {
        ...state,
        isStarted: false,
      };

    case CHANGESOUND:
      return {
        ...state,
        currentSound: state.currentSound === 1 ? 2 : 1,
      };

    case PLAYSOUND:
      sounds[`clickEl${state.currentSound}`].play();
      return {
        ...state,
      };

    case CHANGEINPUT:
      return {
        ...state,
        bpm: action.payload,
      };

    default:
      return state;
  }
}
