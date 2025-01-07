document.querySelector('.burger').addEventListener('click', function () {
  const nav = document.querySelector('.nav');
  const body = document.body;

  this.classList.toggle('active');
  nav.classList.toggle('open');

  if (nav.classList.contains('open')) {
      body.classList.add('no-scroll');
  } else {
      body.classList.remove('no-scroll');
  }
});

const tabs = document.querySelectorAll('.tabs-item');
const tabsWrapper = document.querySelector('.tabs');

tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => {
    tabs.forEach((t) => t.classList.remove('tabs-item--active'));
    tab.classList.add('tabs-item--active');
    tabsWrapper.style.setProperty('--active-tab-index', index);
  });
});



// Main page Timer
const hoursElement = document.querySelector('.highlighted__auction-hours');
const minutesElement = document.querySelector('.highlighted__auction-minutes');
const secondsElement = document.querySelector('.highlighted__auction-seconds');

let hours = 11;
let minutes = 32;
let seconds = 7;

function updateTimer() {
    seconds--;

    if (seconds < 0) {
        seconds = 59;
        minutes--;
    }

    if (minutes < 0) {
        minutes = 59;
        hours--;
    }

    if (hours < 0) {
        clearInterval(timer); 
        return;
    }

    hoursElement.textContent = String(hours).padStart(2, '0');
    minutesElement.textContent = String(minutes).padStart(2, '0');
    secondsElement.textContent = String(seconds).padStart(2, '0');
}
const timer = setInterval(updateTimer, 1000);


window.addEventListener('resize', toggleFormModifier);
window.addEventListener('load', toggleFormModifier);