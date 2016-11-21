import React from "react";
import Search from "../components/Search";
import Map from "../components/Map";
import { handleLoadAllUnits } from "../actions/Actions";

var Home = React.createClass({
	render: function () {

		//Default map center for now
		const location = {
			lat: 8.7208,
			lng: -11.9388
		}

		//Default map zoom
		const zoom = 8;

		//Loads organization units into the OUStore
		handleLoadAllUnits();

		return (
			<div className="home">
				<Search />
				<Map center={location} zoom={zoom}/>
			</div>
		);
	}
});

module.exports = Home;
