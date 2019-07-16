const Seed = {
  account: {
    email: 'obi@gmail.com',
    first_name: 'Ada',
    last_name: 'Obi',
    password: 'password',
    phone_number: '08086783455',
    address: 'No. 5 akerele street, uyo',
    is_admin: 'false',
  },
  emptyFirstName: {
    email: 'obiayo@gmail.com',
    first_name: '',
    last_name: 'Obi',
    password: 'password',
    phone_number: '08067856433',
    address: 'No. 2 Awolo road',
  },
  emptyLastName: {
    email: 'obiayo@gmail.com',
    first_name: 'Obi',
    last_name: '',
    password: 'password',
    phone_number: '08067856433',
    address: 'No. 2 Awolo road',
  },
  invalidEmail: {
    email: 'roro909',
    first_name: 'Roro',
    last_name: 'Abo',
    password: 'password',
    phone_number: '08035677999',
    address: 'No. 7 abiodun street, edo',
    is_admin: 'false',
  },
  inValidPassword: {
    email: 'tunde@gmail.com',
    first_name: 'Taye',
    last_name: 'Adeoye',
    password: 'pass',
    phone_number: '08039867599',
    address: 'No. 4, Abiodun street edo',
    is_admin: 'false',
  },
  inValidNumber: {
    email: 'taye@gmail.com',
    first_name: 'Taye',
    last_name: 'Adeoye',
    password: 'password',
    phone_number: '080398675',
    address: 'No. 4, Abiodun street edo',
    is_admin: 'false',
  },
  emptyAddressField: {
    email: 'obinna@gmail.com',
    first_name: 'Ada',
    last_name: 'Obi',
    password: 'password',
    phone_number: '08067856444',
    address: '',
    is_admin: 'false',
  },
  logIn: {
    email: 'obi@gmail.com',
    password: 'password',
  },
  emptyPassword: {
    email: 'obi@gmail.com',
    password: '',
  },
  emptyEmail: {
    email: '',
    password: 'password',
  },
  wrongPassword: {
    email: 'obi@gmail.com',
    password: 'passwor5',
  },
  invalidPassword: {
    email: 'obi@gmail.com',
    password: 'passwo',
  },
  nonExistingAccount: {
    email: 'aduke@gmail.com',
    password: 'password',
  },
};

export default Seed;
