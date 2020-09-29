import { Col, ColsWrapper, Row, RowsWrapper } from 'react-grid-resizable'
import React, { Fragment } from 'react'

import AppBreadCrumb from '../../Main/App.BreadCrumb'
import BoarMain from './Boar/Boar.Main'
import Container from '@material-ui/core/Container'
import { Divider } from '@material-ui/core'
import HogMain from './Hog/Hog.Main'
import SowMain from './Sow/Sow.Main'
import { useParams } from 'react-router-dom'

export default () => {
  const { subcategory } = useParams()

  return (
    <Fragment>
      <RowsWrapper>
        <Row initialHeight={window.innerHeight - 64}>
          <ColsWrapper
            separatorProps={{ children: <Divider orientation="vertical" /> }}
          >
            <Col initialWidth={window.innerWidth * 0.8}>
              <AppBreadCrumb />
              <Container maxWidth="lg">
                <SubCategory category={subcategory} />
              </Container>
            </Col>
            <Col>
              <RowsWrapper separatorProps={{ children: <Divider /> }}>
                <Row>Widget 1</Row>
                <Row>Widget 2</Row>
                <Row>Widget 3</Row>
              </RowsWrapper>
            </Col>
          </ColsWrapper>
        </Row>
      </RowsWrapper>
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
