import React from "react";
import {ResponsiveLine} from "@nivo/line";

import classes from "./ChartGenerator.module.css";

const chartGenerator = props => {
    return (
        <ResponsiveLine
            data={props.data}
            margin={{top: 30, right: 20, bottom: 50, left: 60}}
            xScale={{type: 'point'}}
            yScale={{type: 'linear', stacked: true, min: 'auto', max: 'auto'}}
            axisTop={null}
            axisRight={null}
            axisBottom={{
                orient: 'bottom',
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'Hour',
                legendOffset: 36,
                legendPosition: 'middle'
            }}
            axisLeft={{
                orient: 'left',
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: props.legend,
                legendOffset: -50,
                legendPosition: 'middle'
            }}
            colors={{scheme: 'category10'}}
            pointSize={8}
            pointColor={{theme: 'labels.text.fill'}}
            pointBorderWidth={2}
            pointBorderColor={{from: 'serieColor'}}
            pointLabel="y"
            pointLabelYOffset={-12}
            areaOpacity={0.7}
            useMesh={true}
            legends={[]}
        />
    )
}

export default chartGenerator;