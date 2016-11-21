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
        };

        // Bind the functions that are passed around to the component
        this.editUnit = this.editUnit.bind(this);
    }
    
    editUnit(id,onSubmit) {
        this.setState({
            editing: id,
            onSubmit: onSubmit,
        });
    }

    render() {
        return (
            <div className="app">
            <OUList parent={this.state.root} edit={this.editUnit} />
            {this.state.editing ? <Form edit={this.state.editing} onSubmit={this.state.onSubmit} /> : ""}
            </div>
        );
    }
}