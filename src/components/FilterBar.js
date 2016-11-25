import React from "react";
import OUStore from "../stores/OUStore";
import { handleFilter } from "../actions/Actions";

var FilterBar = React.createClass({

	getInitialState: function() {
		return {
			options: OUStore.getLevels(),
			selected: OUStore.getFilter()
		};
	},

	handleChange: function(e) {
		handleFilter(e.target.value);

		this.setState({
			selected: e.target.value
		})
	},

	render() {
		return (
			<select value={this.state.selected} className="input" onChange={this.handleChange}>
				{this.state.options.map(function(option){
						return <option key={option} value={option}>{option}</option>;
				 })}
			</select>
		);
	}
});

module.exports = FilterBar;
