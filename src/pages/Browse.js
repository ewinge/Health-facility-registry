import React, { Component } from 'react';
import { saveOrganisationUnit, loadOrganisationUnits, deleteOrganisationUnit } from '../api';
import Form from '../components/Form';
import OUList from '../components/OUList';

export default class Browse extends Component {
    constructor(props, context) {
        super(props, context);

        // Set some initial state variables that are used within the component
        this.state = {
            editing: false,
            onSubmit: false,
            root: "",
            editParent: false,
        };

        // Bind the functions that are passed around to the component
        this.editUnit = this.editUnit.bind(this);
    }
    
    /**
     * Activate the form to edit a unit
     * 
     * @param id of the unit to edit, "" if new unit
     * @Param onSubmit callback for saving data
     * @param parent of new unit
     */
    editUnit(id, onSubmit, parent) {
        console.log("edit:", id, onSubmit, parent);
        this.setState({
            editing: id,
            onSubmit: onSubmit,
            editParent: parent,
        });
    }

    render() {
        return (
            <div className="app">
            <OUList parent={this.state.root} edit={this.editUnit} />
            {this.state.editing || this.state.editParent ? <Form edit={this.state.editing} onSubmit={this.state.onSubmit} parent={this.state.editParent} /> : ""}
            </div>
        );
    }
}