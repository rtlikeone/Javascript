class Timer {
  constructor(durationInput, startButton, pauseButton) {
    this.durationInput = durationInput;
    this.startButton = startButton;
    this.pauseButton = pauseButton;
    // this.start = this.start.bind(this);

    this.startButton.addEventListener("click", this.start);
    this.pauseButton.addEventListener("click", this.pause);
  }

  start = () => {
    console.log(this);
    console.log("Timer started");
    this.tick();
    this.interval = setInterval(this.tick, 1000);
  };

  pause = () => {
    console.log("Timer stopped");
    clearInterval(this.interval);
  };

  tick = () => {
    console.log("tick");
  };
}

const durationInput = document.querySelector("#duration");
const startButton = document.querySelector("#start");
const pauseButton = document.querySelector("#pause");

const timer = new Timer(durationInput, startButton, pauseButton);

// timer.start();