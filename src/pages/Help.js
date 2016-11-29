import React from "react";

var Help = React.createClass({
    render: function () {
        return (
            <div className="page">
                <div className="help">
                <h1>User guide</h1>
                <h2>Search</h2>
                <p>
                    The regular search is for finding organization units by <i>displaynames</i>. <br/>
                    To search for <i>ID</i>, <i>code</i>, or <i>all three</i>, use the advanced search by pressing the <b>advanced</b> button below the search bar.
                </p>
                <p>
                    Clicking on one of the results will expand it and show more information
                </p>
                <ul>
                    <li>The <b>Locate</b> button will move the map to the unit's location. (Disabled if coordinates are unavailable)</li>
                    <li>The <b>Edit</b> button will allow you to edit the chosen unit's data.</li>
                    <li>The <b>Delete</b> will permanently delete a unit! Use caution. (Only for facilities)</li>
                </ul>
                <h2>Browse</h2>
                <p>
                    The Browse page is for navigating the organisation hierarchy.
                    Here you can also edit, delete and create new organizational units.
                </p>
                <h2>New root unit</h2>
                <p>
                    Here you can create a new top-level unit, if you are starting out with an empty database. Dhis2 works best with a single top-level unit.
                </p>
                </div>
            </div>
        );
    }
});

module.exports = Help;
