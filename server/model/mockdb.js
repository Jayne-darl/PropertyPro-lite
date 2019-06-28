const db = {
  users: [
    {
      id: 1,
      email: 'ajoke@gmail.com',
      first_name: 'Ajoke',
      last_name: 'Newman',
      password: '12345678',
      phone_number: '08065723475',
      address: 'Lagos',
      is_admin: true,
    },
    {
      id: 2,
      email: 'olade@yahoo.com',
      first_name: 'Lious',
      last_name: 'Olade',
      password: '12345678',
      phone_number: '08065678967',
      address: 'Aba',
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
