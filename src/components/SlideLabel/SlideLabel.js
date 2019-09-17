import React from "react";

import classes from "./SlideLabel.module.css";

const slideLabel = (props) => {

    let label = null;
    if (props.label.start.day === props.label.end.day) {
        label = (
            <div className={classes.LabelDate}>
                {props.label.start.month} {props.label.start.day}
            </div>
        );
    } else {
        label = (
            <>
                <div className={classes.LabelDate}>
                    {props.label.start.month} {props.label.start.day}
                </div>
                <div className={classes.Conjunction}>to</div>
                <div className={classes.LabelDate}>
                    {props.label.end.month} {props.label.end.day}
                </div>
            </>
        );
    }
    return (
        <div className={classes.LabelContainer}>
            <button className={classes.Arrow}
                    onClick={() => props.onArrow(-1, props.name)}
            >
                &#10094;
            </button>
            <div className={classes.LabelDateContainer}>
                {label}
            </div>
            <button className={classes.Arrow}
                    onClick={() => props.onArrow(1, props.name)}
            >
                &#10095;
            </button>
        </div>
    )
};

export default slideLabel;