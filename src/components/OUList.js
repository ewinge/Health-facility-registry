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
            isSaving: false,
            isLoading: true,
            items: [],
        };
    }

    componentDidMount() {
        this.loadOrgUnits();
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
                    <Node item={item} key={item.id}/>
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
