import React from "react";
import { Link } from "react-router";

import SearchBar from "./SearchBar";

//Renders the navigation bar on the top with links to various pages.
var NavigationBar = React.createClass({

	render: function () {
		return (
			<div className="nav">
				<ul>
					<li><Link to="/">Search</Link></li>
					<li><Link to="/browse">Browse</Link></li>
					<li><Link to="/edit">Register new</Link></li>
					<li><Link to="/help">Help</Link></li>
				</ul>
		  </div>
		);
	}
});

module.exports = NavigationBar;
