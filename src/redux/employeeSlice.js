import { createSlice } from "@reduxjs/toolkit";

const employeeSlice = createSlice({
  name: "employee",
  initialState: {
    employees: {
      allEmployees: null,
      isFetching: false,
      error: false,
    },
  },
  reducers: {
    getEmloyeesStart: (state) => {
      state.employees.isFetching = true;
    },
    getEmloyeesSuccess: (state, action) => {
      state.employees.isFetching = false;
      state.employees.allEmployees = action.payload;
      state.employees.error = false;
    },
    getEmloyeesFailed: (state) => {
      state.employees.isFetching = false;
      state.employees.error = true;
    },
  },
});

export const { getEmloyeesStart, getEmloyeesSuccess, getEmloyeesFailed } =
  employeeSlice.actions;

export default employeeSlice.reducer;
