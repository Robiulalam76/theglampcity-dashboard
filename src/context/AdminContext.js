import Cookies from 'js-cookie';
import React, { createContext, useEffect, useReducer, useState } from 'react';

export const AdminContext = createContext();

const initialState = {
  adminInfo: Cookies.get('adminInfo')
    ? JSON.parse(Cookies.get('adminInfo'))
    : null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'USER_LOGIN':
      return { ...state, adminInfo: action.payload };

    case 'USER_LOGOUT':
      return {
        ...state,
        adminInfo: null,
      };

    default:
      return state;
  }
}

export const AdminProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const adminInfo = Cookies.get('adminInfo')
    ? JSON.parse(Cookies.get('adminInfo')) : null

  console.log(adminInfo);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/admin/getRoleInfo`, {
      headers: {
        authorization: adminInfo ? `Bearer ${adminInfo.token}` : null,
      },
    })
      .then(res => res.json())
      .then(data => {
        setUser(data)
      })
  }, [])


  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch, user };
  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
};
