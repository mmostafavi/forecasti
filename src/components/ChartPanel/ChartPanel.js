import React from "react"

import ChartGenerator from "../ChartGenerator/ChartGenerator"

import classes from "./ChartPanel.module.css";

const chartPanel = props => {
    return (
        <div className={classes.Chart}>
            <h2 className={classes.ChartTitle}>{props.chartTitle}</h2>
            <hr/>
            <div className={classes.ChartContainer}>
                <ChartGenerator legend={props.legend} data={props.data}/>
            </div>
        </div>
    )
};

export default chartPanel;