import React from "react";
import { Link } from "react-router";

import Search from "./Search";

//Renders the navigation bar on the top with links to various pages.
var NavigationBar = React.createClass({
	
	render: function () {
		return ( 
			<div className="nav">
				<ul>
					<li><Link to="/" className="nav">Home</Link></li>
					<li><Link to="/register" className="nav">Register</Link></li>
					<li><Link to="/edit" className="nav">Edit</Link></li>
					<li><Link to="/help" className="nav">Help</Link></li>
					<li><Search /></li>
				</ul>
		    </div>
		);
	}
});

module.exports = NavigationBar;