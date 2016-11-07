import React, { Component } from 'react';
import { saveOrganisationUnit, loadOrganisationUnits, deleteOrganisationUnit } from '../api';
import List from './List';
import Form from './Form';
import OUList from './OUList';

/**
 * ES2015 class component
 * https://facebook.github.io/react/docs/reusable-components.html#es6-classes-and-react.createclass
 */
export default class App extends Component {
    constructor(props, context) {
        super(props, context);

        // Set some initial state variables that are used within the component
        this.state = {
            isSaving: false,
        };

        // Bind the functions that are passed around to the component
        this.onItemClick = this.onItemClick.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onItemClick(item) {
        // Remove the item from the local list.
        // This will make it seem like it was deleted while we wait for the actual delete to complete.
        this.setState({
            items: this.state.items
                .filter(organisationUnit => item.id !== organisationUnit.id)
        });

        // Delete the organisationUnit from the server. If it fails show a message to the user.
        deleteOrganisationUnit(item)
            .catch(() => alert(`Could not delete organisation unit ${item.displayName}`))
            // In all cases (either success or failure) after deleting reload the list.
            .then(() => this.loadOrganisationUnits());
    }

    onSubmit(formData) {
        // Set the component state to saving
        this.setState({ isSaving: true });

        // Save the organisation unit to the api
        saveOrganisationUnit(formData)
            .then(() => this.loadOrganisationUnits())
            .catch(() => alert(`Could save organisation unit ${item.displayName}`))
            .then(() => this.setState({ isSaving: false })); // After either success or failure set the isSaving state to false
    }

    render() {
        // We hide the form component when we are in the saving state.
        return (
            <div className="app">
            <OUList parent="" />
            {this.state.isSaving ? <div>Saving organisation unit</div> : <Form onSubmit={this.onSubmit} />}
            </div>
        );
    }
}