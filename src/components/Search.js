import React from "react";
import SearchBar from "./SearchBar";
import SearchList from "./SearchList";
import FilterBar from "./FilterBar";

var Search = React.createClass({
	render: function () {
		return (
			<div className="search">
        <ol>
					<li><h1>Organization Units</h1></li>
          <li><SearchBar /></li>
				  <li>
						<div className="filter">
							<ol>
								<li>Filter by:</li>
								<li><FilterBar /></li>
							</ol>
						</div>
					</li>
					<li><SearchList /></li>
        </ol>
			</div>
		);
	}
});

module.exports = Search;
