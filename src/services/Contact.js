import axios from "axios";

axios.defaults.baseURL = 'http://localhost:3000/contacts';

axios.defaults.headers.get['Content-Type'] = 'application/json';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.put['Content-Type'] = 'application/json';
axios.defaults.headers.delete['Content-Type'] = 'application/json';

export function setContactsBaseURL(url) {
    axios.defaults.baseURL = url;
};

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