const axios = require('axios');

export default {
  createNewUsers() {
    return new Promise((resolve, reject) => {
      axios.get("https://randomuser.me/api/?results=10")
        .then(response => {

          let users = [];
          response.data.results.forEach((incomingUser, index) => {
            let customUser = {
              name: incomingUser.name,
              email: incomingUser.email,
              gender: incomingUser.gender,
              id: index,
            };

            users.push(customUser);
          });
          axios.post("http://localhost:8081/users/add/", {
              data: {
                newUsers: users
              },
              headers: {
                'Content-Type': 'application/json'
              }
            })
            .then(response => {
              console.log("Got users from server " + JSON.stringify(response))
            });

          if (resolve) {
            resolve();
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getUsers() {
    return new Promise((resolve, reject) => {
      axios.get("http://localhost:8081/users/get/", {
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(response => {
          resolve(response.data);
        });
    });
  },
  getUserById(id) {
    return new Promise((resolve, reject) => {
      axios.get("http://localhost:8081/users/get/" + id, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(response => {
          resolve(response.data);
        });
    });
  },
  saveUser(user) {
    return new Promise((resolve, reject) => {
      axios.post("http://localhost:8081/users/save/", {
          data: {
            user: user
          },
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(response => {
          resolve(response.data);
        });
    });
  },
  deleteUser(id) {
    return new Promise((resolve, reject) => {
      axios.post("http://localhost:8081/users/delete/" + id, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(response => {
          resolve(response.data);
        });
    });
  }



}
