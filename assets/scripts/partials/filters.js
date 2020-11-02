import {Datepicker} from 'vanillajs-datepicker'
import {DateRangePicker} from 'vanillajs-datepicker'
import ru from 'vanillajs-datepicker/js/i18n/locales/ru'

Object.assign(Datepicker.locales, ru)


/**
 * Открытие/закрытие area custom select
 * @type {NodeListOf<Element>}
 */

const areaSelects = document.querySelectorAll('.js-area-select')

const toggleAreaSelect = (evt) => {
  evt.currentTarget.classList.toggle('is-open')
}

areaSelects.forEach((select) => {
  select.addEventListener('click', toggleAreaSelect)
})

/**
 * Progress Range slider
 * http://ionden.com/a/plugins/ion.rangeSlider/demo_advanced.html
 */

const $progressStart = $('.ready-progress__start')

$('.js-ready-progress-slider').ionRangeSlider({
  skin: 'round',
  type: 'double',
  min: 0,
  max: 100,
  from: 50,
  postfix: '%',
  onChange: function (data) {
    data.from < 21 ? $progressStart.fadeOut() : $progressStart.fadeIn();
  }
})

/**
 * Datepicker
 *
 * https://mymth.github.io/vanillajs-datepicker/
 */

const dateInterval = document.querySelector('.js-date-interval')

const dateIntervalSales = new DateRangePicker(dateInterval, {
  buttonClass: 'button',
  format: 'dd.mm.yyyy',
  language: 'ru',
})

console.log(dateIntervalSales)
