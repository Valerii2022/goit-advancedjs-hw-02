const refs = {
  startBtn: document.querySelector('[data-start]'),
  stopbtn: document.querySelector('[data-stop]'),
  body: document.querySelector('body'),
};

refs.startBtn.addEventListener('click', handleStartBtnClick);
refs.stopbtn.addEventListener('click', handleStopBtnClick);

let id;
refs.stopbtn.disabled = true;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

function handleStartBtnClick() {
  refs.startBtn.disabled = true;
  refs.stopbtn.disabled = false;
  id = setInterval(() => {
    const backgroundColor = getRandomHexColor();
    refs.body.style.backgroundColor = backgroundColor;
  }, 1000);
}

function handleStopBtnClick() {
  clearInterval(id);
  refs.startBtn.disabled = false;
  refs.stopbtn.disabled = true;
}
