import React from "react";
import OUStore from "../stores/OUStore"
import { handleQuery } from "../actions/Actions";

var SearchBar = React.createClass({

	getInitialState: function() {
		return {
			value: OUStore.getQuery(),
			disabled: OUStore.isLoading()
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

	doneLoading: function() {
		this.setState({
			disabled: false
		})
	},

	//Listen to list changes in OUStore
	componentWillMount: function() {
		OUStore.on("listReceived", this.doneLoading);
	},

	//Unlisten upon dismounting
	componentWillUnmount: function() {
		OUStore.removeListener("listReceived", this.doneLoading);
	},

	render() {
		return (
			<form onSubmit={this.handleSubmit}>
				<input
					className="input"
					type="search" placeholder={this.state.disabled ? "Loading..." : "Search by name" }
					value={this.state.value} onChange={this.handleChange}
					size="30"
					disabled={this.state.disabled ? "disabled" : ""}
				/>
			</form>
		);

	}
});

module.exports = SearchBar;
