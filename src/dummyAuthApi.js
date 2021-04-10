// Database
const Users = [
    { 
      name: "rohit",
      username: "rohit",
      password: "honeySingh"
    },
    {
      name: "dhairya",
      username: "dhairya",
      password: "Jstar"
    },
    {
      name: "tanay",
      username: "tanay",
      password: "dhruv"
    }
];

export const findUserByUserName = (username) => {
  return Users.find((user) => user.username === username);
};

export const checkUserDetails = (username, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = findUserByUserName(username);
      if (user.password === password) {
        resolve({ success: true, status: 200 });
      }
      reject({ success: false, status: 401 });
    }, 3000);
  });
};
