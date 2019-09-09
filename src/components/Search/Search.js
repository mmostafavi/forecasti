import React from "react";

import classes from "./Search.module.css";

const search = (props) => {
    return (
        <section id="search" className={classes.Search}>
            <form onSubmit={props.onSearch} className={classes.SearchForm}>
                <label htmlFor='selectCountry'>Country</label>
                <select
                    className={classes.SelectCountry}
                    value={props.searchForm.country.value}
                    onChange={props.onCountryChange}
                    name='selectCountry'
                >
                    {props.options.map(option => {
                        return (
                            <option key={option["alpha-2"]} value={option["alpha-2"]}>{option.name}</option>
                        )
                    })}
                </select>
                <label htmlFor="city">City</label>
                <input
                    className={classes.City}
                    {...props.searchForm.elementConfig}
                    value={props.searchForm.value}
                    onChange={props.onCityNameChange}
                    name="city"
                />
                <button className={classes.SearchButton}>search</button>
            </form>

        </section>
    )
};

export default search;