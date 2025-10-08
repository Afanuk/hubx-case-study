import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface OnboardingState {
  hasCompletedOnboarding: boolean;
  currentStep: number;
}

const initialState: OnboardingState = {
  hasCompletedOnboarding: false,
  currentStep: 0,
};

const onboardingSlice = createSlice({
  name: 'onboarding',
  initialState,
  reducers: {
    setOnboardingCompleted: (state, action: PayloadAction<boolean>) => {
      state.hasCompletedOnboarding = action.payload;
    },
    setCurrentStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload;
    },
    resetOnboarding: (state) => {
      state.hasCompletedOnboarding = false;
      state.currentStep = 0;
    },
  },
});

export const { setOnboardingCompleted, setCurrentStep, resetOnboarding } = onboardingSlice.actions;
export default onboardingSlice.reducer;
