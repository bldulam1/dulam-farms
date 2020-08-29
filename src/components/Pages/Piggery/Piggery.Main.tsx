import Container from '@material-ui/core/Container'
import FormEntryBoar from './Forms/FormEntry.Boar'
import FormEntryHog from './Forms/FormEntry.Hog'
import FormEntrySow from './Forms/FormEntry.Sow'
import React from 'react'

export default () => {
  return (
    <Container maxWidth="lg">
      <FormEntryBoar />
      <FormEntryHog />
      <FormEntrySow />
    </Container>
  )
}
