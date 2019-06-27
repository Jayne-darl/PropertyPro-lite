const db = {
  users: [
    {
      id: 1,
      email: 'ajoke@gmail.com',
      first_name: 'Ajoke Newman',
      last_name: 'Bag',
      password: '12345678',
      phone_number: '0806572347',
      address: 'Lagos',
      is_admin: false,

    },
    {
      id: 2,
      email: 'olade@yahoo.com',
      first_name: 'Lious Olade',
      last_name: 'Shoes',
      password: '12345678',
      phone_number: '0806567896',
      address: 'Aba',
      is_admin: false,
    },
    {
      id: 3,
      email: 'nneomababy@email.com',
      first_name: 'Nneoma Leonard',
      last_name: 'Mirror',
      password: '12345678',
      phone_number: '09046787857',
      address: 'Port Harcourt',
      is_admin: true,
    },
    {
      id: 4,
      email: 'hassan434@hotmail.com',
      first_name: 'Olamide Hassan',
      last_name: 'Cement',
      password: '12345678',
      phone_number: '0706572347',
      address: 'Kano',
      is_admin: false,
    },
    {
      id: 5,
      email: 'onyi@google.com',
      first_name: 'Onyinye Emmanuel',
      last_name: 'Clothes',
      password: '12345678',
      phone_number: '08065672347',
      address: 'Enugu',
      is_admin: false,

    },
  ],
  property: [
    {
      id: 1,
      status: 'available',
      price: 3000,
      state: 'Lagos',
      city: 'Surulere',
      address: '5 Irepodun Street',
      type: '2 bedroom',
      image_url: 'ght',
      created_on: new Date(),
      updated_at: '',
    },
  ],
};

export default db;
