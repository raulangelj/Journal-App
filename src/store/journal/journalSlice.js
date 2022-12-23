import { createSlice } from "@reduxjs/toolkit";

export const journalSlice = createSlice({
  name: "journal",
  initialState: {
    isSaving: false,
    savedMessage: "",
    notes: [],
    activeNote: null,
    // activeNote: {
    //   id: '',
    //   title: '',
    //   body: '',
    //   date: 123123,
    //   imageUrls: [],
    // },
  },
  reducers: {
    savingNewNote: (state) => {
      state.isSaving = true;
    },
    addNewEmptyNote: (state, { payload }) => {
      state.notes.push(payload.newNote);
      state.isSaving = false;
    },
    setActiveNote: (state, { payload }) => {
      state.activeNote = payload.activeNote;

    },
    setNotes: (state, { payload }) => {
      state.notes = payload.notes;
    },
    setSaving: (state) => {},
    updateNote: (state, action) => {},
    deleteNoteById: (state, action) => {},
  },
});

// Action creators are generated for each case reducer function
export const {
  addNewEmptyNote,
  setActiveNote,
  setNotes,
  setSaving,
  updateNote,
  deleteNoteById,
  savingNewNote,
} = journalSlice.actions;
