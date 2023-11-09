const refs = {
  startBtn: document.querySelector('[data-start]'),
  stopBtn: document.querySelector('[data-stop]'),
  body: document.querySelector('body'),
};

refs.startBtn.addEventListener('click', handleStartBtnClick);
refs.stopBtn.addEventListener('click', handleStopBtnClick);

let timerId;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

function handleStartBtnClick() {
  refs.startBtn.disabled = true;
  refs.stopBtn.disabled = false;
  timerId = setInterval(() => {
    const backgroundColor = getRandomHexColor();
    refs.body.style.backgroundColor = backgroundColor;
  }, 1000);
}

function handleStopBtnClick() {
  clearInterval(timerId);
  refs.startBtn.disabled = false;
  refs.stopBtn.disabled = true;
}
