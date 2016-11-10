import React from "react";

import NavigationBar from "./NavigationBar.js";

//Outermost component. Renders the navigation bar 
//and everything else below it.
var Layout = React.createClass({
	
	render: function() {
		console.log(this.props.children)
		return (
			<div className="layout">
				<NavigationBar />
				{this.props.children}
			</div>
		);
	}
});

module.exports = Layout; 