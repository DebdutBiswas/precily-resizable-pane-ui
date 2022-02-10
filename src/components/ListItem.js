import React from "react";

import './ListItem.css';

const ListItem = (props) => {
    // Select handler passes current contact selection and selection button event to
    // List component via props via function passing
    const selectHandler = (event) => {
        props?.onEdit?.({ id: props?.id ?? '', operation: event.target.id });
    };

    return (
        <li>
            <div className="list-item">
                <div id="vid" className="list-item__data">{props?.vid ?? ''}</div>
                <div id="name" className="list-item__data">{props?.name ?? ''}</div>
                <div id="phone" className="list-item__data">{props?.phone ?? ''}</div>
                <button id="delete" className="button" type="button" onClick={selectHandler}>Delete</button>
                <button id="edit" className="button" type="button" onClick={selectHandler}>Edit</button>
            </div>
        </li>
    );
};

export default ListItem;