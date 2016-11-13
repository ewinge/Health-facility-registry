import React from "react";

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

		if (e.target.value.length > 1) {
				SearchActions.handleQuery(e.target.value);
		}
	},

	handleSubmit: function() {
		SearchActions.handleQuery(this.state.value);
	},

	render() {
		return (
			<form onSubmit={this.handleSubmit}>
				<input
					className="input"
					type="search" placeholder="Find organization unit..."
					value={this.state.value} onChange={this.handleChange}
					size="30"
				/>
			</form>
		);

	}
});

module.exports = SearchBar;
