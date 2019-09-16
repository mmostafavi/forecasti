import React from "react";

import classes from "./ForecastTable.module.css";
import icon01d from "../../assets/icon/weather/png/01d.png"
import icon01n from "../../assets/icon/weather/png/01n.png"
import icon02d from "../../assets/icon/weather/png/02d.png"
import icon02n from "../../assets/icon/weather/png/02n.png"
import icon03d from "../../assets/icon/weather/png/03d.png"
import icon03n from "../../assets/icon/weather/png/03n.png"
import icon04d from "../../assets/icon/weather/png/04d.png"
import icon04n from "../../assets/icon/weather/png/04n.png"
import icon09d from "../../assets/icon/weather/png/09d.png"
import icon09n from "../../assets/icon/weather/png/09n.png"
import icon10d from "../../assets/icon/weather/png/10d.png"
import icon10n from "../../assets/icon/weather/png/10n.png"
import icon11d from "../../assets/icon/weather/png/11d.png"
import icon11n from "../../assets/icon/weather/png/11n.png"
import icon13d from "../../assets/icon/weather/png/13d.png"
import icon13n from "../../assets/icon/weather/png/13n.png"
import icon50d from "../../assets/icon/weather/png/50d.png"
import icon50n from "../../assets/icon/weather/png/50n.png"
import SlideLabel from "../SlideLabel/SlideLabel";


const forecastTable = props => {
    const icons = {
        "01d": icon01d,
        "01n": icon01n,
        "02d": icon02d,
        "02n": icon02n,
        "03d": icon03d,
        "03n": icon03n,
        "04d": icon04d,
        "04n": icon04n,
        "09d": icon09d,
        "09n": icon09n,
        "10d": icon10d,
        "10n": icon10n,
        "11d": icon11d,
        "11n": icon11n,
        "13d": icon13d,
        "13n": icon13n,
        "50d": icon50d,
        "50n": icon50n

    };

    const weatherIcons = [];
    for (let i = 0; i < 8; i++) {
        weatherIcons[i] = icons[props.weather[i].icon]
    }
    let tableData = null;
    if (props.labels) {
        tableData = props.temp.map((temp, index) => {
            return (
                <tr className={classes.Row} key={temp.x}>
                    <td className={classes.Cell}>{temp.x}</td>
                    <td className={classes.Weather}>
                        <img src={weatherIcons[index]} className={classes.Icon}/>
                    </td>
                    <td className={classes.Cell}>{temp.y}</td>
                    <td className={classes.Cell}>{props.wind[index].y}</td>
                    {/*<td className={classes.Cell}>{props.cloudiness[index].y}</td>*/}
                </tr>
            )
        })
    }
    return (
        <div className={classes.TableContainer}>
            <table className={classes.Table}>
                <thead>
                <tr className={classes.FirstRow}>
                    <th className={classes.Header}>Hour</th>
                    <th className={classes.Header}>Weather</th>
                    <th className={classes.Header}>Temperature(C)</th>
                    <th className={classes.Header}>Wind(m/s)</th>
                    {/*<th className={classes.Header}>cloudiness(%)</th>*/}
                </tr>
                </thead>
                <tbody>
                {tableData}
                </tbody>

            </table>

            <SlideLabel
                onArrow={props.onArrow}
                name={props.tableName}
                label={props.label}
            />
        </div>

    )
};

export default forecastTable;