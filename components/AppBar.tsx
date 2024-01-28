import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Link from 'next/link'

export default function ButtonAppBar() {
  return (
    <Box sx={{ flexGrow: 1}}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            href='/'
            aria-label="menu"
            sx={{ marginX: 2 }}
          >
            <img
            id="title"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNe2BdLaA7wuHvt7Nvq-PtdSiauzLPmqs1cpGOYXDxr7QctXrpnXqA4gijSDhXKI5RJP4&usqp=CAU"
            alt="user care logo"
            ></img>
            {/* <MenuIcon /> */}
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: .1 , marginLeft: 9}}>
            <Link className='link-style' href="/new">Add New</Link>
          </Typography>
          <Typography variant="h6" component="div" sx={{ flexGrow: .1, marginLeft: 0}}>
            <Link href="/">Manage All</Link>
          </Typography>
          <Typography variant="h6" component="div" sx={{ flexGrow: .1, marginLeft: 0}}>
            <Link className='link-style' href="/hired">Hired List</Link>
          </Typography>
          {/* <Button color="inherit">Login</Button> */}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
