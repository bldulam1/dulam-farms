import Container from '@material-ui/core/Container'
import HogEntry from './Forms/HogEntry'
import React from 'react'
import SowEntry from './Forms/SowEntry'

export default () => {
  return (
    <Container maxWidth="lg">
      <SowEntry />
      <HogEntry />
    </Container>
  )
}
