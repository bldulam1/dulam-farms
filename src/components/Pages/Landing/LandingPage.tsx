import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import LandingFooter from './Landing.Footer'
import LandingStyles from './Landing.Styles'
import Link from '@material-ui/core/Link'
import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import Typography from '@material-ui/core/Typography'
import businesses from '../../data/businesses'

export default function () {
  const classes = LandingStyles()

  return (
    <React.Fragment>
      <main>
        <div className={classes.heroContent}>
          <Container maxWidth="md">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              Farm Management System
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="textSecondary"
              paragraph
            >
              Our livestocks are our livelihood. Caring for our animals and
              putting their welfare first is not only the right thing to do, it
              makes good business sense.
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <Grid item>
                  <Button variant="contained" color="primary">
                    Record Data
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="contained" color="secondary">
                    View Reports
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          <Grid container spacing={4}>
            {businesses.map((business) => (
              <Grid item key={business.name} xs={12} sm={6} md={4}>
                <Link
                  underline="none"
                  component={RouterLink}
                  to={business.link}
                >
                  <Card className={classes.card}>
                    <CardActionArea>
                      <CardMedia
                        className={classes.cardMedia}
                        image={business.image}
                        title={business.name}
                      />
                      <CardContent className={classes.cardContent}>
                        <Typography gutterBottom variant="h5" component="h2">
                          {business.name}
                        </Typography>
                        <Typography>{business.description}</Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Link>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      <LandingFooter />
    </React.Fragment>
  )
}
