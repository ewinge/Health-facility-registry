import React, { Component } from 'react';
import { handleDelete } from "../actions/Actions";
import OUStore from "../stores/OUStore"

/**
 * Link to delete a unit, only displayed for leaf nodes
 */
export function DeleteLink({id, action}) {
    if (!OUStore.hasChildren(id)) {
        return (<Link onClick={action}>delete</Link>);
    } else {
        return null;
    }
}

export function Link({onClick, children}) {
    return(
        <a href="#" onClick={event => {
            event.preventDefault();
            onClick && onClick();
        }}>
            {children}
        </a>
    );
}

export function Expander({expanded,onClick}) {
    return (
        <Link onClick={onClick}>
            <img src={expanded ? "images/open.gif" : "images/closed.gif"} />
        </Link>
    );
}
