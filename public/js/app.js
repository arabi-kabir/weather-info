
console.log('client side js file is loaded');

const weatherForm = document.querySelector('form')
const messageOne = document.querySelector('#msg_1')
const messageTwo = document.querySelector('#msg_2')
const messageThree = document.querySelector('#msg_3')

messageOne.textContent = ''
messageTwo.textContent = ''
messageThree.textContent = ''

searchWeather = (place) => {
    fetch('http://localhost:3000/weather?address=' + place).then((response) => {
        response.json().then((data) => {
            if(data.error) {
                messageOne.textContent = ''
                messageTwo.textContent = data.error
                messageThree.textContent = ''
            } else {
                messageOne.textContent = "Search : " + data.address; 
                messageTwo.textContent = "Forecast : " + data.forecast;
                messageThree.textContent ="Location : " + data.location;
            }

            console.log(data);
        })
    })
    .catch((error) => {
        console.error('Error:', error);
      });
}

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const search = document.querySelector('input').value
    searchWeather(search)
})