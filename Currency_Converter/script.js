const selectElements = document.querySelectorAll('select');
let select_from, select_to;
let fromValue,toValue;

selectElements.forEach(element => {
  if (element.name === 'from') {
    select_from = element;
  } else if (element.name === 'to') {
    select_to = element;
  }
});


Object.values(countryList).forEach(countryCode => {
  const optionFrom = document.createElement('option');
  optionFrom.textContent = countryCode;
  optionFrom.value = countryCode;
  select_from.appendChild(optionFrom);
  if(countryCode === 'US'){
    optionFrom.selected = true
    fromValue = countryCode;
  }

  const optionTo = document.createElement('option');
  optionTo.textContent = countryCode;
  optionTo.value = countryCode;
  select_to.appendChild(optionTo);
  if(countryCode === 'PK'){
    optionTo.selected = true
    toValue = countryCode;
  }
});

let container = document.querySelector('.container')
let imgFrom = document.querySelector('.imgFrom');
let imgTo = document.querySelector('.imgTo');

container.addEventListener('click' , (e) =>{
  if(e.target.name === 'from'){
    imgFrom.src = `https://flagsapi.com/${e.target.value}/flat/64.png`
    fromValue = e.target.value;
  }
  if(e.target.name === 'to'){
    imgTo.src = `https://flagsapi.com/${e.target.value}/flat/64.png`
    toValue = e.target.value;
  }
  e.preventDefault();
})

let button = document.querySelector('button');
let input = document.querySelector('input');
let numberOnly = /^\d+$/;
let msg = document.querySelector('.msg')


button.addEventListener('click', (e) => {
  if (numberOnly.test(input.value)) {
    input.classList.remove('wrongData')

    let value1 = Object.keys(countryList).find(key => countryList[key] === fromValue);
    let value2 = Object.keys(countryList).find(key => countryList[key] === toValue);

    currency_converter(value1, value2).then(result => {
      msg.textContent = `${input.value} ${value1} = ${result} ${value2}`
    })
  } else {
    input.classList.add('wrongData')
  }
});

async function currency_converter(value1, value2) {
  try {
    const response = await fetch(`https://v6.exchangerate-api.com/v6/4ce867855a7099c860bdd952/latest/${value1}`)
    const data = await response.json()

    if (data.result === 'success') {
      const rates = data.conversion_rates;
      return (input.value * rates[value2]);
    } else {
      console.log('error converting API JSON data');
    }
  } catch (err) {
    console.log('Error fetching the API', err);
  }
}

