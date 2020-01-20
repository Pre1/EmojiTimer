import React, { Component } from "react";

import style from "./defaultStyles.css";

class EmojiTimer extends Component {
  initialState = {
    prefredEmoji: "⏱",
    min: "00",
    sec: "00",
    started: false,
    ended: false,
    timerId: null,
    targetTime_ms: 0,
    classNames: "timerBox",

    timerStatus: "badge-dark",
    currentAnimation: "",
    startingAnimation: "vibrate-1",
    endingAnimation: "shake-top",
    conditionalAnimation: null,
    styleContainer: null,
    styleTimer: null
  };

  state = {
    ...this.initialState
  };

  componentDidMount() {
    this.resetTimer();
  }

  resetTimer = () => {
    const {
      prefredEmoji,
      duration,
      timerStarted,
      startingAnimation,
      endingAnimation,
      conditionalAnimation,
      className,
      styleContainer,
      styleTimer
    } = this.props;

    this.setState({
      prefredEmoji: prefredEmoji || this.initialState.prefredEmoji,
      targetTime_ms: duration * 60 * 1000,
      started: timerStarted,
      startingAnimation:
        startingAnimation || this.initialState.startingAnimation,
      endingAnimation: endingAnimation || this.initialState.endingAnimation,
      conditionalAnimation:
        conditionalAnimation || this.initialState.conditionalAnimation,

      classNames: className || this.initialState.classNames,

      styleContainer: styleContainer || this.initialState.styleContainer,
      styleTimer: styleTimer || this.initialState.styleTimer
    });

    if (timerStarted) {
      this.onCountdown();
      this.setState({ currentAnimation: this.state.startingAnimation });
    }
  };

  onCountdown = () => {
    const timerId = setInterval(() => {
      const { targetTime_ms, conditionalAnimation } = this.state;

      if (targetTime_ms <= 0) {
        this.setState({ currentAnimation: this.state.endingAnimation });
        return this.timerStop();
      }

      function isSingleDigit(num) {
        return `${num}`.length <= 1;
      }

      const newTargetTime_ms = targetTime_ms - 1000;

      let mins = Math.floor(
        (newTargetTime_ms % (1000 * 60 * 60)) / (1000 * 60)
      );

      let secs = Math.floor((newTargetTime_ms % (1000 * 60)) / 1000);

      if (isSingleDigit(mins)) {
        mins = `0${mins}`;
      }

      if (isSingleDigit(secs)) {
        secs = `0${secs}`;
      }

      const changes = { min: mins, sec: secs, targetTime_ms: newTargetTime_ms };

      if (conditionalAnimation) {
        const { targetTimerInMin, animation } = conditionalAnimation;
        if (targetTime_ms <= targetTimerInMin * 60 * 1000) {
          return this.setState({
            ...changes,
            currentAnimation: animation
          });
        }
      }

      this.setState({ ...changes });
    }, 1000);

    this.setState({ timerId });
  };

  componentDidUpdate(prevState, prevProps) {
    const { timerStarted } = this.props;
    const { started, startingAnimation } = this.state;
    if (timerStarted !== started) {
      this.onCountdown();
      this.setState({ started: true, currentAnimation: startingAnimation });
    }
  }

  clearTimer = () => {
    const { timerId } = this.state;
    clearInterval(timerId);
  };

  timerStop = () => {
    const { onTimerOff } = this.props;
    const { endingAnimation } = this.state;
    this.clearTimer();
    this.setState({ ended: true, currentAnimation: endingAnimation });

    if (onTimerOff) {
      onTimerOff();
    }
  };

  render() {
    const {
      prefredEmoji,
      min,
      sec,
      currentAnimation,
      classNames,
      styleContainer,
      styleTimer
    } = this.state;

    return (
      <>
        <span
          className={`${classNames} ${currentAnimation}`}
          style={{ width: "25%", ...styleContainer }}
        >
          <span className="" style={{ width: "40%", ...styleTimer }}>
            {prefredEmoji} &nbsp; {min} : {sec}
          </span>
        </span>
      </>
    );
  }
}

export default EmojiTimer;
