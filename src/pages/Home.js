import React from "react";
import Search from "../components/Search";
import SearchMap from "../components/SearchMap";

var Home = React.createClass({
	render: function () {
		return (
			<div className="home">
				<Search />
				<SearchMap />
			</div>
		);
	}
});

module.exports = Home;
