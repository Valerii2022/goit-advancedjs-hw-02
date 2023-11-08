import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const refs = { form: document.querySelector('.form') };

refs.form.addEventListener('submit', handleFormSubmit);

let timerId = null;
let position = 0;

function handleFormSubmit(e) {
  e.preventDefault();
  const formData = new FormData(e.currentTarget);
  const data = {};
  formData.forEach((value, key) => {
    data[key] = value;
  });
  let delay = Number(data.delay);
  const amount = Number(data.amount);
  const step = Number(data.step);

  setTimeout(() => {
    position += 1;
    createPromise(position, delay).then(onSuccess).catch(onError);

    timerId = setInterval(() => {
      position += 1;
      delay += step;
      createPromise(position, delay).then(onSuccess).catch(onError);

      if (position === amount) {
        clearInterval(timerId);
        position = 0;
      }
    }, step);
  }, delay);
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    if (shouldResolve) {
      resolve({ position, delay });
    } else {
      reject({ position, delay });
    }
  });
}

function onSuccess({ position, delay }) {
  iziToast.success({
    title: 'OK',
    message: `Fulfilled promise ${position} in ${delay}ms`,
    layout: 2,
    position: 'topRight',
    transitionIn: 'fadeInLeft',
    transitionOut: 'fadeOutRight',
  });
}

function onError({ position, delay }) {
  iziToast.error({
    title: 'Error',
    message: `Rejected promise ${position} in ${delay}ms`,
    layout: 2,
    position: 'topRight',
    transitionIn: 'fadeInLeft',
    transitionOut: 'fadeOutRight',
  });
}
