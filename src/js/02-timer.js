import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const refs = {
  startBtn: document.querySelector('[data-start]'),
  input: document.querySelector('#datetime-picker'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

refs.startBtn.addEventListener('click', handleStartBtnClick);

let timer;
const currentDate = new Date().getTime();

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    handleSelectedDate(selectedDates[0].getTime());
  },
};

flatpickr(refs.input, options);
refs.startBtn.disabled = true;

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);

  const hours = Math.floor((ms % day) / hour);

  const minutes = Math.floor(((ms % day) % hour) / minute);

  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
}

function handleSelectedDate(selected) {
  if (currentDate >= selected) {
    iziToast.error({
      title: 'Error',
      message: 'Please choose a date in the future',
      layout: 2,
      position: 'topRight',
      transitionIn: 'fadeInLeft',
      transitionOut: 'fadeOutRight',
    });
    return;
  }
  refs.startBtn.disabled = false;
  timer = selected - currentDate;
  setCurrentTimer(timer);
}

function handleStartBtnClick() {
  const id = setInterval(() => {
    refs.startBtn.disabled = true;
    timer -= 1000;
    if (timer <= 1000) {
      clearInterval(id);
      iziToast.success({
        title: 'OK',
        message: 'The timer has successfully finished!',
        layout: 2,
        position: 'topRight',
        transitionIn: 'fadeInLeft',
        transitionOut: 'fadeOutRight',
      });
    }
    setCurrentTimer(timer);
  }, 1000);
}

function setCurrentTimer(timer) {
  const currentTimer = convertMs(timer);
  refs.days.textContent = currentTimer.days.toString().padStart(2, '0');
  refs.hours.textContent = currentTimer.hours.toString().padStart(2, '0');
  refs.minutes.textContent = currentTimer.minutes.toString().padStart(2, '0');
  refs.seconds.textContent = currentTimer.seconds.toString().padStart(2, '0');
}
