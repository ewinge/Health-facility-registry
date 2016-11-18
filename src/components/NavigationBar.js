import React from "react";
import { Link } from "react-router";

import SearchBar from "./SearchBar";

//Renders the navigation bar on the top with links to various pages.
var NavigationBar = React.createClass({

	render: function () {
		return (
			<div className="nav">
				<ul>
					<li><Link to="/" className="nav">Home</Link></li>
					<li><Link to="/browse" className="nav">Browse</Link></li>
					<li><Link to="/edit" className="nav">Register new</Link></li>
					<li><Link to="/help" className="nav">Help</Link></li>
				</ul>
		  </div>
		);
	}
});

module.exports = NavigationBar;
