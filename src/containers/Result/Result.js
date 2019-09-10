import React, {Component} from 'react';
import {ResponsiveLine} from "@nivo/line";

import classes from "./Result.module.css";
import dataAnalyzer from "../../utils/dataAnalyzer";

class Result extends Component {


    constructor(props) {
        super(props);
        this.state = {
            updateChart: false,
            chartData: null,
            slide: 0,
            updateTimes: 0,
            cloud_humid_data: null,
            wind_pressure_temp_data: null,
            windSpeedData: null,
            pressureData: null,
            cloudData: null,
            humidityData: null,
            tempData: null,
            weatherData: null

        };
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

        if (this.props.searchTimes !== prevProps.searchTimes
        ) {
            let {
                cloud_humid_data,
                wind_pressure_temp_data,
                windSpeedData,
                pressureData,
                cloudData,
                humidityData,
                tempData,
                weatherData
            } = dataAnalyzer(this.props.data.list, this.props.gmtOffset);
            this.setState(prevState => {
                return {
                    cloud_humid_data,
                    wind_pressure_temp_data,
                    windSpeedData,
                    pressureData,
                    cloudData,
                    humidityData,
                    tempData,
                    weatherData
                }
            })
        }


    }

    shouldComponentUpdate(nextProps, nextState) {
        return (nextProps.data !== this.props.data);
    }

    render() {
        let chart = null;
        if (this.state.chartData) {
            console.log("reached here");
            chart = (
                <ResponsiveLine
                    data={this.state.chartData}
                    margin={{top: 50, right: 110, bottom: 50, left: 60}}
                    xScale={{type: 'point'}}
                    yScale={{type: 'linear', stacked: true, min: 'auto', max: 'auto'}}
                    curve="natural"
                    axisTop={null}
                    axisRight={null}
                    axisBottom={{
                        orient: 'bottom',
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: 'transportation',
                        legendOffset: 36,
                        legendPosition: 'middle'
                    }}
                    axisLeft={{
                        orient: 'left',
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: 'count',
                        legendOffset: -40,
                        legendPosition: 'middle'
                    }}
                    colors={{scheme: 'category10'}}
                    pointSize={9}
                    pointColor={{theme: 'labels.text.fill'}}
                    pointBorderWidth={2}
                    pointBorderColor={{from: 'serieColor'}}
                    pointLabel="y"
                    pointLabelYOffset={-12}
                    enableArea={true}
                    useMesh={true}
                    legends={[
                        {
                            anchor: 'bottom-right',
                            direction: 'column',
                            justify: false,
                            translateX: 100,
                            translateY: -148,
                            itemsSpacing: 0,
                            itemDirection: 'left-to-right',
                            itemWidth: 79,
                            itemHeight: 20,
                            itemOpacity: 0.75,
                            symbolSize: 12,
                            symbolShape: 'circle',
                            symbolBorderColor: 'rgba(0, 0, 0, .5)',
                            effects: [
                                {
                                    on: 'hover',
                                    style: {
                                        itemBackground: 'rgba(0, 0, 0, .03)',
                                        itemOpacity: 1
                                    }
                                }
                            ]
                        }
                    ]}
                />
            )
        }
        return (
            <section className={classes.Result}>
                <div className={classes.Charts}>
                    {chart}
                </div>
            </section>
        )
    }
}

export default Result;