// Database
const Users =  [
    {
        username: "rohit",
        password: "honeySingh"
    },
    {
        username: "dhairya",
        password: "Jstar"
    },
    {
        username: "tanay",
        password: "dhruv"
    }
];

const findUserByUserName = (username) => {
  return Users.find((user) => user.username === username);
};

export const dummyAuthApi = (username, password) => {
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
