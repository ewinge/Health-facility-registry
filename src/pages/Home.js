import React, { Component, PropTypes } from 'react';
import OUStore from "../stores/OUStore";
import Search from "../components/Search";
import SearchMap from "../components/SearchMap";
import Form from '../components/Form';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editing: OUStore.getEditing(),
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
			        <Search />
			    </div>
			    <div className="page right">
			        {this.state.editing ||this.state.editParent ? <Form edit={this.state.editing} parentId={this.state.editParent} /> : <SearchMap />}
			    </div>
			</div>
		);
	}
}
