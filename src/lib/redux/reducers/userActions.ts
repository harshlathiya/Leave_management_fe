// reducers/userReducer.ts

import { UserActionTypes, SET_USERS, ADD_USER, UPDATE_USER, DELETE_USER } from "../actions/types";
import { User } from "../actions/types"; // Import User interface if not already imported

export interface UserState {
  userList: User[];
}

const initialState: UserState = {
  userList: [],
};

const userReducer = (state = initialState, action: UserActionTypes): UserState => {
  switch (action.type) {
    case SET_USERS:
      return {
        ...state,
        userList: action.payload,
      };
    case ADD_USER:
      return {
        ...state,
        userList: [...state.userList, action.payload],
      };
    case UPDATE_USER:
      return {
        ...state,
        userList: state.userList.map((user) =>
          user.id === action.payload.id ? action.payload : user
        ),
      };
    case DELETE_USER:
      return {
        ...state,
        userList: state.userList.filter((user) => user.id !== action.payload),
      };
    default:
      return state;
  }
};

export default userReducer;
