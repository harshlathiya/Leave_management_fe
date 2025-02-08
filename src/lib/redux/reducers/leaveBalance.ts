// reducers/leaveBalance.ts
import { LEAVE_BALANCE, UPDATE_LEAVE_BALANCE } from "../actions/actionTypes";
import { LeaveBalanceActions } from "../actions/leaveBalance";

// Define the shape of the state
export interface LeaveBalanceState {
  totalLeave: number;
  availableLeave: number;
  usedLeave: number;
  totalWorkingDays: number;
  attendancePercentage: number;
  academicYear: string;
}

const initialState: LeaveBalanceState = {
  totalLeave: 0,
  availableLeave: 0,
  usedLeave: 0,
  totalWorkingDays: 0,
  attendancePercentage: 0,
  academicYear: "",
};

const changeLeaveBalance = (
  state = initialState,
  action: LeaveBalanceActions
): LeaveBalanceState => {
  switch (action.type) {
    case LEAVE_BALANCE:
      return state;
    case UPDATE_LEAVE_BALANCE:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default changeLeaveBalance;
