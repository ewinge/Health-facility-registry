import React from "react";
import SearchForm from "./SearchForm";
import SearchList from "./SearchList";
import FilterBar from "./FilterBar";

var Search = React.createClass({
	getInitialState: function() {
		return ({
			advancedSearch: true
		})
	},

	render: function () {
		return (
			<div className="search">
				<div className="searchinner">
					<h1>Organization Units</h1>
					<SearchForm />

						<div className="filter">
							<ol>
								<li>Filter by:</li>
								<li><FilterBar /></li>
							</ol>
						</div>

					<SearchList />
				</div>
			</div>
		);
	}
});

module.exports = Search;
