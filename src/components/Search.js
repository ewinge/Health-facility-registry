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
				<div className="searchinner top">
					<h2>Organization Unit Search</h2>
					<SearchForm />

						<div className="filter">
							<ol>
								<li>Filter by:</li>
								<li><FilterBar /></li>
							</ol>
						</div>
					</div>
					<div className="searchinner bottom">
					<SearchList />
					</div>
				</div>
			</div>
		);
	}
});

module.exports = Search;
