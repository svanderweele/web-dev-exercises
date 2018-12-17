const axios = require('axios');
export default {
  getUsers() {
    return new Promise((resolve, reject) => {
      axios.get("https://randomuser.me/api/?results=10")
        .then(response => {
          resolve(response.data.results);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
}
