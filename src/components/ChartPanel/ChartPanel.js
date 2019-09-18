import React from "react";

import ChartGenerator from "../ChartGenerator/ChartGenerator";
import SlideLabel from "../SlideLabel/SlideLabel";

import classes from "./ChartPanel.module.css"

const chartPanel = props => {
    return (
        <div className={classes.Chart}>
            <div className={classes.Title}>
                <div className={classes.ChartTitleContainer}>
                    <h2 className={classes.ChartTitle}>{props.chartTitle}</h2>
                </div>
                <div className={classes.IconContainer}>
                    <img src={props.icon} className={classes.Icon}/>
                </div>
            </div>

            <hr/>
            <div className={classes.ChartContainer}>
                <ChartGenerator legend={props.legend} data={props.data}/>
            </div>
            <hr/>
            <SlideLabel
                onArrow={props.onArrow}
                name={props.chartSlideName}
                label={props.label}
            />
        </div>
    )
};

export default chartPanel;