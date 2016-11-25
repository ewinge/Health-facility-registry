import React, { Component } from 'react';
import { loadUnit } from '../api';
import OUStore from "../stores/OUStore";
import { Link, Expander, DeleteLink } from "./widgets";

/**
 * Expandable list/tree of organizational units
 * Recursive list, where each level is a OUlist containing Node elements
 * 
 * @Prop parent the parent node of this level, "" if root
 * @Prop edit function callback for editing units
 */
export default class OUList extends Component {
    constructor(props, context) {
        super(props, context);

        // Set some initial state variables that are used within the component
        this.state = {
            items: [],
        };

        this.loadOrgUnits = this.loadOrgUnits.bind(this);
    }

    componentDidMount() {
        this.loadOrgUnits();
    }

    //Listen to list changes in OUStore
    componentWillMount() {
        OUStore.on("unitDeleted", this.loadOrgUnits);
        OUStore.on("unitChanged", this.loadOrgUnits);
        OUStore.on("listReceived", this.loadOrgUnits); //Incase units are still loading
    }

    //Unlisten upon dismounting
    componentWillUnmount() {
        OUStore.removeListener("unitDeleted", this.loadOrgUnits);
        OUStore.removeListener("unitChanged", this.loadOrgUnits);
        OUStore.removeListener("listReceived", this.loadOrgUnits);
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
        };

        this.expand = this.expand.bind(this);
        this.toggleExpanded = this.toggleExpanded.bind(this);
        this.editUnit = this.editUnit.bind(this);
        this.newChild = this.newChild.bind(this);
    }

    expand() {
        this.setState({expanded: true});
    }

    toggleExpanded() {
        // invert expanded
        this.setState(prevState => ({
            expanded: !prevState.expanded
        }));
    }

    editUnit(id) {
        this.props.edit(id);
    }

    newChild() {
        this.expand();
        this.props.edit("", this.props.item.id);
    }

    render() {
        return (
            <li key={this.props.item.id}>
                <Expander expanded={this.state.expanded} onClick={this.toggleExpanded} />
                {this.props.item.name ? this.props.item.name : this.props.item.displayName}
                [
                <Link onClick={() => this.editUnit(this.props.item.id)}>edit</Link>
                |
                <Link onClick={() => this.newChild()}>new child</Link>
                |
                <DeleteLink unit={this.props.item} />
                ]
                {this.state.expanded ? <OUList parent={this.props.item.id} edit={this.props.edit} /> : ""}
            </li>
        );
    }
}
