import React from "react";
import Loader from "react-loader-spinner";

import classes from "./Spinner.module.css"

const spinner = () => {
    return (
        <div className={classes.SpinnerContainer}>
            <Loader
                type="Plane"
                color="#ffce12"
                height={100}
                width={100}
                timeout={0}
                visible={true}
            />
        </div>

    )
};

export default spinner;