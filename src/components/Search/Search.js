import React from "react";

import classes from "./Search.module.css";

const search = (props) => {
    return (
        <section id="search" className={classes.Search}>
            <form onSubmit={props.onSearch} className={classes.SearchForm}>
                <div className={classes.CityInput}>
                    <input
                        className={classes.City}
                        {...props.searchForm.city.elementConfig}
                        value={props.searchForm.city.value}
                        onChange={props.onCityNameChange}
                        name="city"
                    />
                    <button className={classes.SearchButton}>search</button>
                </div>

                <div className={classes.CountryInput}>
                    <label htmlFor='selectCountry' className={classes.CountryLabel}>Country</label>
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
                </div>


            </form>

        </section>
    )
};

export default search;