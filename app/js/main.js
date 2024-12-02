document.querySelector('.burger').addEventListener('click', function () {
    const nav = document.querySelector('.nav');

    // Переключаем класс 'active' у бургер-меню
    this.classList.toggle('active');

    // Переключаем класс 'open' у меню
    nav.classList.toggle('open');
});
