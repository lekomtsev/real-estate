/**
 * Открыть/Закрыть карту
 */

const toggleMap = () => {
  mapControl.classList.toggle('is-active');
  mapWrapper.classList.toggle('is-hidden');

  mapControl.classList.contains('is-active')
    ? mapControl.textContent = 'Открыть карту'
    : mapControl.textContent = 'Скрыть карту'
}

const mapWrapper = document.querySelector('.map-wrapper')
const mapControl = document.querySelector('.js-map-control')
mapControl.addEventListener('click', toggleMap)

/**
 * Yandex Map
 * @type {*|jQuery.fn.init|jQuery|HTMLElement}
 */

const ymapsInit = () => {

  const address = [
    {'coord': [56.858612, 53.196812], 'name': 'ЖК Победы'},
    {'coord': [56.860059, 53.200719], 'name': 'ЖК Кирова'},
    {'coord': [56.868654, 53.180669], 'name': 'ЖК Горького'},
  ]

  const mapCity = new ymaps.Map('map', {
    center: [56.868654, 53.180669],
    zoom: 14,
    controls: ['trafficControl'],
  })

  address.forEach((element) => {
    const yaPlacemark = new ymaps.Placemark(element.coord, {
        iconContent: `<div class='map-hint'>
                      <div class='map-hint__round'></div>
                      <div class='map-hint__title'>${element.name}</div>
                    <div>`
      },
      {
        iconLayout: 'default#imageWithContent',
        iconImageHref: '',
      }
    )

    mapCity.geoObjects.add(yaPlacemark)
  })
}

ymaps.ready(ymapsInit)
