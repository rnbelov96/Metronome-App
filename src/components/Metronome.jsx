import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  startClicking,
  changeSound,
  playSound,
  changeInput,
  stopClicking,
} from '../redux/actions/actions';

let interval;

const variablesCSS = {
  mainColor: '#fc6868',
  secondColor: '#6e2f2f',
};

const Button = styled.button`
  background: ${variablesCSS.mainColor};
  margin-top: 15px;
  border: ${variablesCSS.secondColor} 2px solid;
  border-radius: 5px;
  padding: 7px 15px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 40%;
  margin: 20px auto 0px auto;
  @media(max-width: 650px) {
    width: 60%;
  }
  @media(max-width: 450px) {
    width: 80%;
  }
`;

const BPM = styled.div`
  font-size: 40px;
  margin-top: 50px;
`;

const Title = styled.h1``;

const Input = styled.input`
  width: 100%;
  margin-top: 10px;
  -webkit-appearance: none;
  margin: 10px 0;
  width: 100%;
  :focus {
    outline: none;
  }
  ::-webkit-slider-runnable-track {
    width: 100%;
    height: 12.8px;
    cursor: pointer;
    animate: 0.2s;
    box-shadow: 0px 0px 0px #000000, 0px 0px 0px #0d0d0d;
    background: ${variablesCSS.mainColor};
    border-radius: 25px;
    border: 0px solid #000101;
  }
  ::-webkit-slider-thumb {
    box-shadow: 0px 0px 0px #000000, 0px 0px 0px #0d0d0d;
    border: 0px solid #000000;
    height: 20px;
    width: 39px;
    border-radius: 7px;
    background: #65001c;
    cursor: pointer;
    -webkit-appearance: none;
    margin-top: -3.6px;
  }
  :focus::-webkit-slider-runnable-track {
    background: ${variablesCSS.mainColor};
  }
  ::-moz-range-track {
    width: 100%;
    height: 12.8px;
    cursor: pointer;
    animate: 0.2s;
    box-shadow: 0px 0px 0px #000000, 0px 0px 0px #0d0d0d;
    background: ${variablesCSS.mainColor};
    border-radius: 25px;
    border: 0px solid #000101;
  }
  ::-moz-range-thumb {
    box-shadow: 0px 0px 0px #000000, 0px 0px 0px #0d0d0d;
    border: 0px solid #000000;
    height: 20px;
    width: 39px;
    border-radius: 7px;
    background: #65001c;
    cursor: pointer;
  }
  ::-ms-track {
    width: 100%;
    height: 12.8px;
    cursor: pointer;
    animate: 0.2s;
    background: transparent;
    border-color: transparent;
    border-width: 39px 0;
    color: transparent;
  }
  ::-ms-fill-lower {
    background: ${variablesCSS.mainColor};
    border: 0px solid #000101;
    border-radius: 50px;
    box-shadow: 0px 0px 0px #000000, 0px 0px 0px #0d0d0d;
  }
  ::-ms-fill-upper {
    background: ${variablesCSS.mainColor};
    border: 0px solid #000101;
    border-radius: 50px;
    box-shadow: 0px 0px 0px #000000, 0px 0px 0px #0d0d0d;
  }
  ::-ms-thumb {
    box-shadow: 0px 0px 0px #000000, 0px 0px 0px #0d0d0d;
    border: 0px solid #000000;
    height: 20px;
    width: 39px;
    border-radius: 7px;
    background: #65001c;
    cursor: pointer;
  }
  :focus::-ms-fill-lower {
    background: ${variablesCSS.mainColor};
  }
  :focus::-ms-fill-upper {
    background: ${variablesCSS.mainColor};
  }
`;

function Metronome({
  onStart, onChange, bpm, onStop, isStarted,
}) {
  const startFunc = () => onStart(bpm);
  const stopFunc = () => onStop();
  return (
    <Container>
      <Title>Metronome App</Title>
      <BPM>{`${bpm} BPM`}</BPM>
      <Input
        onChange={e => onChange(e.target.value)}
        onMouseUp={isStarted ? () => onStart(bpm) : () => {}}
        type="range"
        min="40"
        max="218"
        value={bpm}
      />
      <Button onClick={isStarted ? stopFunc : startFunc} type="button">
        {isStarted ? 'Stop' : 'Start'}
      </Button>
    </Container>
  );
}

Metronome.propTypes = {
  isStarted: PropTypes.bool.isRequired,
  bpm: PropTypes.number.isRequired,
  onStart: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onStop: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    currentSound: state.appState.currentSound,
    bpm: state.appState.bpm,
    isStarted: state.appState.isStarted,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onStart: bpm => {
      clearInterval(interval);
      dispatch(playSound());
      dispatch(changeSound());
      interval = setInterval(() => {
        dispatch(playSound());
        dispatch(changeSound());
      }, (1 / (bpm / 60)) * 1000);
      dispatch(startClicking());
    },
    onChange: bpm => {
      dispatch(changeInput(bpm));
    },
    onStop: () => {
      clearInterval(interval);
      dispatch(stopClicking());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Metronome);
