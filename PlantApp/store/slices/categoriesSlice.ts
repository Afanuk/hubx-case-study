import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

export interface CategoryImage {
  id: number;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: any;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: any;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  title: string;
  rank: number;
  image: CategoryImage;
}

export interface CategoriesResponse {
  data: Category[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

interface CategoriesState {
  categories: Category[];
  loading: boolean;
  error: string | null;
}

const initialState: CategoriesState = {
  categories: [],
  loading: false,
  error: null,
};

export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async () => {
    try {
      const response = await fetch('https://dummy-api-jtg6bessta-ey.a.run.app/getCategories', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data: CategoriesResponse = await response.json();
      return data.data;
    } catch (error) {
      console.error('Error fetching categories:', error);
      // Return mock data if API fails
      return [
        {
          id: 1,
          name: "fern",
          createdAt: "2023-01-11T10:53:05.801Z",
          updatedAt: "2023-01-11T10:54:30.059Z",
          publishedAt: "2023-01-11T10:53:07.416Z",
          title: "Ferns",
          rank: 0,
          image: {
            id: 23,
            name: "6.png",
            alternativeText: null,
            caption: null,
            width: 116,
            height: 126,
            formats: null,
            hash: "6_edbcc6988a",
            ext: ".png",
            mime: "image/png",
            size: 8.24,
            url: "https://cms-cdn.plantapp.app/6_edbcc6988a/6_edbcc6988a.png",
            previewUrl: null,
            provider: "@strapi-community/strapi-provider-upload-google-cloud-storage",
            provider_metadata: null,
            createdAt: "2023-01-11T10:44:46.151Z",
            updatedAt: "2023-01-11T10:44:46.151Z"
          }
        },
        {
          id: 2,
          name: "cacti-and-succulent",
          createdAt: "2023-01-11T10:52:28.521Z",
          updatedAt: "2023-01-11T10:54:39.391Z",
          publishedAt: "2023-01-11T10:52:36.428Z",
          title: "Cacti and Succulents",
          rank: 1,
          image: {
            id: 25,
            name: "5.png",
            alternativeText: null,
            caption: null,
            width: 158,
            height: 152,
            formats: null,
            hash: "5_d2384a3938",
            ext: ".png",
            mime: "image/png",
            size: 10.01,
            url: "https://cms-cdn.plantapp.app/5_d2384a3938/5_d2384a3938.png",
            previewUrl: null,
            provider: "@strapi-community/strapi-provider-upload-google-cloud-storage",
            provider_metadata: null,
            createdAt: "2023-01-11T10:50:17.828Z",
            updatedAt: "2023-01-11T10:51:05.935Z"
          }
        },
        {
          id: 3,
          name: "flowering",
          createdAt: "2023-01-11T10:44:18.862Z",
          updatedAt: "2023-01-11T10:54:54.326Z",
          publishedAt: "2023-01-11T10:44:20.185Z",
          title: "Flowering Plants",
          rank: 2,
          image: {
            id: 22,
            name: "2.png",
            alternativeText: null,
            caption: null,
            width: 116,
            height: 126,
            formats: null,
            hash: "2_4a226c9ae7",
            ext: ".png",
            mime: "image/png",
            size: 5.28,
            url: "https://cms-cdn.plantapp.app/2_4a226c9ae7/2_4a226c9ae7.png",
            previewUrl: null,
            provider: "@strapi-community/strapi-provider-upload-google-cloud-storage",
            provider_metadata: null,
            createdAt: "2023-01-11T10:44:13.779Z",
            updatedAt: "2023-01-11T10:44:13.779Z"
          }
        },
        {
          id: 4,
          name: "edible",
          createdAt: "2023-01-11T11:04:05.527Z",
          updatedAt: "2023-01-11T11:05:56.542Z",
          publishedAt: "2023-01-11T11:04:06.784Z",
          title: "Edible Plants",
          rank: 8,
          image: {
            id: 25,
            name: "5.png",
            alternativeText: null,
            caption: null,
            width: 158,
            height: 152,
            formats: null,
            hash: "5_d2384a3938",
            ext: ".png",
            mime: "image/png",
            size: 10.01,
            url: "https://cms-cdn.plantapp.app/5_d2384a3938/5_d2384a3938.png",
            previewUrl: null,
            provider: "@strapi-community/strapi-provider-upload-google-cloud-storage",
            provider_metadata: null,
            createdAt: "2023-01-11T10:50:17.828Z",
            updatedAt: "2023-01-11T10:51:05.935Z"
          }
        }
      ];
    }
  }
);

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action: PayloadAction<Category[]>) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch categories';
      });
  },
});

export const { clearError } = categoriesSlice.actions;
export default categoriesSlice.reducer;
