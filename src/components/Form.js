import React, { Component, PropTypes } from 'react';
import { loadUnit } from '../api';

export default class Form extends Component {
    constructor(...args) {
        super(...args);

        //For clearing the form
        this.emptyState = {
            id: "",
            name: '',
            shortName: '',
            openingDate: '',
            parent: '',
            coordinates: "[0.0,0.0]",
        };
        
        this.state = Object.assign({}, this.emptyState);
        
        this.onSubmitClick = this.onSubmitClick.bind(this);
        this.setName = this.setName.bind(this);
        this.setShortName = this.setShortName.bind(this);
        this.setOpeningDate = this.setOpeningDate.bind(this);
        this.setCoordinates = this.setCoordinates.bind(this);
    }
    
    componentDidMount() {
        this.componentWillReceiveProps(this.props);
    }
    
    componentWillReceiveProps(nextProps) {
        //clear previous state
//        this.replaceState(Object.assign({}, this.emptyState));
//        this.setState({all:undefined,old:undefined,keys:undefined});
        this.state = Object.assign({}, this.emptyState);
        this.forceUpdate();
        
        //when editing a new child
        if (nextProps.parent) {
            this.setState({parent: nextProps.parent});
        }
        
        //When editing  an existing unit, load data
        if (nextProps.edit && nextProps.edit != "") {
            loadUnit(nextProps.edit)
                .then(unit => this.setState(unit));
        }
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
    
    setCoordinates(event) {
        this.setState({ coordinates: event.target.value });
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
                    <label>
                        <span>Parent</span>
                        <input disabled={true} type="number" value={this.state.parent} />
                    </label>
                    </div>
                    <div>
                    <label>
                        <span>Coordinates</span>
                        <input type="text" value={this.state.coordinates} onChange={this.setCoordinates} />
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