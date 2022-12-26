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
      state.savedMessage = "";
    },
    setNotes: (state, { payload }) => {
      state.notes = payload.notes;
    },
    setSaving: (state) => {
      state.isSaving = true;
      state.savedMessage = "";
    },
    updateNote: (state, action) => {
      state.isSaving = false;
      const { id, title } = action.payload.updatedNote;
      state.notes = state.notes.map((note) => {
        return note.id === id ? action.payload.updatedNote : note;
      });
      state.savedMessage = `Note: "${title}", Updated Successfully!`
    },
    setPhotosToActiveNote: (state, action) => {
      state.activeNote.imageUrls = [...state.activeNote?.imageUrls, ...action.payload?.photosUrls];
      state.isSaving = false;
    },
    clearNotesLogout: (state) => {
      state.isSaving = false;
      state.savedMessage = "";
      state.notes = [];
      state.activeNote = null;
    },
    deleteNoteById: (state, action) => {
      const { id } = action.payload;
      state.notes = state.notes.filter((note) => note.id !== id);
      state.activeNote = null;

    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addNewEmptyNote,
  clearNotesLogout,
  deleteNoteById,
  savingNewNote,
  setActiveNote,
  setNotes,
  setPhotosToActiveNote,
  setSaving,
  updateNote,
} = journalSlice.actions;
