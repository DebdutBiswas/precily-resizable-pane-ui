import React, { useState, useEffect } from "react";

import './Form.css';

const Form = (props) => {
    const [id, setId] = useState('');
    const [data, setData] = useState({ name: '', phone: '' });
    const [isValid, setIsValid] = useState({ name: true, phone: true });

    useEffect(() => {
        //use set timeout for debouncing
        const timeoutIdentifier = setTimeout(() => {
            setId(props?.selection?.id ?? '');
            setData({ name: props?.selection?.name ?? data.name, phone: props?.selection?.phone ?? data.phone });
        }, 250);

        return () => {
            // console.log(`clean up`);
            clearTimeout(timeoutIdentifier); //clear the last timer before setting a new timer
        }; //cleanup function
    }, [props.selection]);

    const submitHandler = (event) => {
        event.preventDefault();
        if (validationChecker() === false) return;
        props.onSubmit(data);
        setData({ name: '', phone: '' });
    };

    const updateHandler = (event) => {
        if (validationChecker() === false) return;
        props.onUpdate({ ...data, id });
        setId('');
        setData({ name: '', phone: '' });
    };

    const dataChangeHandler = (event) => {
        if (event.target.value.trim().length > 0) {
            setIsValid({ ...isValid, [event.target.id]: true });
        }
        setData({ ...data, [event.target.id]: event.target.value });
    };

    const validationChecker = () => {
        let validityTest = true;

        for (let key in data) {
            if (data[key].trim().length === 0) {
                setIsValid({ ...isValid, [key]: false });
                validityTest = false;
            }
        }

        return validityTest;
    };

    return (
        <div className="form">
            <form onSubmit={submitHandler}>
                <div className="form__control">
                    <label>Enter Contact Details:</label>
                </div>
                <div className={`form__control ${(isValid.name === false) ? 'invalid' : ''}`}>
                    <input
                        type="text"
                        id="name"
                        placeholder="Name"
                        value={data.name}
                        onChange={dataChangeHandler}
                    />
                </div>
                <div className={`form__control ${(isValid.phone === false) ? 'invalid' : ''}`}>
                    <input
                        type="text"
                        id="phone"
                        placeholder="Phone Number"
                        value={data.phone}
                        onChange={dataChangeHandler}
                    />
                </div>
                <div className="form__actions">
                    <button id="add" className="button" type="submit">Add</button>
                    <button id="update" className="button" type="button" onClick={updateHandler}>Update</button>
                </div>
            </form>
        </div>
    );
};

export default Form;