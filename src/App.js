import React, { useState, useEffect } from "react";
import ReactSplit, { SplitDirection } from "@devbookhq/splitter";

import Tile from "./components/Tile";
import Form from "./components/Form";
import Counter from "./components/Counter";
import List from "./components/List";

import { getAllContacts, addNewContact, getContactById, updateContactById, deleteContactById } from "./services/Contact";

import "./styles.css";
import "./App.css";
import "./gutter.css";

// let INITIAL_DATA = [
//   {
//     id: 'd63eb334-5f88-4134-b707-3f82116cfc09',
//     name: 'Name1',
//     phone: '9091917512'
//   },
//   {
//     id: 'ac74197a-8c5b-48ff-b65d-ae25c0bddc69',
//     name: 'Name2',
//     phone: '9412566669'
//   },
//   {
//     id: '3bd99d6d-0017-4b36-9ebd-b55c448e413b',
//     name: 'Name3',
//     phone: '9494506346'
//   },
//   {
//     id: 'da66b2c5-dac5-4104-93ad-98ea9bf4216f',
//     name: 'Name4',
//     phone: '9582481988'
//   },
//   {
//     id: '5c851670-0710-425a-a0b5-7b02a2f1bf1d',
//     name: 'Name5',
//     phone: '9838857116'
//   },
//   {
//     id: '624c883b-406c-4a5e-ad02-68c7981dd274',
//     name: 'Name6',
//     phone: '9692916148'
//   },
//   {
//     id: 'f8133262-9f8c-4569-ac28-abe23bc9044a',
//     name: 'Name7',
//     phone: '9451332576'
//   },
// ];

// INITIAL_DATA = [];

const App = () => {
  const [data, setData] = useState([]);
  const [opCounter, setOpCounter] = useState({ addCount: 0, updateCount: 0, deleteCount: 0 });
  const [selectedData, setSelectedData] = useState({ id: '', name: '', phone: '' });

  useEffect(() => {
    getAllContacts((allContacts) => {
      setData(allContacts);
    });
  }, []);

  useEffect(() => {
    const timeoutIdentifier = setTimeout(() => {
      getAllContacts((allContacts) => {
        setData(allContacts);
      });
    }, 5000);

    return () => {
      clearTimeout(timeoutIdentifier); //clear the last timer before setting a new timer
    }; //cleanup function
  }, [data]);

  const dataSubmitHandler = (eventData) => {
    addNewContact(eventData, (newAddedContact) => {
      getAllContacts((allContacts) => {
        setData(allContacts);
      });
      setOpCounter({ ...opCounter, addCount: ++opCounter.addCount });
      console.log({ operation: 'added', eventData: newAddedContact });
    });
  };

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
