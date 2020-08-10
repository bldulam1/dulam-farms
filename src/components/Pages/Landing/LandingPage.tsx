import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Container from '@material-ui/core/Container'
import CssBaseline from '@material-ui/core/CssBaseline'
import Grid from '@material-ui/core/Grid'
import LandingAppBar from './Landing.AppBar'
import LandingFooter from './Landing.Footer'
import LandingStyles from './Landing.Styles'
import React from 'react'
import Typography from '@material-ui/core/Typography'

const businesses = [
  {
    name: 'Piggery',
    image:
      'https://images.unsplash.com/photo-1574220307753-957783ab948b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=60',
    description:
      'This is a media card. You can use this section to describe the content.',
  },
  {
    name: 'Broiler',
    image:
      'https://images.unsplash.com/photo-1548550035-dd30af4ced74?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=60',
    description:
      'This is a media card. You can use this section to describe the content.',
  },
  {
    name: 'Cattle',
    image:
      'https://images.unsplash.com/photo-1551298457-c72eced6d0ad?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=60',
    description:
      'This is a media card. You can use this section to describe the content.',
  },
]

export default function () {
  const classes = LandingStyles()

  return (
    <React.Fragment>
      <CssBaseline />
      <LandingAppBar />
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
                <Card className={classes.card}>
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
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      <LandingFooter />
    </React.Fragment>
  )
}
