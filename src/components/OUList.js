import React, { Component } from 'react';
import { saveOrganisationUnit, loadOrganisationUnits, deleteOrganisationUnit } from '../api';
import List from './List';

/**
 * ES2015 class component
 * https://facebook.github.io/react/docs/reusable-components.html#es6-classes-and-react.createclass
 */
export default class OUList extends Component {
    constructor(props, context) {
        super(props, context);

        // Set some initial state variables that are used within the component
        this.state = {
            isSaving: false,
            isLoading: true,
            items: [],
        };
    }

    componentDidMount() {
        this.loadOrgUnits();
    }

    loadOrgUnits() {
        // Loads the organisation units from the api and sets the loading state to false and puts the items onto the component state.
        loadOrganisationUnits(this.props.parent)
            .then((organisationUnits) => {
                this.setState({
                    isLoading: false,
                    items: organisationUnits,
                });
            });
    }

    render() {
        // Render the app which includes the list component and the form component
        // We hide the form component when we are in the saving state.
        return (
            <div className="OUlist">
                <List
                    items={this.state.items}
                />
            </div>
        );
    }
}
