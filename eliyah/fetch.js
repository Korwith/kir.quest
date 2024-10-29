let getip = document.querySelector('.ipbutton');

function alertIP() {
    fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
            alert('Your IP Address: ' + data.ip);
        })
        .catch(error => {
            console.error('Error fetching the IP address: ', error);
        });
}

getip.addEventListener('mouseup', alertIP);