import React, { Component, PropTypes } from 'react';
import OUStore from "../stores/OUStore";
import { cancelEdit, handleUpdate, handleNewUnit } from "../actions/Actions";
import { loadUnit } from '../api';
import FormMap from "../components/FormMap";

/**
 * Generic form for editing Organisation units
 * Can be used empty for new unit, or with the edit property
 * to edit an existing unit
 * @Prop parentId id of the parent to be used
 * @Prop edit id of the node to be edited
 */
export default class Form extends Component {
    constructor(...args) {
        super(...args);

        //For clearing the form
        this.emptyState = {
            id: "",
            name: '',
            shortName: '',
            openingDate: '',
            level: '',
            coordinates: "",
            featureType: "NONE",
        };

        this.state = Object.assign({}, this.emptyState);

        this.onSubmitClick = this.onSubmitClick.bind(this);
        this.handleMapClick = this.handleMapClick.bind(this);
        this.setName = this.setName.bind(this);
        this.setShortName = this.setShortName.bind(this);
        this.setOpeningDate = this.setOpeningDate.bind(this);
        this.setCoordinates = this.setCoordinates.bind(this);
        this.reset = this.reset.bind(this);
    }

    componentDidMount() {
        this.componentWillReceiveProps(this.props);
    }

    //Listen to list changes in OUStore
    componentWillMount() {
        OUStore.on("cancelEdit", this.reset);
    }

    //Unlisten upon dismounting
    componentWillUnmount() {
        OUStore.removeListener("cancelEdit", this.reset);
    }

    //clear previous state
    reset() {
//        this.replaceState(Object.assign({}, this.emptyState));
//        this.setState({all:undefined,old:undefined,keys:undefined});
        this.state = Object.assign({}, this.emptyState);
        this.forceUpdate();
    }

    componentWillReceiveProps(nextProps) {
        this.reset();

        if (nextProps.parentId) {
            //when editing a new child
            this.setState({parent: {id: nextProps.parentId} });
        } else if (nextProps.edit && nextProps.edit != "") {
            //When editing  an existing unit, load data
            loadUnit(nextProps.edit)
                .then(unit => this.setState(unit));
        }
    }

    onSubmitClick(event) {
        event.preventDefault();
        //update or new unit?
        if (this.state.id && this.state.id != "") {
            handleUpdate(this.state)
        } else {
            handleNewUnit(this.state);
        }
    }

    handleMapClick(e) {
        console.log("Clicked location:", e.latLng.lat(), e.latLng.lng());
        this.setState({
            coordinates: `[${e.latLng.lng()},${e.latLng.lat()}]`,
            featureType: "POINT"
        });
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

    setFeatureType(event) {
        this.setState({ featureType: event.target.value });
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
                            <span>Level</span>
                            <input disabled={true} type="number" value={this.state.level} />
                        </label>
                    </div>
                    <div>
                        <label>
                            <span>Feature type</span>
                            <select value={this.state.featureType} onChange={this.setFeatureType}>
                                <option value="NONE">none</option>
                                <option value="MULTI_POLYGON">multi-polygon</option>
                                <option value="POLYGON">polygon</option>
                                <option value="POINT">point</option>
                                <option value="SYMBOL">symbol</option>
                            </select>
                        </label>
                    </div>
                    <div>
                    <label>
                        <span>Coordinates (click map)</span>
                        <input type="text" value={this.state.coordinates} onChange={this.setCoordinates} />
                    </label>
                    </div>
                    <div>
                        <button disabled={this.isFormValid()} id="submit" onClick={this.onSubmitClick}>Submit</button>
                        <button id="cancel" onClick={cancelEdit}>Cancel</button>
                    </div>
                </form>
                <FormMap onClick={this.handleMapClick} orgUnits={[this.state]} />
            </div>
        );
    }
}

Form.propTypes = {
    edit: PropTypes.string,
    parentId: PropTypes.string,
};
