import { Box } from "@mui/material";
import React from "react";
import { Navbar, SideBar } from "../../share";

const drawerWidth = 240;

export const JournalLayout = ({ children }) => {
  return (
    <Box sx={{ display: "flex" }}>
      <Navbar drawerWidth={drawerWidth} />
      <SideBar drawerWidth={drawerWidth} />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {/* Toolbar */}
        {children}
      </Box>
    </Box>
  );
};
