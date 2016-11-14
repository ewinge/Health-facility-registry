import React from "react";
import Search from "../components/Search";
import Map from "../components/Map";
import OUStore from "../stores/OUStore";

var Home = React.createClass({
	render: function () {

		//Default map center for now
		const location = {
			lat: 8.4613,
			lng: -13.178
		}

		return (
			<div className="home">
				<Search />
				<Map center={location} />
			</div>
		);
	}
});

module.exports = Home;
