import React from "react";

import ListItem from './ListItem';
import './List.css';

const List = (props) => {
    const operationHandler = (event) => {
        const selectedData = props?.items?.find?.((item) => item.id === event.id) ?? {};
        props?.selectedItem?.({...selectedData, operation: event.operation });
    };

    if (props?.items?.length === 0) {
        return (
            <div className="list__fallback">No contacts found, please add some contacts.</div>
        );
    }
    
    return (
        <div className="list">
            <div className="list__control">
                <label>Contact List:</label>
            </div>
            
            <div className="list__control">
                <ul>
                    {props?.items?.map?.((item, index) => (
                            <ListItem
                                id={item?.id}
                                vid={index}
                                name={item?.name}
                                phone={item?.phone}
                                onEdit={operationHandler}
                                onDelete={operationHandler}
                                key={index}
                            />
                        )
                    )}
                </ul>
            </div>
        </div>
    );
};

export default List;