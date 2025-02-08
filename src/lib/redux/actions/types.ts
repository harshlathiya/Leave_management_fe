// types.ts

// User interface
export interface User {
    id?: number;
    name?: string;
    email?: string;
    gender?: string;
    image?: string;
    grNumber?: string | null;
    phone?: string;
    address?: string;
    department?: string;
    div?: string | null;
    roleId?: number;
    createdAt?: string;
    updatedAt?: string;
  }
  
  // Action types
  export const FETCH_USERS = "FETCH_USERS";
  export const SET_USERS = "SET_USERS";
  export const ADD_USER = "ADD_USER";
  export const UPDATE_USER = "UPDATE_USER";
  export const DELETE_USER = "DELETE_USER";
  
  // Action interfaces
  interface FetchUsersAction {
    type: typeof FETCH_USERS;
  }
  
  interface SetUsersAction {
    type: typeof SET_USERS;
    payload: User[];
  }
  
  interface AddUserAction {
    type: typeof ADD_USER;
    payload: User;
  }
  
  interface UpdateUserAction {
    type: typeof UPDATE_USER;
    payload: User;
  }
  
  interface DeleteUserAction {
    type: typeof DELETE_USER;
    payload: number; // Assuming payload is the user ID
  }
  
  export type UserActionTypes =
    | FetchUsersAction
    | SetUsersAction
    | AddUserAction
    | UpdateUserAction
    | DeleteUserAction;
  