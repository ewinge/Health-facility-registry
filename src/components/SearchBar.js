import React from "react";
import { searchOrganisationUnits  } from '../api';

import OUStore from "../stores/OUStore"
import * as SearchActions from "../actions/SearchActions";

var SearchBar = React.createClass({

	getInitialState: function() {
		return {
			value: ''
		};
	},

	handleChange: function(e) {
		this.setState({value: e.target.value});
	},

	handleSubmit: function() {
		searchOrganisationUnits("", this.state.value).then((organisationUnits) => {
			SearchActions.saveResults(organisationUnits);
		});
	},

	render() {
		return (
			<div>
			<form onSubmit={this.handleSubmit}>
				<input
					className="searchBar"
					type="text" placeholder="Find organization unit..."
					value={this.state.value} onChange={this.handleChange}
					size="30"
				/>
			</form>

			</div>
		);

	}
});

module.exports = SearchBar;
