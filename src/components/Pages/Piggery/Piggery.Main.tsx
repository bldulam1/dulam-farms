import BoarMain from './Boar/Boar.Main'
import Container from '@material-ui/core/Container'
import HogMain from './Hog/Hog.Main'
import React from 'react'

export default () => {
  return (
    <Container maxWidth="lg">
      <BoarMain />
      <HogMain />
    </Container>
  )
}
