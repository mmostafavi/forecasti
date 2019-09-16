import React, {Component} from 'react';

import classes from "./Result.module.css";
import dataAnalyzer from "../../utils/dataAnalyzer";
import ChartPanel from "../../components/ChartPanel/ChartPanel"
import ForecastTable from "../../components/ForecastTable/ForecastTable"

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
                table_slide: null
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
            haveChartData: null,
            searchTimes: 0,
        };

        this.onArrow = this.onArrow.bind(this);
    }

    static getDerivedStateFromProps(props, state) {
        if (props.searchTimes !== state.searchTimes) {
            return {
                slides: {
                    cloud_data_slide: null,
                    wind_data_slide: null,
                    humidity_data_slide: null,
                    temp_data_slide: null,
                    pressure_data_slide: null,
                    table_slide: null
                },
                haveChartData: false,
                searchTimes: props.searchTimes
            }
        }

        return null;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.haveChartData === false) {
            console.log("reached here");

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
                        pressure_data_slide: 0,
                        table_slide: 0

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


    render() {
        let cityInfo = null;
        let cloudiness_chart = null;
        let temp_chart = null;
        let pressure_chart = null;
        let wind_chart = null;
        let humidity_chart = null;
        let weatherTable = null;
        if (this.state.haveChartData) {
            cityInfo = (
                <>
                    <h2 className={classes.CityName}>{this.props.data.city.name}</h2>
                    <div className={classes.Population}>
                        <div className={classes.PopulationLabel}>
                            Population
                        </div>
                        <div className={classes.PopulationNumber}>
                            {this.props.data.city.population}
                        </div>
                    </div>
                </>
            );

            let slide = this.state.slides.table_slide;
            weatherTable = (
                <ForecastTable
                    weather={this.state.rawData.weatherData.slice(slide * 8, (slide + 1) * 8)}
                    temp={this.state.rawData.tempData.slice(slide * 8, (slide + 1) * 8)}
                    wind={this.state.rawData.windSpeedData.slice(slide * 8, (slide + 1) * 8)}
                    cloudiness={this.state.rawData.cloudData.slice(slide * 8, (slide + 1) * 8)}
                    labels={this.state.chartData.labelDates}
                    tableName={"table_slide"}
                    onArrow={this.onArrow}
                />
            );

            cloudiness_chart = (
                <ChartPanel
                    legend={"Cloudiness(%)"}
                    data={this.state.chartData.cloud_data[this.state.slides.cloud_data_slide]}
                    chartTitle={"Cloudiness"}
                    chartSlideName={"cloud_data_slide"}
                    onArrow={this.onArrow}

                />
            )
            ;

            temp_chart = (
                <ChartPanel
                    legend={"Temperature(C)"}
                    data={this.state.chartData.temp_data[this.state.slides.temp_data_slide]}
                    chartTitle={"Temperature"}
                    chartSlideName={"temp_data_slide"}
                    onArrow={this.onArrow}

                />
            );

            pressure_chart = (
                <ChartPanel
                    legend={"Pressure(hAtm)"}
                    data={this.state.chartData.pressure_data[this.state.slides.pressure_data_slide]}
                    chartTitle={"Pressure"}
                    chartSlideName={"pressure_data_slide"}
                    onArrow={this.onArrow}

                />
            );

            wind_chart = (
                <ChartPanel
                    legend={"Wind(m/s)"}
                    data={this.state.chartData.wind_data[this.state.slides.wind_data_slide]}
                    chartTitle={"Wind"}
                    chartSlideName={"wind_data_slide"}
                    onArrow={this.onArrow}

                />
            );

            humidity_chart = (
                <ChartPanel
                    legend={"Humidity(%)"}
                    data={this.state.chartData.humidity_data[this.state.slides.humidity_data_slide]}
                    chartTitle={"Humidity"}
                    chartSlideName={"humidity_data_slide"}
                    onArrow={this.onArrow}
                />
            );
        }
        return (
            <section className={classes.Result}>
                <div className={classes.TableAndCityContainer}>
                    <div className={classes.CityInfo}>
                        {cityInfo}
                    </div>
                    <hr/>
                    <div className={classes.Table}>
                        {weatherTable}
                    </div>
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

    onArrow(n, chartName) {
        let newValue = this.state.slides[chartName] + n;
        if (newValue < 0) {
            newValue = 4;
        } else if (newValue > 4) {
            newValue = 0;
        }

        this.setState(prevState => {
                return {
                    slides: {
                        ...this.state.slides,
                        [chartName]: newValue
                    }
                }

            }
        );
    }
}

export default Result;