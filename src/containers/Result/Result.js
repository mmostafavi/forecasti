import React, {Component} from 'react';
import {ResponsiveLine} from "@nivo/line";

import classes from "./Result.module.css";
import dataAnalyzer from "../../utils/dataAnalyzer";
import ChartPanel from "../../components/ChartPanel/ChartPanel"
import ChartGenerator from "../../components/ChartGenerator/ChartGenerator"

class Result extends Component {


    constructor(props) {
        super(props);
        this.state = {
            slides: {
                cloud_data_slide: null,
                wind_data_slide: null,
                humidity_data_slide: null,
                temp_data_slide: null,
                pressure_data_slide: null,
            },
            rawData: {
                windSpeedData: null,
                pressureData: null,
                cloudData: null,
                humidityData: null,
                tempData: null,
                weatherData: null
            },
            chartData: {
                labelDates: null,
                cloud_data: null,
                wind_data: null,
                humidity_data: null,
                temp_data: null,
                pressure_data: null,
            },
            haveChartData: false,
        };
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log(this.props.searchTimes !== prevProps.searchTimes)
        if (this.props.searchTimes !== prevProps.searchTimes
        ) {

            this.setState(prevState => {
                return {
                    slides: {
                        cloud_data_slide: null,
                        wind_data_slide: null,
                        humidity_data_slide: null,
                        temp_data_slide: null,
                        pressure_data_slide: null,
                    },
                    haveChartData: false
                }
            });
            let {
                cloud_data,
                wind_data,
                humidity_data,
                temp_data,
                pressure_data,
                windSpeedData,
                pressureData,
                cloudData,
                humidityData,
                tempData,
                weatherData,
                labelDates
            } = dataAnalyzer(this.props.data.list, this.props.gmtOffset);
            this.setState(prevState => {
                return {
                    slides: {
                        cloud_data_slide: 0,
                        wind_data_slide: 0,
                        humidity_data_slide: 0,
                        temp_data_slide: 0,
                        pressure_data_slide: 0
                    },
                    rawData: {
                        windSpeedData,
                        pressureData,
                        cloudData,
                        humidityData,
                        tempData,
                        weatherData,
                    },
                    chartData: {
                        cloud_data,
                        wind_data,
                        humidity_data,
                        temp_data,
                        pressure_data,
                        labelDates
                    },
                    haveChartData: true
                }
            })
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return (
            nextProps.data !== this.props.data
            || nextState.slides.cloud_humid_slide !== this.state.slides.cloud_humid_slide
            || nextState.slides.wind_pressure_temp_slide !== this.state.slides.wind_pressure_temp_slide
        );
    }

    render() {
        let cityInfo = null;
        let cloudiness_chart = null;
        let temp_chart = null;
        let pressure_chart = null;
        let wind_chart = null;
        let humidity_chart = null;
        if (this.state.haveChartData) {
            cityInfo = (
                <>
                    <h2 className={classes.CityName}>{this.props.data.city.name}</h2>
                    <h4 className={classes.Population}>{this.props.data.city.population}</h4>
                </>
            );

            cloudiness_chart = (
                <ChartPanel
                    legend={"Cloudiness(%)"}
                    data={this.state.chartData.cloud_data[this.state.slides.cloud_data_slide]}
                    chartTitle={"Cloudiness"}
                />
            )
            ;

            temp_chart = (
                <ChartPanel
                    legend={"Temperature(C)"}
                    data={this.state.chartData.temp_data[this.state.slides.temp_data_slide]}
                    chartTitle={"Temperature"}
                />
            );

            pressure_chart = (
                <ChartPanel
                    legend={"Pressure(hAtm)"}
                    data={this.state.chartData.pressure_data[this.state.slides.pressure_data_slide]}
                    chartTitle={"Pressure"}
                />
            );

            wind_chart = (
                <ChartPanel
                    legend={"Wind(m/s)"}
                    data={this.state.chartData.wind_data[this.state.slides.wind_data_slide]}
                    chartTitle={"Wind"}
                />
            );

            humidity_chart = (
                <ChartPanel
                    legend={"Humidity(%)"}
                    data={this.state.chartData.humidity_data[this.state.slides.humidity_data_slide]}
                    chartTitle={"Humidity"}
                />
            );
        }
        return (
            <section className={classes.Result}>
                <div className={classes.CityInfo}>
                    {cityInfo}
                </div>
                <div className={classes.Charts}>
                    {temp_chart}

                    {wind_chart}

                    {pressure_chart}

                    {cloudiness_chart}

                    {humidity_chart}
                </div>
            </section>
        )
    }
}

export default Result;