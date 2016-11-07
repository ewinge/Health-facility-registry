import React, { Component, PropTypes } from 'react';
import OUList from './OUList';

export default function List({ items = [], onItemClick }) {
    // Create a list of li elements that make up the list of organisation units units
    // Each has a click handler for that specific item
    const listItems = items
        .map(item => {
            return (
                <Node item={item} />
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

    handleClick() {
    	this.setState(prevState => ({
    		expanded: !prevState.expanded
    	}));
    }
    
    render() {
	    return (
            <li key={this.props.item.id} onClick={() => this.handleClick()}>{this.props.item.displayName}
                {this.state.expanded ? <OUList parent={this.props.item.id} /> : ""}
            </li>
	    );
	}
}

List.propTypes = {
    items: PropTypes.array,
//        onItemClick: PropTypes.func.isRequired,
};
