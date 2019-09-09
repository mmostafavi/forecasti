import React, {Component} from 'react';
import axios from "axios";

import Search from "../../components/Search/Search";
import Result from "../Result/Result";
import validator from "../../utils/validator";
import isoCountryCodes from "../../utils/isoCountryCodes";


class Layout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchForm: {
                country: {
                    value: 'IR'
                },
                city: {
                    value: '',
                    valid: false,
                    elementConfig: {
                        placeHolder: "Type your city",
                        type: "text"
                    },
                    validation: {
                        isCity: true
                    }
                }
            },
            search: false,
            serachTimes: 0,
            data: null,
            appId: "4f2101004b0e81d7c5383284591e0746",
            gmtOffset: null,
            population: null
        };

        this.searchHandler = this.searchHandler.bind(this);
        this.cityNameChangeHandler = this.cityNameChangeHandler.bind(this);
        this.countryChangeHandler = this.countryChangeHandler.bind(this)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.search) {
            axios.get(`http://api.openweathermap.org/data/2.5/forecast?q=${this.state.searchForm.city.value},${this.state.searchForm.country.value}&appid=${this.state.appId}`)
                .then(({data}) => {
                        console.log(data);
                        axios.get(`http://api.timezonedb.com/v2.1/get-time-zone?key=B4YBKMH2YEV0&format=json&by=position&lat=${data.city.coord.lat}&lng=${data.city.coord.lon}`)
                            .then((res) => {
                                    this.setState(prevState => {
                                        return {
                                            gmtOffset: res.data.gmtOffset * 1000,
                                            data: data,
                                            population: data.city.population,
                                            searchTimes: prevState.searchTimes + 1
                                        }
                                    })
                                }
                            ).catch(err => console.log(err));

                    }
                ).catch(error => console.log(error));

            // for blocking repetitive requests
            this.setState({search: false})
        }
    }

    render() {
        return (
            <>
                <Search
                    onSearch={this.searchHandler}
                    onCityNameChange={this.cityNameChangeHandler}
                    onCountryChange={this.countryChangeHandler}
                    searchForm={this.state.searchForm}
                    options={isoCountryCodes}
                />
                <Result data={this.state.data} gmtOffset={this.state.gmtOffset} searchTimes={this.state.searchTimes}/>
            </>
        );
    }


    searchHandler(e) {
        e.preventDefault();
        this.setState({search: true})
    }

    cityNameChangeHandler(e) {
        const value = e.target.value.trim();
        const valid = validator(value, this.state.searchForm.city.validation);

        this.setState({
            searchForm: {
                ...this.state.searchForm,
                city: {
                    ...this.state.searchForm.city,
                    valid: valid,
                    value: value
                }
            }
        })
    }

    countryChangeHandler(e) {
        const value = e.target.value;
        this.setState({
            searchForm: {
                ...this.state.searchForm,
                country: {
                    ...this.state.searchForm.country,
                    value: value
                }
            }
        })
    }
}

export default Layout;
