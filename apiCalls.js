import {showStatus} from './errorHandling'

// Your fetch requests will live here
const base = 'http://localhost:3000/api/v1/'

const checkForError = response => {
  if (response.ok) {
    return response.json();
  } else {
    throw new Error();
  }
}

function fetchData(endpoint) {
  return fetch(base + endpoint)
    .then(response => checkForError(response))  
    .catch(error => {
      console.log(error)
      showStatus('Failed to fetch data. Try again later.', false)
    })
}

function postData(endpoint, body) {
  return fetch(base + endpoint, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(response => checkForError(response))  
    .catch(error => {
      console.log(error)
      showStatus('Failed to create merchant. Try again later.', false)
    })
}

function deleteData(endpoint) {
  return fetch(base + endpoint, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then(response => {
    if (response.ok) {
      return response.text().then(text => text ? JSON.parse(text) : null);
    } else {
      throw new Error('Failed to delete. Server responded with an error.');
    }
  })  
  .catch(error => {
    console.log(error)
    showStatus('Failed to delete. Try again later.', false)
  })
}

function editData(endpoint, body) {
  return fetch(base + endpoint, {
    method: "PATCH",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(response => checkForError(response))  
    .catch(error => {
      console.log(error)
      showStatus('Failed to edit merchant. Try again later.', false)
    })
}

export {
  fetchData,
  postData,
  deleteData,
  editData
}

