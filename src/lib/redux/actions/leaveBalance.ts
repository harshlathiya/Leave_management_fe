// actions/leaveBalance.ts
import { LEAVE_BALANCE, UPDATE_LEAVE_BALANCE } from "./actionTypes";
import { LeaveBalanceState } from "../reducers/leaveBalance"
// Define the shape of the payload


// Action creators
export const leaveBalance = () => {
  return {
    type: LEAVE_BALANCE as typeof LEAVE_BALANCE,
  };
};

export const setLeaveBalance = (data: LeaveBalanceState) => {
  return {
    type: UPDATE_LEAVE_BALANCE as typeof UPDATE_LEAVE_BALANCE,
    payload: data,
  };
};

// Define Action Types using ReturnType
export type LeaveBalanceActions =
  | ReturnType<typeof leaveBalance>
  | ReturnType<typeof setLeaveBalance>;
