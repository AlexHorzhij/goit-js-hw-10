import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';
import { fetchCountries } from './js/fetchCountries';

const DEBOUNCE_DELAY = 300;

const refs = {
    input: document.querySelector('#search-box'),
    countryList: document.querySelector('.country-list'),
    countryInfo: document.querySelector('.country-info'),
}

refs.input.addEventListener('input', debounce(searchCountry, DEBOUNCE_DELAY))

function searchCountry() {
    const countryForSearch = refs.input.value.trim()
    if (countryForSearch === '') {
        refs.countryList.innerHTML = ""
    } else {
        const selectCountry = fetchCountries(countryForSearch)
        promisHendler(selectCountry)
    }
}
 
function createMarkup(countries) {
    return countries.reduce((acc, item) => {return acc + `<li class="country__item"><img src="${item.flags.svg}" class="country__flag"><span class="country__name">${item.name.common}</span></li>` }, "")
}

function createOneCountryMarkup(countries) {
    return countries.map(item => {
        return `<div class="country-wrapper">
        <img src="${item.flags.svg}" class="one-country__flag">
        <span class="one-country__name">${item.name.common}</span></div>
        <p class="one-country__items">Capital: <span class="one-country__items-value">${item.capital}</span></p>
        <p class="one-country__items">Population: <span class="one-country__items-value">${item.population}</span></p>
        <p class="one-country__items">Languages: <span class="one-country__items-value">${Object.values(item.languages).join(", ")}</span></p>`
    })
}

function insertMarkup(countryMarkup) {
    refs.countryList.innerHTML = ""
    refs.countryList.insertAdjacentHTML("beforeend", countryMarkup)
}
 

function promisHendler(promis) {
    promis.then(data => {
    if (data.length > 10) {
        Notify.info('Too many matches found. Please enter a more specific name.')
    } else if (data.length >= 2) {
        promis.then(createMarkup).then(insertMarkup)
    } else {
        promis.then(createOneCountryMarkup).then(insertMarkup)
    }
    }).catch(error => console.log(error))
}

Notify.init({
    width: '700px',
    fontSize: '30px',
    borderRadius: '10px',
    position: 'center-top',
    fontAwesomeIconSize: '64px',
});


// function promisHendler(promis) {
//     promis.then(data => {
//     if (data.status === 404) {
//         Notify.failure('Oops, there is no country with that name')
//     } else {return data}})
//     .then(data => {
//     if (data.length > 10) {
//     Notify.info('Too many matches found. Please enter a more specific name.')
//     } else if (data.length >= 2) {
//         promis.then(createMarkup).then(insertMarkup)
//     } else {
//         promis.then(createOneCountryMarkup).then(insertMarkup)
//     }
//     }).catch(error => console.log(error))
// }
