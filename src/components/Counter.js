import React from "react";

import './Counter.css';

const Counter = (props) => {
    // Set counter data from props
    const addCount = props?.addCount ?? '0';
    const updateCount = props?.updateCount ?? '0';

    return (
        <div className="counter">
            <div className="counter__control">
                <label>Counter Board:</label>
            </div>
            
            <div className="counter__control">
                <div id="added" className="counter__board">
                    <div className="counter__board__header">Added</div>
                    <div className="counter__board__data">{addCount}</div>
                </div>

                <div id="updated" className="counter__board">
                    <div className="counter__board__header">Updated</div>
                    <div className="counter__board__data">{updateCount}</div>
                </div>
            </div>
        </div>
    );
};

export default Counter;