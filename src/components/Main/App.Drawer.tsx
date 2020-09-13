import React, { useState } from 'react'

import BusinessCenterIcon from '@material-ui/icons/BusinessCenter'
import CloseIcon from '@material-ui/icons/Close'
import Collapse from '@material-ui/core/Collapse'
import Divider from '@material-ui/core/Divider'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import IconButton from '@material-ui/core/IconButton'
import InboxIcon from '@material-ui/icons/MoveToInbox'
import LabelImportantIcon from '@material-ui/icons/LabelImportant'
import { Link } from 'react-router-dom'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import MailIcon from '@material-ui/icons/Mail'
import MenuIcon from '@material-ui/icons/Menu'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import Toolbar from '@material-ui/core/Toolbar'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
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
  nested: {
    paddingLeft: theme.spacing(4),
  },
}))

export default () => {
  const classes = useStyles()
  const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({
    piggery: false,
  })
  const [drawerOpen, setDrawerOpen] = useState(false)

  const handleClick = (business: string) => {
    setExpanded((s) => ({ ...s, [business]: !s[business] }))
  }

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
          onKeyDown={toggleDrawer(false)}
        >
          <Toolbar className={classes.toolbar} onClick={toggleDrawer(false)}>
            <IconButton>
              <CloseIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List>
            <ListItem button onClick={() => handleClick('piggery')}>
              <ListItemIcon>
                <LabelImportantIcon />
              </ListItemIcon>
              <ListItemText primary="Piggery" />
              {expanded.piggery ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={expanded.piggery} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem
                  button
                  className={classes.nested}
                  component={Link}
                  to="/piggery/hogs"
                  onClick={toggleDrawer(false)}
                >
                  <ListItemIcon>
                    <BusinessCenterIcon />
                  </ListItemIcon>
                  <ListItemText primary="Hogs" />
                </ListItem>
                <ListItem
                  button
                  className={classes.nested}
                  component={Link}
                  to="/piggery/sows"
                  onClick={toggleDrawer(false)}
                >
                  <ListItemIcon>
                    <BusinessCenterIcon />
                  </ListItemIcon>
                  <ListItemText primary="Sows" />
                </ListItem>
                <ListItem
                  button
                  className={classes.nested}
                  component={Link}
                  to="/piggery/boars"
                  onClick={toggleDrawer(false)}
                >
                  <ListItemIcon>
                    <BusinessCenterIcon />
                  </ListItemIcon>
                  <ListItemText primary="Boars" />
                </ListItem>
              </List>
            </Collapse>
            <ListItem button>
              <ListItemIcon>
                <BusinessCenterIcon />
              </ListItemIcon>
              <ListItemText primary="Broiler" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <BusinessCenterIcon />
              </ListItemIcon>
              <ListItemText primary="Cattle" />
            </ListItem>
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
