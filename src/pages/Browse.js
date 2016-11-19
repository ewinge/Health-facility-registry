import React, { Component } from 'react';
import { saveOrganisationUnit, loadOrganisationUnits, deleteOrganisationUnit } from '../api';
import Form from '../components/Form';
import OUList from '../components/OUList';

export default class Browse extends Component {
    constructor(props, context) {
        super(props, context);

        // Set some initial state variables that are used within the component
        this.state = {
            isSaving: false,
        };

        // Bind the functions that are passed around to the component
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(formData) {
        // Set the component state to saving
        this.setState({ isSaving: true });

        // Save the organisation unit to the api
        saveOrganisationUnit(formData)
            .then(() => this.setState({ isSaving: false })); // After either success or failure set the isSaving state to false
        
        this.setState({editing: false});
    }
    
    editUnit(id) {
        this.setState({editing: id});
    }

    render() {
        // We hide the form component when we are in the saving state.
        return (
            <div className="app">
            <OUList parent="" edit={this.editUnit}/>
            {this.state.editing ? <Form edit={editing} onSubmit={this.onSubmit} /> : ""}
            </div>
        );
    }
}