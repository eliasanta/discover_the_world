const countriesList= document.getElementById('countries')
let countries;//conterrà fetched data


fetch('https://restcountries.com/v3.1/all')
.then(res=> res.json())//estraggo il json body
.then((data)=> initialize(data))//con i dati trasformati in json uso la funzione per inserirli in countries
.catch((err)=>{console.log('we have a problem',err)})

//event listener for countries list
countriesList.addEventListener('change',event => displayCountryInfo(event.target.value));//quando cambio la selezione avvio la funzione

function initialize(countriesData){//questa funzione viener richiamata dal fetch
    countries=countriesData;//metto i dati su una variabile
    function SortArray(x, y){//riordino l'oggetto con la funzione
        return x.name.common.localeCompare(y.name.common);
    }
    var orderCountry = countries.sort(SortArray);
    let options="";
     /*metodo alternativo for(elem of orderCountry){
   options +=`<option value="${elem.cca2}">${elem.name.common} ${elem.callingcode[0]}</option>`
    }  */
    orderCountry.forEach(elem => {
      options +=`<option value="${elem.cca2}">${elem.name.common}</option>`
    });
    countriesList.innerHTML=options;
    
    countriesList.selectedIndex = Math.floor(Math.random()*countriesList.length);//scelgo come display di partenza un paese random
    displayCountryInfo(countriesList[countriesList.selectedIndex].value);
}

function displayCountryInfo(countryByCca2){
    const countryData=countries.find(country=>country.cca2 == countryByCca2);
    
    document.querySelector('#flag-container img').src=countryData.flags.png;
    document.querySelector('#flag-container img').alt=`${countryData.flags.png}`
    document.getElementById('capital').innerHTML=countryData.capital;
    document.getElementById('calling-code').innerHTML=countryData.idd.root+countryData.idd.suffixes;
    document.getElementById('population').innerHTML=`${countryData.population} people`;
    document.getElementById('region').innerHTML=countryData.region;
    document.getElementById('sub-region').innerHTML=countryData.subregion;    
    document.getElementById('gmap_canvas').src=`https://maps.google.com/maps?q=${countryData.capital}&t=&z=13&ie=UTF8&iwloc=&output=embed`
    
  }
