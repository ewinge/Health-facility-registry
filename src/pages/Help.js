import React from "react";

var Help = React.createClass({
	render: function () {
		return (
			<div className="page">
				<div className="help">
				<h1>User guide</h1>
				<p>
					The regular search is for finding organization units by <i>displaynames</i>. <br/>
					To search for <i>ID</i>, <i>code</i>, or <i>all three</i>, use the advanced search by pressing the <b>advanced</b> button below the search bar.
				</p>
				<p>
					Clicking on one of the results will expand it and show more information
					<ul>
						<li>The <b>Locate</b> button will move the map to the unit's location. (Disabled if coordinates are unavailable)</li>
						<li>The <b>Edit</b> button will allow you to edit the chosen unit's data.</li>
						<li>The <b>Delete</b> will permanently delete a unit! Use caution. (Only for facilities)</li>
					</ul>
				</p>
				</div>
			</div>
		);
	}
});

module.exports = Help;
