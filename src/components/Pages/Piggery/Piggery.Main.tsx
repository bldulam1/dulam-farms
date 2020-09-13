import BoarMain from './Boar/Boar.Main'
import Container from '@material-ui/core/Container'
import HogMain from './Hog/Hog.Main'
import React from 'react'
import SowMain from './Sow/Sow.Main'
import { useParams } from 'react-router-dom'

export default () => {
  const { subcategory } = useParams()

  return (
    <Container maxWidth="lg">
      <SubCategory category={subcategory} />
    </Container>
  )
}

const SubCategory = (params: { category: string }) => {
  switch (params.category) {
    case 'sows':
      return <SowMain />
    case 'boars':
      return <BoarMain />
    default:
      return <HogMain />
  }
}
