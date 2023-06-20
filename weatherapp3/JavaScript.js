// weather nesnesi oluşturuluyor
let weather = {
    // API'den hava durumu bilgisini almak için kullanılacak fonksiyon
    fetchWeather: function (city) {
        // Weather controllerında bulunan get metoduna istek gönderiyoruz.
        fetch(
            "/weather/get?city=" +
            city
        )
            .then((response) => {
                // Yanıt başarısızsa hata veriliyor
                if (!response.ok) {
                    alert("Hava durumu bulanamadı.");
                    throw new Error("Hava durumu bulanamadı.");
                }
                // Yanıt JSON formatına dönüştürülüyor
                return response.json();
            })
            // Dönüştürülen JSON verisi displayWeather fonksiyonuna gönderiliyor
            .then((data) => this.displayWeather(data));
    },
    // Alınan hava durumu bilgisinin ekrana gösterilmesi için kullanılacak fonksiyon
    displayWeather: function (data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        // Veriler HTML elemanlarına yazdırılıyor
        document.querySelector(".city").innerText = name + " Hava Durumu";
        document.querySelector(".icon").src =
            "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp + "°C";
        document.querySelector(".humidity").innerText =
            "Nem: " + humidity + "%";
        document.querySelector(".wind").innerText =
            "Rüzgar Hızı: " + speed + " km/h";
        document.querySelector(".weather").classList.remove("loading");
        //Arkaplan fotoğrafı için API ye textboxa girilen şehir adına göre istek atılıyor.
        document.body.style.backgroundImage =
            "url('https://source.unsplash.com/1600x900/?" + name + "')";
    },
    //Search fonksiyonu arayüzdeki textboxa girilne şehri parametre olarak fetchWeather a gönderiyor.
    search: function () {
        this.fetchWeather(document.querySelector(".search-bar").value);
    },
};
//Butona tıklandığında search fonksiyonu çağırılıyor.
document.querySelector(".search button").addEventListener("click", function () {
    weather.search();
});
//Klavyeden entera basıldığında search fonksiyonunu çağırıyor.
document
    .querySelector(".search-bar")
    .addEventListener("keyup", function (event) {
        if (event.key == "Enter") {
            weather.search();
        }
    });
//Sayfa açıldığında defualt olarak ısparta ilini gösteriyor.
weather.fetchWeather("Isparta");