import React, { Component } from 'react';
import { saveOrganisationUnit, loadOrganisationUnits, deleteOrganisationUnit } from '../api';

/**
 * ES2015 class component
 * https://facebook.github.io/react/docs/reusable-components.html#es6-classes-and-react.createclass
 */
export default class OUList extends Component {
    constructor(props, context) {
        super(props, context);

        // Set some initial state variables that are used within the component
        this.state = {
            isLoading: true,
            items: [],
        };
        
        this.deleteUnit = this.deleteUnit.bind(this);
    }

    componentDidMount() {
        this.loadOrgUnits();
    }
    
    deleteUnit(item) {
        deleteOrganisationUnit(item.id)
            .catch(() => alert(`Could not delete organisation unit ${item.displayName}`))
            // reload the list
            .then(() => this.loadOrgUnits());
    }
    
    loadOrgUnits() {
        // Loads the organisation units from the api and sets the loading state to false and puts the items onto the component state.
        loadOrganisationUnits(this.props.parent)
            .then((organisationUnits) => {
                this.setState({
                    isLoading: false,
                    items: organisationUnits,
                });
            });
    }

    render() {
        const listItems = this.state.items
            .map(item => {
                return (
                    <Node 
                        item={item}
                        key={item.id}
                        edit={this.props.edit} 
                        deleteUnit={this.deleteUnit} 
                    />
                );
            });

        return (
            <div className="OUlist">
                <ul>
                    {listItems}
                </ul>
            </div>
        );
    }
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
        return (
            <li key={this.props.item.id}>
                <Link onClick={this.handleClick}>
                    <Expander expanded={this.state.expanded} />
                </Link>
                {this.props.item.displayName}
                [<Link onClick={() => this.props.edit(this.props.item.id)}>edit</Link>]
                [<Link onClick={() => this.props.deleteUnit(this.props.item)}>delete</Link>]
                {this.state.expanded ? <OUList parent={this.props.item.id} /> : ""}
            </li>
        );
    }
}

function Link({onClick, children}) {
    return(
        <a href="#" onClick={event => {
            event.preventDefault();
            onClick && onClick();
        }}>
            {children}
        </a>
    );
}

function Expander({expanded,onClick}) {
    return (
        <img src={expanded ? "images/open.gif" : "images/closed.gif"} onClick={onClick} />
    );
}
