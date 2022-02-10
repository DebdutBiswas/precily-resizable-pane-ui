import React, { useState, useEffect } from "react";
import ReactSplit, { SplitDirection } from "@devbookhq/splitter";

import Tile from "./components/Tile";
import Form from "./components/Form";
import Counter from "./components/Counter";
import List from "./components/List";

import { setContactsBaseURL, getAllContacts, addNewContact, getContactById, updateContactById, deleteContactById } from "./services/Contact";

import "./styles.css";
import "./App.css";
import "./gutter.css";

const apiBaseURL = process.env.REACT_APP_API_URI || 'http://localhost:3000';

// Set axios api endpoint for contacts
setContactsBaseURL(`${apiBaseURL}/contacts`);

const App = () => {
  // State management
  const [data, setData] = useState([]);
  const [opCounter, setOpCounter] = useState({ addCount: 0, updateCount: 0, deleteCount: 0 });
  const [selectedData, setSelectedData] = useState({ id: '', name: '', phone: '' });

  // Get all contacts for first time
  useEffect(() => {
    getAllContacts((allContacts) => {
      setData(allContacts);
    });
  }, []);

  // Poll all contacts with 5 sec interval
  // useEffect(() => {
  //   const timeoutIdentifier = setTimeout(() => {
  //     getAllContacts((allContacts) => {
  //       setData(allContacts);
  //     });
  //   }, 5000);

  //   return () => {
  //     clearTimeout(timeoutIdentifier);
  //   };
  // }, [data]);

  // Add new contact handler
  const dataSubmitHandler = (eventData) => {
    addNewContact(eventData, (newAddedContact) => {
      getAllContacts((allContacts) => {
        setData(allContacts);
      });
      setOpCounter({ ...opCounter, addCount: ++opCounter.addCount });
      console.log({ operation: 'added', eventData: newAddedContact });
    });
  };

  // Update contact handler
  const dataUpdateHandler = (eventData) => {
    updateContactById(eventData.id, eventData, (oldContact) => {
      setSelectedData({ id: '', name: '', phone: '' });
      getAllContacts((allContacts) => {
        setData(allContacts);
      });
      setOpCounter({ ...opCounter, updateCount: ++opCounter.updateCount });
      console.log({ operation: 'updated', eventData, oldData: oldContact });
    });
  };

  // Delete contact handler
  const dataDeleteHandler = (eventData) => {
    deleteContactById(eventData.id, (deletedContact) => {
      // setSelectedData(previousData => {
      //   console.log({ ...previousData, id: '' });
      //   return { ...previousData, id: '' };
      // });
      getAllContacts((allContacts) => {
        setData(allContacts);
      });
      setOpCounter({ ...opCounter, deleteCount: ++opCounter.deleteCount });
      console.log({ operation: 'deleted', eventData: deletedContact });
    });
  };

  // Select and update ui of form fields from selected contact item
  const selectedDataHandler = (eventData) => {
    if (eventData.operation === 'delete') {
      dataDeleteHandler(eventData);
    } else if (eventData.operation === 'edit') {
      getContactById(eventData.id, (selectedContact) => {
        setSelectedData({
          id: selectedContact?.id ?? '',
          name: selectedContact?.name ?? '',
          phone: selectedContact?.phone ?? ''
        });
        console.log({ operation: 'selected', eventData: selectedContact });
      });
    }
  };

  return (
    <div className="app">
      <div className="splits">
        <ReactSplit
          direction={SplitDirection.Vertical}
          initialSizes={[0, 100, 0]}
          gutterClassName="gutter-vertical"
          draggerClassName="dragger-vertical"
        >
          <div/>
          <ReactSplit
            direction={SplitDirection.Horizontal}
            initialSizes={[0, 100, 0]}
            gutterClassName="gutter-horizontal"
            draggerClassName="dragger-horizontal"
          >
            <div/>

            <ReactSplit
              direction={SplitDirection.Vertical}
              gutterClassName="gutter-vertical"
              draggerClassName="dragger-vertical"
            >
              <ReactSplit
                direction={SplitDirection.Horizontal}
                initialSizes={[40, 60]}
                gutterClassName="gutter-horizontal"
                draggerClassName="dragger-horizontal"
              >
                <Tile>
                  <Counter addCount={opCounter.addCount} updateCount={opCounter.updateCount}/>
                </Tile>
                <Tile>
                  <Form selection={selectedData} onSubmit={dataSubmitHandler} onUpdate={dataUpdateHandler}/>
                </Tile>
              </ReactSplit>
              <Tile>
                <List items={data} selectedItem={selectedDataHandler}/>
              </Tile>
            </ReactSplit>

            <div/>
          </ReactSplit>
          <div/>
        </ReactSplit>
      </div>
    </div>
  );
};

export default App;
