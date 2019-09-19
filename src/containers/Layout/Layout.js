import React, {Component} from 'react';
import axios from "axios";

import classes from "./Layout.module.css"
import Search from "../../components/Search/Search";
import Result from "../Result/Result";
import Footer from "../../components/Footer/Footer";
import validator from "../../utils/validator";
import isoCountryCodes from "../../utils/isoCountryCodes";
import BackDrop from "../../components/UI/BackDrop/BackDrop";
import Modal from "../../components/UI/Modal/Modal";

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
                        placeholder: "Type your city",
                        type: "text"
                    },
                    validation: {
                        isCity: true
                    }
                }
            },
            search: false,
            searchTimes: 0,
            data: null,
            appId: "4f2101004b0e81d7c5383284591e0746",
            population: null,
            searchError: false,
            fetchingData: false
        };

        this.searchHandler = this.searchHandler.bind(this);
        this.cityNameChangeHandler = this.cityNameChangeHandler.bind(this);
        this.countryChangeHandler = this.countryChangeHandler.bind(this);
        this.onModal = this.onModal.bind(this);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.search && !this.state.fetchingData) {
            this.setState({
                fetchingData: true
            });
            axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${this.state.searchForm.city.value},${this.state.searchForm.country.value}&appid=${this.state.appId}`)
                .then(({data}) => {
                        this.setState(prevState => {
                            return {
                                data: data,
                                population: data.city.population,
                                search: false,
                                searchTimes: prevState.searchTimes + 1,
                                fetchingData: false
                            }
                        })
                    }
                )
                .catch(error => {
                    this.setState({
                        search: false,
                        searchError: true,
                        fetchingData: false
                    })
                });

        }
    }

    render() {
        let error = null;
        if (this.state.searchError) {
            error = (
                <>
                    <BackDrop show={this.state.searchError} onModal={this.onModal}/>
                    <Modal show={this.state.searchError} onModal={this.onModal}>
                        oops! something went Wrong!
                        check these things:
                        <ul>
                            <li>
                                Country
                            </li>
                            <li>
                                City name dictation (you can also type it in your language)
                            </li>
                            <li>
                                Your Internet Connection
                            </li>
                        </ul>

                        otherwise there is a problem with our service
                        try it a few minutes later
                    </Modal>
                </>
            )
        }

        return (
            <div className={classes.Layout}>
                {error}
                <Search
                    onSearch={this.searchHandler}
                    onCityNameChange={this.cityNameChangeHandler}
                    onCountryChange={this.countryChangeHandler}
                    searchForm={this.state.searchForm}
                    options={isoCountryCodes}
                />
                <Result
                    data={this.state.data}
                    searchTimes={this.state.searchTimes}
                    fetching={this.state.fetchingData}
                />
                <Footer/>
            </div>
        );
    }


    searchHandler(e) {
        e.preventDefault();
        this.setState(prevState => {
                return {
                    search: true
                }
            }
        )
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

    onModal() {
        this.setState(prevState => {
            return {
                searchError: !prevState.searchError
            }
        })
    }
}

export default Layout;
