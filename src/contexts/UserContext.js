import React from 'react';

const UserContext = React.createContext({
    user: {
        nombre: '',
        apellidos: '',
        tag: ''
    },
  onSubmit: () => {}
});

export default UserContext;
