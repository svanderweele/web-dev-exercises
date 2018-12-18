const axios = require('axios');

export default {
    createNewUsers() {
        return new Promise((resolve, reject) => {
            axios.get("https://randomuser.me/api/?results=10")
                .then(response => {

                    let users = [];
                    response.data.results.forEach((incomingUser, index) => {
                        let customUser = {
                            first_name: incomingUser.name.first,
                            last_name: incomingUser.name.last,
                            email: incomingUser.email,
                            gender: incomingUser.gender,
                            id: index,
                        };

                        users.push(customUser);
                    });

                    axios.post("/users/add", {
                            newUsers: users,
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        })
                        .then(response => {});

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
            axios.get("/users/get/", {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(response => {
                    resolve(response.data);
                })
                .catch(err => {
                    console.log("error while getting users " + err);
                });
        });
    },
    getUserById(id) {
        return new Promise((resolve, reject) => {
            axios.get("/users/get/" + id, {
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
            axios.post("/users/save", {                    
                    user: user,
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
            axios.put("/users/delete/" + id, {
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
