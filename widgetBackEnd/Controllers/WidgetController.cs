using System;
using System.Globalization;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using NewsAPI;
using NewsAPI.Constants;
using NewsAPI.Models;
using Newtonsoft.Json.Linq;
using OpenMeteo;
using widgetBackEnd.Models;

namespace widgetBackEnd.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class WidgetController : ControllerBase
    {
        private readonly IConfiguration _config;

        private static Random random = new Random();

        public WidgetController(IConfiguration config)
        {
            _config = config;
        }
        [HttpGet("weather")]
        public async Task<IActionResult> GetWeather([FromQuery]string latitude, [FromQuery]string longitude)
        {
            OpenMeteo.OpenMeteoClient client = new OpenMeteo.OpenMeteoClient();
            WeatherForecastOptions options = new WeatherForecastOptions();
            options.Temperature_Unit = TemperatureUnitType.fahrenheit;
            options.Latitude = float.Parse(latitude, CultureInfo.InvariantCulture.NumberFormat); 
            options.Longitude = float.Parse(longitude, CultureInfo.InvariantCulture.NumberFormat);
            
            WeatherForecast weatherData = await client.QueryAsync(options);
            return Ok(weatherData);
        }

        [HttpGet("news")]
        public async Task<IActionResult> GetNews()
        {
            var headLineNews = new NewsApiClient(_config["Keys:News_Client_API_Key"]);

            var results = await headLineNews.GetTopHeadlinesAsync(new TopHeadlinesRequest
            {
                Country = Countries.US
            });

            if(results.Status == Statuses.Ok)
            {
                return Ok(results.Articles);
            }

            return BadRequest();
        }

        // Possibly have this implemented in the frontend
        [HttpGet("local-files")]
        public async Task<ActionResult<IList<LocalFileModel>>> GetLocalFiles()
        {
            List<LocalFileModel> localFiles = new List<LocalFileModel>();

            string[] extensions = {".pdf", ".txt", ".docx", ".pptx", ".xlsx"};
            for(var count = 0; count < 40; count++)
            {
                var fileSize = random.Next(10, 150);
                var fileExtension = random.Next(0, extensions.Length - 1);
                var extention = extensions[fileExtension];

                var randomString = GetRandomString();

                var newFile = new LocalFileModel
                {
                    FileName = $"{randomString} {count}{extention}",
                    FileSize = $"{fileSize}mb",
                };
                localFiles.Add(newFile);
            }

            return Ok(localFiles);
        }
        
        private string GetRandomString()
        {
            string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            var stringChars = new char[8];
            for (int i = 0; i < stringChars.Length; i++)
            {
                stringChars[i] = chars[random.Next(chars.Length)];
            }

            var finalString = new String(stringChars);
            return finalString;
        }
    }
}