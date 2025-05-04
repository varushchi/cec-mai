// store/modalSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ModalState {
  isOpen: boolean;
  modalType: string | null;
}

const initialState: ModalState = {
  isOpen: false,
  modalType: null,
}

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<{ modalType: string}>) => {
      state.isOpen = true
      state.modalType = action.payload.modalType
    },
    closeModal: (state) => {
      state.isOpen = false
      state.modalType = null
    },
  },
})

export const { openModal, closeModal } = modalSlice.actions
export default modalSlice.reducer