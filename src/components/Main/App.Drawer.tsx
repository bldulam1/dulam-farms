import CloseIcon from '@material-ui/icons/Close'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import InboxIcon from '@material-ui/icons/MoveToInbox'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import MailIcon from '@material-ui/icons/Mail'
import MenuIcon from '@material-ui/icons/Menu'
import React from 'react'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import Toolbar from '@material-ui/core/Toolbar'
import { makeStyles } from '@material-ui/core/styles'
const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  toolbar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
})

export default () => {
  const classes = useStyles()
  const [drawerOpen, setDrawerOpen] = React.useState(false)

  const toggleDrawer = (open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent
  ) => {
    if (
      event &&
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return
    }

    setDrawerOpen(open)
  }

  return (
    <React.Fragment>
      <IconButton color="inherit" onClick={toggleDrawer(true)}>
        <MenuIcon />
      </IconButton>
      <SwipeableDrawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        <div
          className={classes.list}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <Toolbar className={classes.toolbar}>
            <IconButton>
              <CloseIcon />
            </IconButton>
          </Toolbar>
          <List>
            {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {['All mail', 'Trash', 'Spam'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </div>
      </SwipeableDrawer>
    </React.Fragment>
  )
}
