import Container from '@material-ui/core/Container'
import FormEntryBoar from './Forms/FormEntry.Boar'
import React from 'react'

export default () => {
  React.useEffect(() => {
    const query = {
      a: 'asdf',
    }
    fetch(
      `/.netlify/functions/data?collection=sows&query=${JSON.stringify(query)}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      }
    )
      .then((res) => res.json())
      .then((res) => console.log(res))
  }, [])

  return (
    <Container maxWidth="lg">
      <FormEntryBoar />
      {/* <FormEntryHog />
      <FormEntrySow /> */}
    </Container>
  )
}
