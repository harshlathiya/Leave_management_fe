export interface LeaveStatus {
  email: string;
  name: string;
  userId: number;
  leaveDifference: number;
  leaveType: string;
  reason: string;
  requestToId: number;
  requestedBy: {
    id: number;
    name: string;
    email: string;
  };
  requestedTo: {
    name: string;
    email: string;
  };
  roleId: number;
  startDate: string;
  endDate: string;
  status: string;
  updatedAt: string;
  userLeave: {
    usedLeave: number;
    availableLeave: number;
  };
  createdAt: string;
  id: number;
}

export type LeaveDetails = {
  attendancePercentage: number;
  availableLeave: number;
  totalLeave: number;
  totalWorkingDays: number;
  usedLeave: number;
  user: {
    name: string;
    email: string;
  };
  email: string;
  name: string;
  userId: number;
};

export interface User {
  name: string;
  grNumber: number;
  id: number;
  email: string;
  gender: string;
  image: string;
  phone: number;
  department: string;
  address: string;
  div: string | null;
  createdAt: string;
  user?:string;
}

export type SortType = {
  id: string;
  desc: boolean;
};


export interface DataTableProps<T> {
  columns: any;
  data: T[];
  setData: React.Dispatch<React.SetStateAction<T[]>>;
  currentPage: number;
  setMaxPage: React.Dispatch<React.SetStateAction<number>>;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  query: string;
  setGetSorting: React.Dispatch<React.SetStateAction<any>>;
  getSorting: any;
  urlType: string;
}