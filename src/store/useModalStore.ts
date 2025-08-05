import {create} from 'zustand';
import {MODAL_TYPES} from '@utils';

const {CONFIRM_DELETE, CONFIRM_LOGOUT, CONFIRM_SAVE_CHANGES} = MODAL_TYPES;

type ModalStateVariables = {
  type:
    | typeof CONFIRM_DELETE
    | typeof CONFIRM_LOGOUT
    | typeof CONFIRM_SAVE_CHANGES;
  props?: any;
};

type State = {
  currentModal?: ModalStateVariables['type'];
  modalProps?: ModalStateVariables['props'];
};

type Actions = {
  openModal: (data: ModalStateVariables) => void;
  closeModal: () => void;
};

const useModalStore = create<State & Actions>(set => ({
  currentModal: undefined,
  modalProps: undefined,

  closeModal: () =>
    set({
      currentModal: undefined,
      modalProps: undefined,
    }),
  openModal: data =>
    set({
      currentModal: data.type,
      modalProps: data.props,
    }),
}));

export type {ModalStateVariables};
export {useModalStore};
