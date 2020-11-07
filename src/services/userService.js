const KEYS = {
  users: "users",
  userId: "userId",
};

// export const getDepartmentCollection = () => [
//   { id: "1", title: "Development" },
//   { id: "2", title: "Marketing" },
//   { id: "3", title: "Accounting" },
//   { id: "4", title: "HR" },
// ];

export function insertUser(data) {
  let users = getAllUsers();
  data["id"] = generateUserId();
  users.push(data);
  localStorage.setItem(KEYS.users, JSON.stringify(users));
}
//todo generar gravatar aqui y grabarlo en el datastore

export function updateUser(data) {
  let users = getAllUsers();
  let recordIndex = users.findIndex((x) => x.id == data.id);
  users[recordIndex] = {
    ...data
  };
  localStorage.setItem(KEYS.users, JSON.stringify(users));
}

export function generateUserId() {
  if (localStorage.getItem(KEYS.userId) == null)
    localStorage.setItem(KEYS.userId, "0");
  var id = parseInt(localStorage.getItem(KEYS.userId));
  localStorage.setItem(KEYS.userId, (++id).toString());
  return id;
}

export function getAllUsers() {
  if (localStorage.getItem(KEYS.users) == null)
    localStorage.setItem(KEYS.users, JSON.stringify([]));
  return JSON.parse(localStorage.getItem(KEYS.users));
}

export function deleteAllUsers() {
  localStorage.setItem(KEYS.users, JSON.stringify([]));
  return JSON.parse(localStorage.getItem(KEYS.users));
}

export function deleteUser({
  id
}) {
  let users = getAllUsers();
  const uf = users.filter(u => u.id !== id)
  localStorage.setItem(KEYS.users, JSON.stringify(uf))
  return JSON.parse(localStorage.getItem(KEYS.users));
}



export function randomUserFields()  {
  const randomName = () => Math.random().toString(36).replace(/[^a-zA-Z]+/g, '').replace(/[aoump]/, '').substr(0, 5) + ' ' + Math.random().toString(36).replace(/[^asdfghjlkopuytem]+/g, '').substr(0, 5) + ' ' + Math.random().toString(36).replace(/[aeoump]+/g, '').replace(/^\w\./, '').substr(0, 5) + (' t' + Math.random().toString(36).replace(/[^a-zA-Z]+/g, '')).substr(0, 5)
  const randomAge = () => {
    const r = Math.floor((Math.random() * 45) + 1)
    if (r < 18) return 18
    else
      return r
  }
  const randomEmail = () => Math.random().toString(36).replace(/[^a-zA-Z]+/g, '').substr(0, 8) + '@' + Math.random().toString(36).replace(/[^a-zA-Z]+/g, '').substr(0, 8) + '.com'
  const randomPhone =()=> parseInt(Math.random() * 10000000000).toString()
  const randomGender = ()=> Math.random() < 0.5 ? 'male' : 'female'
  return {
    id: 0,
    name: randomName(),
    email: randomEmail(),
    phone: randomPhone(),
    age: randomAge(),
    gender: randomGender(),
    relocation: false,
  };
}
