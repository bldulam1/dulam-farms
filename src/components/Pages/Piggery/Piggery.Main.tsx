import React, { Fragment } from 'react'

import AppBreadCrumb from '../../Main/App.BreadCrumb'
import BoarMain from './Boar/Boar.Main'
import Container from '@material-ui/core/Container'
import HogMain from './Hog/Hog.Main'
import SowMain from './Sow/Sow.Main'
import { useParams } from 'react-router-dom'

export default () => {
  const { subcategory } = useParams()

  return (
    <Fragment>
      <AppBreadCrumb />
      <Container maxWidth="lg">
        <SubCategory category={subcategory} />
      </Container>
    </Fragment>
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
