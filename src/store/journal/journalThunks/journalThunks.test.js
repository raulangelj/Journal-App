import { collection, deleteDoc, getDocs } from "firebase/firestore/lite";
import { FirebaseApp, FirebaseDB } from "../../../firebase/config";
import { demoUser } from "../../../fixtures";
import { addNewEmptyNote, savingNewNote, setActiveNote } from "../journalSlice";
import { startNewNote } from "./journalThunks";

describe("Tests on journalThunks", () => {
  const dispatch = jest.fn();
  const getState = jest.fn();
  beforeEach(() => jest.clearAllMocks());
  test("startNewNote should create a new empty note", async () => {
    getState.mockReturnValue({
      auth: {
        ...demoUser,
      },
    });
    await startNewNote()(dispatch, getState);
    expect(dispatch).toHaveBeenCalledWith(savingNewNote());
    expect(dispatch).toHaveBeenCalledWith(
      addNewEmptyNote({
        newNote: {
          title: "",
          body: "",
          id: expect.any(String),
          date: expect.any(Number),
        },
      })
    );
    expect(dispatch).toHaveBeenCalledWith(
      setActiveNote({
        activeNote: {
          title: "",
          body: "",
          id: expect.any(String),
          date: expect.any(Number),
        },
      })
    );

    // REMOVE FROM FIREBASE
    const colletionRef = collection(
      FirebaseDB,
      `${demoUser.uid}/journal/notes`
    );
    const docs = await getDocs(colletionRef);
    const deletePromises = [];
    docs.forEach((doc) => deletePromises.push(deleteDoc(doc.ref)));
    await Promise.all(deletePromises);
  });
});
