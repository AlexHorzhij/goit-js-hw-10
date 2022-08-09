import { Notify } from 'notiflix/build/notiflix-notify-aio';

export function fetchCountries(name) {
    return fetch(`https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`)
    .then(response =>{
        if (response.ok){ return response.json()}
        Notify.failure('Oops, there is no country with that name')
    })
    .then(data => {
        return data
    })
}
    

// export function fetchCountries(name) {
// return fetch(`https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`)
//     .then(response => response.json())
//      .then(data => {
//         return data
//     }).catch(error => console.log(error))
//     } 
   