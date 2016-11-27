import React, { Component } from 'react';
import OUStore from "../stores/OUStore";
import Form from '../components/Form';
import OUList from '../components/OUList';

export default class Browse extends Component {
    constructor(props, context) {
        super(props, context);

        // Set some initial state variables that are used within the component
        this.state = {
            editing: OUStore.getEditing(),
            root: "",
            editParent: OUStore.getEditParent(),
        };
        this.update = this.update.bind(this);
    }

    update() {
        this.setState({
            editing: OUStore.getEditing(),
            editParent: OUStore.getEditParent(),
        });
    }

    //Listen to list changes in OUStore
    componentWillMount() {
        OUStore.on("editing", this.update);
    }

    //Unlisten upon dismounting
    componentWillUnmount() {
        OUStore.removeListener("editing", this.update);
    }

    render() {
        return (
            <div className="page">
              <div className="page left">
                <OUList parent={this.state.root} />
              </div>
              <div className="page right">
                {this.state.editing || this.state.editParent ? <Form edit={this.state.editing} parentId={this.state.editParent} /> : ""}
              </div>
            </div>
        );
    }
}
