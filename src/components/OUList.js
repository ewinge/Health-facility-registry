import React, { Component } from 'react';
import { saveOrganisationUnit } from '../api';
import { loadUnit } from '../api';
import { handleDelete } from "../actions/Actions";
import OUStore from "../stores/OUStore"

/**
 * ES2015 class component
 * https://facebook.github.io/react/docs/reusable-components.html#es6-classes-and-react.createclass
 */
export default class OUList extends Component {
    constructor(props, context) {
        super(props, context);

        // Set some initial state variables that are used within the component
        this.state = {
            items: [],
        };

        this.deleteUnit = this.deleteUnit.bind(this);
        this.loadOrgUnits = this.loadOrgUnits.bind(this);
    }

    componentDidMount() {
        this.loadOrgUnits();
    }

    //Listen to list changes in OUStore
    componentWillMount() {
      OUStore.on("unitDeleted", this.loadOrgUnits);
      OUStore.on("listReceived", this.loadOrgUnits); //Incase units are still loading
    }

    //Unlisten upon dismounting
    componentWillUnmount() {
      OUStore.removeListener("unitDeleted", this.loadOrgUnits);
      OUStore.removeListener("listReceived", this.loadOrgUnits);
    }

    deleteUnit(item) {
      handleDelete(item);
      /*
        deleteOrganisationUnit(item.id)
            .catch(() => alert(`Could not delete organisation unit ${item.displayName}`))
            // reload the list
            .then(() => {
              handleDelete(item.id);
              this.loadOrgUnits();
            });
            */
    }

    loadOrgUnits() {
      this.setState({
          items: OUStore.getChildrenOf(this.props.parent)
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
            expanded: false,
            item: this.props.item,
        };

        this.handleClick = this.handleClick.bind(this);
        this.saveUnit = this.saveUnit.bind(this);
        this.editUnit = this.editUnit.bind(this);
        this.update = this.update.bind(this);
        this.newChild = this.newChild.bind(this);
        this.saveChild = this.saveChild.bind(this);
    }

    saveUnit(data) {
        //Update local data
        this.setState({item: data});
        // Save the organisation unit to the api
        saveOrganisationUnit(data)
            .then(this.update);
    }

    saveChild(data) {
        saveOrganisationUnit(data)
            .then(() => {
                //Update and display children, hack-ish
                this.setState({expanded: false});
                this.setState({expanded: true});
//                this.forceUpdate();
            });
    }
    update() {
        loadUnit(this.props.item.id)
            .then(unit => this.setState({item: unit}));
    }

    handleClick(e) {
        // invert expanded
        this.setState(prevState => ({
            expanded: !prevState.expanded
        }));
    }

    editUnit(id) {
        this.props.edit(id, this.saveUnit);
    }

    newChild() {
        this.props.edit("", this.saveChild, this.state.item);
    }

    render() {
        return (
            <li key={this.state.item.id}>
                <Link onClick={this.handleClick}>
                    <Expander expanded={this.state.expanded} />
                </Link>
                {this.state.item.name ? this.state.item.name : this.state.item.displayName}
                [
                <Link onClick={() => this.editUnit(this.state.item.id)}>edit</Link>
                |
                <Link onClick={() => this.newChild()}>new child</Link>
                |
                <Link onClick={() => this.props.deleteUnit(this.state.item)}>delete</Link>
                ]
                {this.state.expanded ? <OUList parent={this.state.item.id} edit={this.props.edit} /> : ""}
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
