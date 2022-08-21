import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import questionsService from "../Services/QuestionsService";

//Types and Interfaces
export interface Question {
  _id: string;
  question: string;
  answer: string;
  category: string;
  author: {
    id: string;
    name: string;
    email: string;
  };
  source: string;
  showAuthor: boolean;
  vetted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface QuestionState {
  questions: Array<Question>;
  usedQuestions: Array<Question>;
  currentQuestion: Question | any;
  fetchStatus: FetchStatus;
  message: string | null;
  completed: Array<String>;
}

export type FetchStatus = "IDLE" | "PENDING" | "LOADING" | "ERROR" | "SUCCESS";

//Thunkfunctions
//Get ALL questions - DEV
export const getQuestions = createAsyncThunk(
  "questions/getAll",
  async (category, thunkAPI) => {
    try {
      return await questionsService.getQuestions(category);
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//Variables
const initialState: QuestionState = {
  questions: [],
  usedQuestions: [],
  currentQuestion: null,
  fetchStatus: "IDLE",
  message: null,
  completed: [],
};

//Filter function
const filterById = (arr1: Array<Question>, arr2: Array<Question>) => {
  const result: Array<Question> = arr1.filter((obj1) => {
    return !arr2.some((obj2) => {
      return obj1._id === obj2._id;
    });
  });
  return result;
};

//Questionslice
const questionSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    addUsed: (state) => {
      //Add question to incorrect list
      state.usedQuestions.push(state.currentQuestion);
      //Reset current question
      state.currentQuestion = null;
    },
    resetFetchStatus: (state, action) => {
      state.fetchStatus = "IDLE";
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getQuestions.pending, (state, action) => {
        state.fetchStatus = "LOADING";
        state.message = null;
      })
      .addCase(getQuestions.fulfilled, (state, action) => {
        state.fetchStatus = "SUCCESS";
        state.message = null;
        state.questions = action.payload;
        //Filter out used questions
        const newQuestion = filterById(action.payload, state.usedQuestions)[0];
        if (newQuestion === null || newQuestion === undefined) {
          state.message = "There are no more new questions in this category";
        }
        //Set the current question
        state.currentQuestion = newQuestion;
      })
      .addCase(getQuestions.rejected, (state, action: PayloadAction<any>) => {
        state.fetchStatus = "ERROR";
        state.message = action.payload;
      });
  },
});

export const { addUsed, resetFetchStatus } = questionSlice.actions;
export default questionSlice.reducer;
