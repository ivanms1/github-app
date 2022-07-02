import create from "zustand";

type AppState = {
  isNavbarOpen: boolean;
  handleNavbar: (state: boolean) => void;
};

const useStore = create<AppState>((set) => ({
  isNavbarOpen: false,
  handleNavbar: () => set((state) => ({ isNavbarOpen: !state.isNavbarOpen })),
}));

export default useStore;
