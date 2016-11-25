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
     * @param parentId of new unit
     */
    editUnit(id, parentId) {
        console.log("edit:", id, parentId);
        this.setState({
            editing: id,
            editParent: parentId,
        });
    }

    render() {
        return (
            <div className="app">
            <OUList parent={this.state.root} edit={this.editUnit} />
            {this.state.editing || this.state.editParent ? <Form edit={this.state.editing} parentId={this.state.editParent} /> : ""}
            </div>
        );
    }
}