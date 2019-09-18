import React from "react";

import classes from "./BackDrop.module.css";

const backDrop = (props) => {
    const backDropClasses = [classes.BackDrop];
    if (props.show) {
        backDropClasses.push(classes.Open)
    } else {
        backDropClasses.push(classes.Close)
    }

    return (
        <div className={backDropClasses.join(' ')} onClick={props.onModal}/>
    )
}

export default backDrop;