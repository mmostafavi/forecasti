import React from "react";

import classes from "./Modal.module.css";

const modal = (props) => {
    let modalClasses = [classes.Modal];
    if (props.show) {
        modalClasses.push(classes.Open)
    } else {
        modalClasses.push(classes.Close)
    }

    return (
        <div className={modalClasses.join(" ")} onClick={props.onModal}>
            <div className={classes.Content}>{props.children}</div>
            <button className={classes.AcceptButton}>OK</button>
        </div>
    )
}

export default modal;