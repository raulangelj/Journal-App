import { SaveOutlined } from "@mui/icons-material";
import { Button, Grid, TextField, Typography } from "@mui/material";
import React, { useMemo } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ImageGallery, useForm } from "../../shared";
import { setActiveNote, startSavingNote } from "../../store/journal";

export const NoteView = () => {
  const dispatch = useDispatch();
  const { activeNote } = useSelector((state) => state.journal);
  const { body, title, onInputChange, formState, date } = useForm(activeNote);

  const dateString = useMemo(() => {
    const newDate = new Date(date);
    return newDate.toUTCString();
  }, [date]);

  useEffect(() => {
    dispatch(setActiveNote({ activeNote: formState }));
  }, [formState]);

  const onSaveNote = () => {
    dispatch(startSavingNote());
  };

  return (
    <Grid
      container
      className="animate__animated animate__fadeIn animate__faster"
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{ mb: 1 }}
    >
      <Grid item>
        <Typography fontSize={39} fontWeight="light">
          {dateString}
        </Typography>
      </Grid>
      <Grid item>
        <Button color="primary" sx={{ p: 2 }} onClick={onSaveNote}>
          <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
          Save
        </Button>
      </Grid>
      <Grid container>
        <TextField
          type="text"
          variant="filled"
          fullWidth
          placeholder="Type the title here..."
          label="Title"
          sx={{ botder: "none", mb: 1 }}
          name="title"
          value={title}
          onChange={onInputChange}
        />
        <TextField
          type="text"
          variant="filled"
          fullWidth
          multiline
          placeholder="What happened today?"
          minRows={5}
          name="body"
          value={body}
          onChange={onInputChange}
        />
      </Grid>
      {/* Image Gallery */}
      <ImageGallery />
    </Grid>
  );
};
