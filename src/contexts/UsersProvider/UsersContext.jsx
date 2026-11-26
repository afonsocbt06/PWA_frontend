import React from "react";

const context = {
  users: [],
  setUsers: () => {},
  countUsers: 0,
};

export const UsersContext = React.createContext(context);
