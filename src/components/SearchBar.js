import React from "react";

var SearchBar = React.createClass({

	render() {
		return (
			<input
				className="input"
				type="search"
				disabled={this.props.disabled ? "disabled" : ""}
				placeholder={this.props.placeholder}
				onChange={this.props.onChange}
				value={this.props.value}
				size={this.props.size}
			/>
		);

	}
});

//Defaults
SearchBar.defaultProps = {
  size: 30,
  disabled: false,
	placeholder: "Search"
};

module.exports = SearchBar;
