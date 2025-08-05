import {create} from 'zustand';

type ConnectivityStore = {
  setOpenConnectivityModal: (connectivity: boolean) => void;
  openConnectivityModal: boolean;
  isConnectedHealthKit: boolean;
  setConnectedHealthKit: (value: boolean) => void;
};

const useConnectivityStore = create<ConnectivityStore>(set => ({
  openConnectivityModal: false,
  isConnectedHealthKit: false,

  setOpenConnectivityModal: (connectivity: boolean) =>
    set({openConnectivityModal: connectivity}),

  setConnectedHealthKit: value => {
    set({isConnectedHealthKit: value});
  },
}));

export {useConnectivityStore};
