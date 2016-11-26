import React, { Component, PropTypes } from 'react';
import OUStore from "../stores/OUStore";
import Search from "../components/Search";
import SearchMap from "../components/SearchMap";
import Form from '../components/Form';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {editing: OUStore.getEditing()};
        this.update = this.update.bind(this);
    }

    update() {
        this.setState({editing: OUStore.getEditing()});
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
			<div className="home">
				<Search />
				{this.state.editing ? <Form edit={this.state.editing} parentId={this.state.editParent} /> : <SearchMap />}
			</div>
		);
	}
}
