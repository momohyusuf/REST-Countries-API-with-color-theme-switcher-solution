const url = 'https://restcountries.com/v2/all';
const searchField = document.getElementById('search-field');
const countryData = document.querySelector('.country-container');
const modal = document.querySelector('.modal-overlay');
const exitModal = document.getElementById('exit-modal');
const extention = document.querySelector('.show-extention');
const myDropDown = document.getElementById('myDropdown');
const dropBtn = document.getElementById('dropbtn');
const darkMode = document.getElementById('dark-mode');
const lightMode = document.getElementById('light-mode');


fetch(url)
  .then((res) => res.json())
  .then((data) => {
    //  displays countries data
    function displayCountries(fetchCountries) {
      const countryProfiles = fetchCountries
        .map((item) => {
          return `<div class="country-data" data-id=${item.alpha3Code}>
          <img src=${item.flag} alt="country flag" class="country-flag" >
          <div class="country-information">
          <p class="country-name"><b>${item.name}</b></p>
          <p class="country-capital"><b>Capital:</b> ${item.capital} </p>
          <p class="country-population"><b>Population:</b> ${item.population}</p>
          <p class="country-region"><b>Region:</b> ${item.region}</p>
          </div>
         </div>`;
        })
        .join('');
      countryData.innerHTML = countryProfiles;
    }
    displayCountries(data);
    displayModal(data);
    console.log(data);
    // display country modal
    function displayModal(show) {
      const display = document.querySelectorAll('.country-data');
      display.forEach((check) => {
        check.addEventListener('click', (e) => {
          modal.classList.toggle('open-modal');
          let idcheck = e.currentTarget.dataset.id;
          let findCountry = show.find((country) => {
            if (idcheck === country.alpha3Code) {
              extention.innerHTML = `<img src=${country.flag} alt="flags" class="modal-image"/>
          <div class="country-details">
          <div>
          <h1>${country.name}</h1>
        
          <p><b>Native Name:</b> ${country.nativeName}</p>
          <p><b>Population:</b> ${country.population}</p>
          <p><b>Region:</b> ${country.region}</p>
          <p><b>Sub Region:</b> ${country.subregion}</p>
          <p><b>Capital:</b> ${country.capital}</p>
           <p><b>Demonym:</b> ${country.demonym}</p>
           <p><b>Independence:</b> ${country.independent}</p>
          </div>
          <div>
          <p><b>Top Level Domain:</b> ${country.topLevelDomain[0]}</p>
          <p><b>Calling Code:</b> ${country.callingCodes[0]}</p>
          <p><b>Currencies:</b> ${country.currencies[0].name}</p>
          <p><b>Languages:</b> ${country.languages[0].name}</p>
          <p><b>Time Zone:</b> ${country.timezones[0]}</p>
          </div>
          </div>`;
            }
          });
        });
      });
    }
    exitModal.addEventListener('click', () => {
      modal.classList.toggle('open-modal');
    });

    // end of display countries modal

    // search feild function
    searchField.addEventListener('keyup', (e) => {
      const searchString = e.target.value;
      const filteredItems = data.filter((item) => {
        return `${item.name}`.includes(searchString);
      });
      displayCountries(filteredItems);
      displayModal(filteredItems);
    });

    // dynamically create a new filter section directly from the Api if a new region gets added
    const dynamicBtns = data.reduce(
      (values, items) => {
        if (!values.includes(items.region)) {
          values.push(items.region);
        }
        return values;
      },
      ['ALL']
    );

    const btnsValues = dynamicBtns
      .map((btns) => {
        return `<li class="filter-btn" data-region="${btns}">${btns}</li>`;
      })
      .join('');

    myDropDown.innerHTML = btnsValues;
    const filterBtn = document.querySelectorAll('.filter-btn');

    // this function filters country by sub-reagion
    filterBtn.forEach((btnData) => {
      btnData.addEventListener('click', (e) => {
        const btnCheck = e.currentTarget.dataset.region;
        const filterCountry = data.filter((filtering) => {
          if (btnCheck === filtering.region) {
            return filtering;
          }
        });
        if (btnCheck === 'ALL') {
          displayCountries(data);
        } else {
          displayCountries(filterCountry);
          displayModal(filterCountry);
        }
      });
    });
  // filter by region toggler
dropBtn.addEventListener('click', () => {
  myDropDown.classList.toggle('show');
});
    // light mode and dark mode toggle
    darkMode.addEventListener('click', (e) => {
      lightMode.style.display = 'inline-block';
      lightMode.style.color = 'white';
      darkMode.style.display = 'none';
      document.getElementById('navbar').style.backgroundColor =
        'hsl(209, 23%, 22%)';
      document.getElementById('navbar').firstElementChild.style.color = 'white';
      document.body.style.backgroundColor = 'hsl(207, 26%, 17%)';
      document.querySelectorAll('.fa-solid').forEach((item) => {
        item.style.color = 'white';
      });
      document.getElementById('search-field').style.backgroundColor =
        'hsl(209, 23%, 22%)';
      document.getElementById('search-field').style.color = 'white';
      document.getElementById('dropbtn').style.backgroundColor =
        'hsl(209, 23%, 22%)';
      document.getElementById('dropbtn').style.color = 'white';
      document.querySelector('.dropdown-content').style.backgroundColor =
        'hsl(209, 23%, 22%)';
      document.querySelector('.dropdown-content').style.color = 'white';
      document.querySelectorAll('.country-data').forEach((item) => {
        item.style.backgroundColor = 'hsl(209, 23%, 22%)';
      });
      document.querySelectorAll('.country-name').forEach((item) => {
        item.style.color = 'white';
      });
      document.querySelectorAll('.country-capital').forEach((item) => {
        item.style.color = 'white';
      });
      document.querySelectorAll('.country-population').forEach((item) => {
        item.style.color = 'white';
      });
      document.querySelectorAll('.country-region').forEach((item) => {
        item.style.color = 'white';
      });
      document.querySelector('.modal-overlay').style.backgroundColor =
        'hsl(207, 26%, 17%)';
      document.querySelector('.show-extention').classList.toggle('change');

      document.getElementById('exit-modal').style.backgroundColor =
        'hsl(209, 23%, 22%)';
      document.getElementById('exit-modal').style.color = 'white';
    });
    lightMode.addEventListener('click', (e) => {
      lightMode.style.display = 'none';
      darkMode.style.display = 'inline-block';
      document.getElementById('navbar').style.backgroundColor = 'white';
      document.getElementById('navbar').firstElementChild.style.color =
        'hsl(207, 26%, 17%)';
      document.body.style.backgroundColor = 'white';
      document.querySelectorAll('.fa-solid').forEach((item) => {
        item.style.color = 'hsl(207, 26%, 17%)';
      });
      document.getElementById('search-field').style.backgroundColor = 'white';
      document.getElementById('search-field').style.color =
        'hsl(209, 23%, 22%)';
      document.getElementById('dropbtn').style.backgroundColor = 'white';
      document.getElementById('dropbtn').style.color = 'hsl(207, 26%, 17%)';
      document.querySelector('.dropdown-content').style.backgroundColor =
        'white';
      document.querySelector('.dropdown-content').style.color =
        'hsl(209, 23%, 22%)';
      document.querySelectorAll('.country-data').forEach((item) => {
        item.style.backgroundColor = 'white';
      });
      document.querySelectorAll('.country-name').forEach((item) => {
        item.style.color = 'hsl(209, 23%, 22%)';
      });
      document.querySelectorAll('.country-capital').forEach((item) => {
        item.style.color = 'hsl(209, 23%, 22%)';
      });
      document.querySelectorAll('.country-population').forEach((item) => {
        item.style.color = 'hsl(209, 23%, 22%)';
      });
      document.querySelectorAll('.country-region').forEach((item) => {
        item.style.color = 'hsl(209, 23%, 22%)';
      });
      document.querySelector('.modal-overlay').style.backgroundColor = 'white';
      document.querySelector('.show-extention').classList.toggle('change');
      document.getElementById('exit-modal').style.backgroundColor = 'white';
      document.getElementById('exit-modal').style.color = 'hsl(209, 23%, 22%)';
    });
    // end of light mode and dark mode toggle
  })
  .catch((error) => console.error());
