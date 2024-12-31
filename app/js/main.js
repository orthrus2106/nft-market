document.querySelector('.burger').addEventListener('click', function () {
    const nav = document.querySelector('.nav');

    // Переключаем класс 'active' у бургер-меню
    this.classList.toggle('active');

    // Переключаем класс 'open' у меню
    nav.classList.toggle('open');
});

const tabs = document.querySelectorAll('.profile__tabs-item');
const tabsWrapper = document.querySelector('.profile__tabs');

tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => {
    // Убираем активный класс у всех табов
    tabs.forEach((t) => t.classList.remove('profile__tabs-item--active'));

    // Добавляем активный класс текущему табу
    tab.classList.add('profile__tabs-item--active');

    // Передвигаем бордер к активному табу
    tabsWrapper.style.setProperty('--active-tab-index', index);
  });
});

window.addEventListener('resize', toggleFormModifier);
window.addEventListener('load', toggleFormModifier);