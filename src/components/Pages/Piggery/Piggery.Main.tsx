import BoarMain from './Boar/Boar.Main'
import Container from '@material-ui/core/Container'
import HogMain from './Hog/Hog.Main'
import React from 'react'
import SowMain from './Sow/Sow.Main'

export default () => {
  return (
    <Container maxWidth="lg">
      <SowMain />
      <BoarMain />
      <HogMain />
    </Container>
  )
}
