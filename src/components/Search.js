var React = require('react');

//TODO
var Search = React.createClass({

	getInitialState: function() {
		return { value: '' };
	},

	handleChange: function(e) {
		this.setState({value: e.target.value});
	},

	handleSubmit: function(e){
		this.props.onSearch(this.state.value);
	},

	render() {

		return (
			<form onSubmit={this.handleSubmit}>
				<input 
					className="search" 
					type="text" placeholder="Find organization unit..." 
					value={this.state.value} onChange={this.handleChange} 
					size="30"
				/>
			</form>
		);

	}
});

module.exports = Search;