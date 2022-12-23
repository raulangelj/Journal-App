import { collection, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { loadNotes } from "../../helpers";
import { addNewEmptyNote, savingNewNote, setActiveNote, setNotes } from "./journalSlice";

export const startNewNote = () => {
  return async (dispatch, getState) => {
    // dispatch saving
    dispatch(savingNewNote());
    console.log("startNewNote", getState());
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
    if ( !uid ) throw new Error("No uid");
    const notes = await loadNotes(uid);
    dispatch(setNotes({ notes }));

  };
}
