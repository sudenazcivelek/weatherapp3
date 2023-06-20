using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace weatherapp.Controllers
{
    public class WeatherController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
        [HttpGet]
        public async Task<IActionResult> Get(string city)
        {
            // OpenWeatherMap API Key
            string apiKey = "02de4a4634708326d3cc7ba1ab5763f0";
            // OpenWeatherMap API'ye gönderilecek olan şehir adını içeren URL'yi oluşturuyoruz
            string url = $"http://api.openweathermap.org/data/2.5/weather?q={city}&appid={apiKey}&units=metric&lang=tr";

            // HttpClient nesnesi oluşturarak istek gönderiyoruz
            using (var client = new HttpClient())
            {
                // API'ye GET isteği gönderiyoruz
                var response = await client.GetAsync(url);

                // API yanıtının başarılı olup olmadığını kontrol ediyoruz
                if (response.IsSuccessStatusCode)
                {
                    // Başarılı olan API yanıtını return ediyoruz
                    return Ok(await response.Content.ReadAsStringAsync());
                }
                else
                {
                    // API isteği başarısız oldu
                    return BadRequest("Weather not found");
                }
            }
        }
    }
}
