import {create} from 'zustand';

type LayoutStore = {
  recommendationPopup: boolean;
  toggleRecommendationPopup: () => void;
};

const useLayoutStore = create<LayoutStore>((set, get) => ({
  recommendationPopup: false,

  toggleRecommendationPopup: () => {
    const {recommendationPopup} = get();
    set({
      recommendationPopup: !recommendationPopup,
    });
  },
}));

export {useLayoutStore};
