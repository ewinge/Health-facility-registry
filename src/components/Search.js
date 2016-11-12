import React from "react";
import SearchBar from "./SearchBar";
import SearchList from './SearchList';

var Search = React.createClass({
	render: function () {
		return (
			<div className="search">
        <ol>
          <li><SearchBar /></li>
				  <li><SearchList /></li>
        </ol>
			</div>
		);
	}
});

module.exports = Search;
