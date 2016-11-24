import React from "react";
import OUStore from "../stores/OUStore"
import { handleQuery } from "../actions/Actions";

var SearchBar = React.createClass({

	getInitialState: function() {
		return {
			value: OUStore.getQuery()
		};
	},

	handleChange: function(e) {
		this.setState({value: e.target.value});

		if (e.target.value.length > 1) {
				handleQuery(e.target.value);
		}
	},

	handleSubmit: function() {
		handleQuery(this.state.value);
	},

	render() {
		return (
			<form onSubmit={this.handleSubmit}>
				<input
					className="input"
					type="search" placeholder="Search by name"
					value={this.state.value} onChange={this.handleChange}
					size="30"
				/>
			</form>
		);

	}
});

module.exports = SearchBar;
