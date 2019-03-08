window.addEventListener('load',()=> {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let temperatureSection = document.querySelector(".temperature");
    const tempertureSpan = document.querySelector('.temperature span');

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position =>{
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = 'https://cors-anywhere.herokuapp.com/'
            const api = `${proxy}https://api.darksky.net/forecast/15727969c148af49c14a46fcfdbdc5c2/${lat},${long}`;
            
            
            fetch(api).then(response =>{
                return response.json();
            }).then(data => {
                console.log(data);
                const {temperature, summary, icon} = data.currently;

                //Set DOM Elements from the API
                temperatureDegree.textContent = temperature;
                temperatureDescription.textContent = summary;
                locationTimezone.textContent = data.timezone;

                //FORMULA FOR CELSIUS
                let celsius = (temperature - 32) * (5 / 9);

                //Set Icon
                setIcons(icon, document.querySelector('.icon'));

                //Change temperture
                temperatureSection.addEventListener('click', () => {
                    if(tempertureSpan.textContent === "F"){
                        tempertureSpan.textContent = "C";
                        temperatureDegree.textContent = Math.floor(celsius);
                    } else {
                        tempertureSpan.textContent = "F";
                        temperatureDegree.textContent = temperature;
                    }
                })
                
            });
        });
    }


    function setIcons(icon, iconID) {
        var skycons = new Skycons({color: "white"});
        const currentIcon = icon.replace(/-/g,"_").toUpperCase();

        skycons.play();

        return skycons.set(iconID,Skycons[currentIcon]);
    }

})