import React from "react";
import {ResponsiveLine} from "@nivo/line";

const dataAnalyzer = (data, gmtOffset) => {
    const tempData = [], humidityData = [], pressureData = [], windSpeedData = [], cloudData = [], weatherData = [];
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const labelDates = [];
    for (let i = 0; i <= 32; i = i + 8) {
        let startUtcDate = new Date(data[i].dt * 1000);
        let startYear = startUtcDate.getFullYear();
        let startMonth = startUtcDate.getMonth();
        let startDay = startUtcDate.getDate();
        let endUtcDate = new Date(data[i + 7].dt * 1000);
        let endYear = endUtcDate.getFullYear();
        let endMonth = endUtcDate.getMonth();
        let endDay = endUtcDate.getDate();
        labelDates.push({
            start: {
                year: startYear,
                month: months[startMonth],
                day: startDay
            },
            end: {
                year: endYear,
                month: months[endMonth],
                day: endDay
            }
        });

        for (let j = i; j < i + 8; j++) {
            let utcDate = new Date(data[j].dt * 1000);

            let hour = utcDate.getHours();
            let minute = utcDate.getMinutes();


            tempData[j] = {
                x: `${hour}:${minute}`,
                y: (data[j].main.temp - 273.15).toFixed(1)
            };
            humidityData[j] = {
                x: `${hour}:${minute}`,
                y: data[j].main.humidity
            };
            pressureData[j] = {
                x: `${hour}:${minute}`,
                y: (data[j].main.pressure / 10.1325).toFixed(1)
            };
            windSpeedData[j] = {
                x: `${hour}:${minute}`,
                y: data[j].wind.speed
            };
            cloudData[j] = {
                x: `${hour}:${minute}`,
                y: data[j].clouds.all
            };
            weatherData[j] = {
                description: data[j].weather[0].description,
                main: data[j].weather[0].main,
                icon: data[j].weather[0].icon
            };

        }
    }

    let cloud_data = [];
    let humidity_data = [];
    let temp_data = [];
    let pressure_data = [];
    let wind_data = [];

    for (let i = 0; i <= 32; i = i + 8) {

        let rawTempData = tempData.slice(i, i + 8);
        let tempChartData = {
            id: "Temperature(C)",
            color: "hsl(268, 70%, 50%)",
            data: rawTempData
        };

        let rawHumidityData = humidityData.slice(i, i + 8);
        let humidityChartData = {
            id: "Humidity(%)",
            color: "hsl(212, 70%, 50%)",
            data: rawHumidityData
        };

        let rawCloudData = cloudData.slice(i, i + 8);
        let cloudChartData = {
            id: "Cloudiness(C)",
            color: "hsl(329, 70%, 50%)",
            data: rawCloudData
        };

        let rawPressureData = pressureData.slice(i, i + 8);
        let pressureChartData = {
            id: "Pressure(hAtm)",
            color: "hsl(101, 70%, 50%)",
            data: rawPressureData
        };

        let rawWindSpeedData = windSpeedData.slice(i, i + 8);
        let windSpeedChartData = {
            id: "Wind(m/s)",
            color: "hsl(318, 70%, 50%)",
            data: rawWindSpeedData
        };

        cloud_data.push([cloudChartData]);
        humidity_data.push([humidityChartData]);
        temp_data.push([tempChartData]);
        pressure_data.push([pressureChartData]);
        wind_data.push([windSpeedChartData]);
    }

    // console.log(windSpeedData); //0-5
    // console.log(pressureData);//hAtmosphere-->*100
    // console.log(humidityData); //%
    // console.log(tempData); //c


    return {
        cloud_data: cloud_data,
        wind_data: wind_data,
        humidity_data: humidity_data,
        temp_data: temp_data,
        pressure_data: pressure_data,
        windSpeedData: windSpeedData,
        pressureData: pressureData,
        cloudData: cloudData,
        humidityData: humidityData,
        tempData: tempData,
        weatherData: weatherData,
        labelDates: labelDates,
    }
};

export default dataAnalyzer;