import React from "react";
import SearchBar from "./SearchBar";
import SearchList from "./SearchList";
import FilterBar from "./FilterBar";

var Search = React.createClass({
	render: function () {
		return (
			<div className="search">
				<div className="searchinner">
					<h1>Organization Units</h1>
    			<SearchBar />

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
