import React, {Component} from "react";

import BackDrop from "../components/UI/BackDrop/BackDrop"
import Modal from "../components/UI/Modal/Modal"

const errorHandler = (component) => (
    class extends Component {

        constructor(props) {
            super(props);
            this.state = {
                error: null,
                errorInfo: null,
                showModal: false
            };

            this.onModal = this.onModal.bind(this)
        }


        componentDidCatch(error, errorInfo) {
            console.log(error, errorInfo);
            this.setState({
                error: error,
                errorInfo: errorInfo,
                showModal: true
            })
        }


        render() {
            let C = component;
            return this.state.error ? (
                <>
                    <BackDrop
                        onModal={this.onModal}
                        show={this.state.showModal}
                    />
                    <Modal
                        onModal={this.onModal}
                        show={this.state.showModal}
                    >
                        {this.state.errorInfo}
                    </Modal>
                    <C {...this.props}/>
                </>
            ) : (
                <C {...this.props}/>
            )
        }

        onModal() {
            this.setState(prevState => {
                return {
                    showModal: !prevState.showModal
                }
            })
        }
    }
);

export default errorHandler;
