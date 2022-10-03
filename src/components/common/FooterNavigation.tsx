import React, { useState } from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import { BottomNavigationAction, Paper } from "@mui/material";
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { useNavigate } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
export const FooterNavigation = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState();
  return (
    <Paper sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }} elevation={3}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(_, newValue) => {
          navigate(newValue);
          setValue(newValue);
        }}
      >
        <BottomNavigationAction
          label="一覧"
          value="/books"
          icon={<FormatListBulletedIcon />} />
        <BottomNavigationAction
          label="新規"
          value="/new"
          icon={<PlaylistAddIcon />} />
        <BottomNavigationAction
          label="ユーザー"
          value="/user"
          icon={<PersonIcon />} />
      </BottomNavigation>
    </Paper>
  );
}

export default FooterNavigation;