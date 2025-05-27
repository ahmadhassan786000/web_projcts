const input = document.querySelector('input');
const apiKey = `c57ac6689dfaeb5131ca147c73f225c7`;
let form = document.querySelector('form')

form.addEventListener('submit', (e) => {
    e.preventDefault()
    let city = input.value;
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
  .then(response => response.json())      
  .then(data => {
    if(data.cod == 200){
        input.classList.remove('error');
        console.log(data);
        update_weather(data);
    }
    else
        input.classList.add('error')
  })        
  .catch(error => console.error('Error fetching API:', error));
})

function update_weather(data){
    let temperature = document.querySelector('.temperature')
    let name = document.querySelector('.name')  
    let humidity = document.querySelector('.humidity')  
    let wind = document.querySelector('.wind')  
    let img = document.querySelector('.image')  
    temperature.textContent = `${data.main.temp} *C`
    name.textContent = `${data.name}`
    humidity.textContent = `${data.main.humidity}%`
    wind.textContent = `${data.wind.speed}Km/h`
    img.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`
}