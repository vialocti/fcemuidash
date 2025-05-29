import { Box, List, ListItem, ListItemIcon, ListItemText } from '@mui/material'
import React from 'react'

const NavListDrawer = () => {
  return (
    <Box>
        <nav>
            <List>
                <ListItem>
                    <ListItemIcon>
                        
                    </ListItemIcon>
                    <ListItemText primary="InBox" />
                </ListItem>
            </List>
        </nav>
    </Box>
  )
}

export default NavListDrawer