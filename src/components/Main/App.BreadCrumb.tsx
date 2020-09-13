import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import Divider from '@material-ui/core/Divider'
import Hidden from '@material-ui/core/Hidden'
import HomeIcon from '@material-ui/icons/Home'
import Link from '@material-ui/core/Link'
import { Link as RRDLink } from 'react-router-dom'
import React from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'

const useStyles = makeStyles((theme) => ({
  breadcrumbs: {
    marginLeft: theme.spacing(2),
  },
  link: {
    display: 'flex',
  },
  icon: {
    marginRight: theme.spacing(0.5),
    width: 20,
    height: 20,
  },
}))

export default () => {
  const classes = useStyles()
  const locations = window.location.href.split('/').slice(3)
  const _links = locations.map((loc, locInd) => ({
    name: loc,
    to: '/' + locations.slice(0, locInd + 1).join('/'),
  }))

  return (
    <Hidden mdDown>
      <Breadcrumbs className={classes.breadcrumbs}>
        <Link color="inherit" href="/" className={classes.link}>
          <HomeIcon className={classes.icon} />
          Home
        </Link>
        {_links.map((_link) => (
          <Link
            key={_link.to}
            component={RRDLink}
            color="inherit"
            to={_link.to}
            className={classes.link}
          >
            {_link.name}
          </Link>
        ))}
      </Breadcrumbs>
      <Divider />
    </Hidden>
  )
}
