import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

export interface Question {
  id: number;
  title: string;
  subtitle: string;
  image_uri: string;
  uri: string;
  order: number;
}

interface QuestionsState {
  questions: Question[];
  loading: boolean;
  error: string | null;
}

const initialState: QuestionsState = {
  questions: [],
  loading: false,
  error: null,
};

export const fetchQuestions = createAsyncThunk(
  'questions/fetchQuestions',
  async () => {
    try {
      const response = await fetch('https://dummy-api-jtg6bessta-ey.a.run.app/getQuestions', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data: Question[] = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching questions:', error);
      // Return mock data if API fails
      return [
        {
          id: 1,
          title: "How to identify plants?",
          subtitle: "Life Style",
          image_uri: "https://firebasestorage.googleapis.com/v0/b/flora---plant-identifier.appspot.com/o/public%2FCard.png?alt=media",
          uri: "https://plantapp.app/blog/identifying-plant-in-10-steps/",
          order: 1
        },
        {
          id: 2,
          title: "Differences Between Species and Varieties?",
          subtitle: "Plant Identify",
          image_uri: "https://firebasestorage.googleapis.com/v0/b/flora---plant-identifier.appspot.com/o/public%2Fcard2.png?alt=media",
          uri: "https://plantapp.app/blog/differences-between-species-and-varieties/",
          order: 2
        },
        {
          id: 3,
          title: "The reasons why the same plant can look different?",
          subtitle: "Life Style",
          image_uri: "https://firebasestorage.googleapis.com/v0/b/flora---plant-identifier.appspot.com/o/public%2FCard3.png?alt=media",
          uri: "https://plantapp.app/blog/same-seeds-but-different-looking-plants/",
          order: 3
        }
      ];
    }
  }
);

const questionsSlice = createSlice({
  name: 'questions',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuestions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchQuestions.fulfilled, (state, action: PayloadAction<Question[]>) => {
        state.loading = false;
        state.questions = action.payload;
      })
      .addCase(fetchQuestions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch questions';
      });
  },
});

export const { clearError } = questionsSlice.actions;
export default questionsSlice.reducer;
