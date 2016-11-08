import React, { Component, PropTypes } from 'react';
import OUList from './OUList';

export default function List({ items = [], onItemClick }) {
    // Create a list of li elements that make up the list of organisation units units
    // Each has a click handler for that specific item
    const listItems = items
        .map(item => {
            return (
                <Node item={item} key={item.id}/>
            );
        });

    // Render the list with the items
    return (
        <div className="list">
            <ul>
                {listItems}
            </ul>
        </div>
    );
}

class Node extends Component {
    constructor(props) {
        super(props);

        // Set some initial state variables
        this.state = {
            expanded: false
        };

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
//        e.preventDefault();
        
        // invert expanded
    	this.setState(prevState => ({
    		expanded: !prevState.expanded
    	}));
    }
    
    render() {
        if (this.state.expanded) {
            return (
                <li key={this.props.item.id}>
                    <img src="images/open.gif" onClick={this.handleClick} />
                    {this.props.item.displayName}
                    <OUList parent={this.props.item.id} />
                </li>
            );
        } else {
            return (
                <li key={this.props.item.id}>
                    <img src="images/closed.gif" onClick={this.handleClick} />
                    {this.props.item.displayName}
                </li>
            );
        }
	}
}

List.propTypes = {
    items: PropTypes.array,
//        onItemClick: PropTypes.func.isRequired,
};
