import { SaveOutlined } from "@mui/icons-material";
import { Button, Grid, TextField, Typography } from "@mui/material";
import React from "react";
import { ImageGallery } from "../../shared";

export const NoteView = () => {
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
          15 de Diciembre, 2022
        </Typography>
      </Grid>
      <Grid item>
        <Button color="primary" sx={{ p: 2 }}>
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
        />
        <TextField
          type="text"
          variant="filled"
          fullWidth
          multiline
          placeholder="What happened today?"
          minRows={5}
        />
      </Grid>
      {/* Image Gallery */}
      <ImageGallery />
    </Grid>
  );
};
