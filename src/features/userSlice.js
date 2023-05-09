import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  users: [],
  isLoading: false,
  isError: false,
};

// Creating the user
export const createUser = createAsyncThunk(
  "create",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        "https://644ca5bbcfdddac97093df3f.mockapi.io/crud",
        data
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
// Get all user
export const getUser = createAsyncThunk(
  "allusers",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        "https://644ca5bbcfdddac97093df3f.mockapi.io/crud"
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Deleting the user
export const deleteUser = createAsyncThunk(
  "deleteUser",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.delete(
        `https://644ca5bbcfdddac97093df3f.mockapi.io/crud/${id}`
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Update the user
export const updateUser = createAsyncThunk(
  "update",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.put(
        `https://644ca5bbcfdddac97093df3f.mockapi.io/crud/${data.id}`,
        data
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const userSlice = createSlice({
  name: "userDetails",
  initialState,
  extraReducers: {
    [createUser.pending]: (state) => {
      state.isLoading = true;
    },
    [createUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.users.push(action.payload);
    },
    [createUser.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.users = action.payload.message;
    },
    [getUser.pending]: (state) => {
      state.isLoading = true;
    },
    [getUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.users = action.payload;
    },
    [getUser.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.users = action.payload.message;
    },
    [deleteUser.pending]: (state) => {
      state.isLoading = true;
    },
    [deleteUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.users = state.users.filter((ele) => ele.id !== action.payload.id);
    },
    [deleteUser.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.users = action.payload.message;
    },
    [updateUser.pending]: (state) => {
      state.isLoading = true;
    },
    [updateUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.users = state.users.map((ele) =>
        ele.id === action.payload.id ? action.payload : ele
      );
    },
    [updateUser.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.users = action.payload.message;
    },
  },
});

export default userSlice.reducer;
