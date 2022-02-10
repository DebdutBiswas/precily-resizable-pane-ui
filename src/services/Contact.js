import axios from "axios";

axios.defaults.baseURL = 'http://localhost:3000/contacts';

axios.defaults.headers.get['Content-Type'] = 'application/json';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.put['Content-Type'] = 'application/json';
axios.defaults.headers.delete['Content-Type'] = 'application/json';

// Set axios api endpoint
export function setContactsBaseURL(url) {
    axios.defaults.baseURL = url;
};

// Get all contacts from api and store into state via callback
export function getAllContacts(setState) {
    let result = [];

    axios.get('/')
    .then((res) => {
        result = (res?.data?.result instanceof Array) ? res.data.result : [];
    })
    .catch((err) => {
        console.log(err);
    })
    .then(() => {
        setState(result);
    });
};

// Create a new contact from ui to api and store newly added contact to state via callback
export function addNewContact(newData, setState) {
    axios.post('/', newData)
    .then((res) => {
        const result = res?.data?.result ?? { id: '', name: '', phone: '' };
        setState(result);
    })
    .catch((err) => {
        console.log(err);
    })
    .then(() => {
        // always executed
    });
};

// Get a single contact from api by id and store returned contact to state via callback
export function getContactById(id, setState) {
    axios.get(`/${id}`)
    .then((res) => {
        const result = res?.data?.result ?? { id: '', name: '', phone: '' };
        setState(result);
    })
    .catch((err) => {
        console.log(err);
    })
    .then(() => {
        // always executed
    });
};

// Update a single contact from ui to api by id and store old contact to state via callback
export function updateContactById(id, newData, setState) {
    axios.put(`/${id}`, newData)
    .then((res) => {
        const result = res?.data?.result ?? { id: '', name: '', phone: '' };
        setState(result);
    })
    .catch((err) => {
        console.log(err);
    })
    .then(() => {
        // always executed
    });
};

// Delete a single contact from ui to api by id and store deleted contact to state via callback
export function deleteContactById(id, setState) {
    axios.delete(`/${id}`)
    .then((res) => {
        const result = res?.data?.result ?? { id: '', name: '', phone: '' };
        setState(result);
    })
    .catch((err) => {
        console.log(err);
    })
    .then(() => {
        // always executed
    });
};