import React from "react";

import * as SearchActions from "../actions/SearchActions";

var FilterBar = React.createClass({

	getInitialState: function() {
		return {
			options: ['none', 'facility', 'district', 'province', 'country']
		};
	},

	handleChange: function(e) {
		SearchActions.handleFilter(e.target.value);
	},

	render() {
		return (
			<select className="input" onChange={this.handleChange}>
				{this.state.options.map(function(option){
					 return <option key={option} value={option}>{option}</option>;
				 })}
			</select>
		);
	}
});


module.exports = FilterBar;
