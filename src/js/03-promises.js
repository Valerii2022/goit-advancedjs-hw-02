import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const refs = { form: document.querySelector('.form') };

refs.form.addEventListener('submit', handleFormSubmit);

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

  createPromise(1, delay).then(onSuccess).catch(onError);

  for (let i = 2; i <= amount; i += 1) {
    delay += step;
    createPromise(i, delay).then(onSuccess).catch(onError);
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.5;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
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
