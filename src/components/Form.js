import React, { Component, PropTypes } from 'react';

export default class Form extends Component {
    constructor(...args) {
        super(...args);

        this.state = {
            name: '',
            shortName: '',
            openingDate: '',
        };

        this.onSubmitClick = this.onSubmitClick.bind(this);
        this.setName = this.setName.bind(this);
        this.setShortName = this.setShortName.bind(this);
        this.setOpeningDate = this.setOpeningDate.bind(this);
    }

    onSubmitClick(event) {
        event.preventDefault();

        this.props.onSubmit(this.state);
    }

    setName(event) {
        this.setState({ name: event.target.value });
    }

    setShortName(event) {
        this.setState({ shortName: event.target.value });
    }

    setOpeningDate(event) {
        this.setState({ openingDate: event.target.value });
    }

    isFormValid() {
        return !(this.state.name && this.state.shortName && this.state.openingDate);
    }

    render() {
        return (
            <div className="form">
                <form>
                    <div>
                        <label>
                            <span>Name</span>
                            <input type="text" value={this.state.name} onChange={this.setName} />
                        </label>
                    </div>
                    <div>
                        <label>
                            <span>Short name</span>
                            <input type="text" value={this.state.shortName} onChange={this.setShortName} />
                        </label>
                    </div>
                    <div>
                        <label>
                            <span>Opening date</span>
                            <input type="date" value={this.state.openingDate} onChange={this.setOpeningDate} />
                        </label>
                    </div>
                    <div>
                        <button disabled={this.isFormValid()} id="submit" onClick={this.onSubmitClick}>Submit</button>
                    </div>
                </form>
            </div>
        );
    }
}

Form.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};