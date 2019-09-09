import React, {Component} from 'react';
import {ResponsiveLine} from "@nivo/line";

import classes from "./Result.module.css";
import dataAnalyzer from "../../utils/dataAnalyzer";

class Result extends Component {
    constructor(props) {
        super(props);
        this.state = {
            charts: null,
            slide: 0
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

        if (this.props.searchTimes !== prevProps.searchTimes) {
            dataAnalyzer(this.props.data.list, this.props.gmtOffset)
        }


    }

    shouldComponentUpdate(nextProps) {
        return nextProps.data !== this.props.data
    }

    render() {
        const MyResponsiveLine = (data) => (
            <ResponsiveLine
                data={data}
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
                pointSize={10}
                pointColor={{theme: 'labels.text.fill'}}
                pointBorderWidth={2}
                pointBorderColor={{from: 'serieColor'}}
                pointLabel="y"
                pointLabelYOffset={-12}
                enableArea={true}
                areaOpacity={0.3}
                enableCrosshair={false}
                useMesh={true}
                legends={[
                    {
                        anchor: 'bottom-right',
                        direction: 'column',
                        justify: false,
                        translateX: 100,
                        translateY: 0,
                        itemsSpacing: 0,
                        itemDirection: 'left-to-right',
                        itemWidth: 80,
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
        );
        const chart = MyResponsiveLine([
            {
                "id": "us",
                "color": "hsl(218, 70%, 50%)",
                "data": [
                    {
                        "x": "plane",
                        "y": 194
                    },
                    {
                        "x": "helicopter",
                        "y": 65
                    },
                    {
                        "x": "boat",
                        "y": 244
                    },
                    {
                        "x": "train",
                        "y": 157
                    },
                    {
                        "x": "subway",
                        "y": 166
                    },
                    {
                        "x": "bus",
                        "y": 49
                    },
                    {
                        "x": "car",
                        "y": 155
                    },
                    {
                        "x": "moto",
                        "y": 135
                    },
                    {
                        "x": "bicycle",
                        "y": 300
                    },
                    {
                        "x": "horse",
                        "y": 23
                    },
                    {
                        "x": "skateboard",
                        "y": 275
                    },
                    {
                        "x": "others",
                        "y": 290
                    }
                ]
            }
        ]);
        let charts = "null";
        return (
            <section className={classes.Result}>
                <div className={classes.Charts}>
                    {charts}
                </div>
            </section>
        )
    }
}

export default Result;