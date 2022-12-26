import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../../firebase/config";
import { fileUpload, loadNotes } from "../../../helpers";
import {
  addNewEmptyNote,
  deleteNoteById,
  savingNewNote,
  setActiveNote,
  setNotes,
  setPhotosToActiveNote,
  setSaving,
  updateNote,
} from "../journalSlice";

export const startNewNote = () => {
  return async (dispatch, getState) => {
    // dispatch saving
    dispatch(savingNewNote());
    const { uid } = getState().auth;
    const newNote = {
      title: "",
      body: "",
      date: new Date().getTime(),
    };

    const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`));
    await setDoc(newDoc, newNote);

    newNote.id = newDoc.id;

    // disptach new note
    dispatch(addNewEmptyNote({ newNote }));
    // dispatch active note
    dispatch(setActiveNote({ activeNote: newNote }));
  };
};

export const startLoadingNotes = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    if (!uid) throw new Error("No uid");
    const notes = await loadNotes(uid);
    dispatch(setNotes({ notes }));
  };
};

export const startSavingNote = () => {
  return async (dispatch, getState) => {
    dispatch(setSaving());
    const { uid } = getState().auth;
    const { activeNote } = getState().journal;
    const noteToFireStore = { ...activeNote };
    delete noteToFireStore.id;
    const docRef = doc(FirebaseDB, `${uid}/journal/notes/${activeNote.id}`);
    await setDoc(docRef, noteToFireStore, { merge: true });
    dispatch(updateNote({ updatedNote: activeNote }));
  };
};

export const startUploadingFiles = (files = []) => {
  return async (dispatch) => {
    dispatch(setSaving());
    // UPLOAD FILES ON CLOUDINARY
    const fileUploadPromises = [];
    for (const file of files) {
      fileUploadPromises.push(fileUpload(file));
    }
    const photosUrls = await Promise.all(fileUploadPromises);
    dispatch(setPhotosToActiveNote({ photosUrls }));
  };
};

export const startDeletetingNote = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    const { activeNote } = getState().journal;
    const docRef = doc(FirebaseDB, `${uid}/journal/notes/${activeNote.id}`);
    await deleteDoc(docRef);
    dispatch(deleteNoteById({ id: activeNote.id }));
  };
};
