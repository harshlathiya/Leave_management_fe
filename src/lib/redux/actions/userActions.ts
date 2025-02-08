// actions/userActions.ts

import {
  UserActionTypes,
  FETCH_USERS,
  SET_USERS,
  ADD_USER,
  UPDATE_USER,
  DELETE_USER,
} from "./types";
import { User } from "./types"; // Import User interface if not already imported

export const fetchUsers = (): UserActionTypes => ({
  type: FETCH_USERS,
});

export const setUsers = (users: User[]): UserActionTypes => ({
  type: SET_USERS,
  payload: users,
});

export const addUser = (user: User): UserActionTypes => ({
  type: ADD_USER,
  payload: user,
});

export const updateUser = (user: User): UserActionTypes => ({
  type: UPDATE_USER,
  payload: user,
});

export const deleteUser = (userId: number): UserActionTypes => ({
  type: DELETE_USER,
  payload: userId,
});
