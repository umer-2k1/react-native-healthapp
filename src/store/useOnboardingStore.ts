import {create} from 'zustand';

const TOTAL_STEPS = 3;

type OnboardingStore = {
  currentStep: number;
  progress: number;
  setCurrentStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  reset: () => void;
};

const useOnboardingStore = create<OnboardingStore>(set => ({
  currentStep: 1,
  progress: 0,

  setCurrentStep: step =>
    set(() => ({
      currentStep: Math.max(1, Math.min(step, TOTAL_STEPS)),
      progress: (Math.max(1, Math.min(step, TOTAL_STEPS)) / TOTAL_STEPS) * 100,
    })),

  nextStep: () =>
    set(state => {
      const nextStep = Math.min(state.currentStep + 1, TOTAL_STEPS);
      return {
        currentStep: nextStep,
        progress: (nextStep / TOTAL_STEPS) * 100,
      };
    }),

  prevStep: () =>
    set(state => {
      const prevStep = Math.max(state.currentStep - 1, 1);
      return {
        currentStep: prevStep,
        progress: (prevStep / TOTAL_STEPS) * 100,
      };
    }),

  reset: () =>
    set({
      currentStep: 1,
      progress: 0,
    }),
}));

export {useOnboardingStore};
