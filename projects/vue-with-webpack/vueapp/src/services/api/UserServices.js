const axios = require('axios');
export default {
  getUsers() {
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

          resolve(users);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
}
