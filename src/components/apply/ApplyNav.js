import React, { Component, Fragment } from 'react'
import Link from 'gatsby-link'
import { Text, Flex, Box, Link as A } from '@hackclub/design-system'
import Flag from 'components/Flag'
import LogoutButton from 'components/auth/LogoutButton'
import { withRouter } from 'react-router-dom'
import { startCase, toLower } from 'lodash'

const Crumb = A.withComponent(Link).extend`
  &:last-child {
    font-weight: bold;
  }
`

class BreadcrumbClass extends Component {
  state = { path: [] }

  componentDidMount() {
    this.setState({ path: location.pathname.split('/').slice(1) })
  }

  render() {
    const { path } = this.state
    const runningPath = ['']
    return (
      <Fragment>
        {path.map((section, index) => {
          runningPath.push(section)
          const isLast = path.length - index > 1
          const humanizedSection = startCase(toLower(section))
          return (
            <Fragment key={index}>
              <Crumb
                to={runningPath.join('/')}
                color={isLast ? 'red.1' : 'white'}
                f={3}
              >
                {humanizedSection}
              </Crumb>
              {isLast ? (
                <Text.span mx={2} color="red.0" regular children="›" />
              ) : null}
            </Fragment>
          )
        })}
      </Fragment>
    )
  }
}

const Breadcrumb = withRouter(BreadcrumbClass)

const ApplyNav = ({ breadcrumb = true, ...props }) => (
  <Flex
    bg="primary"
    px={[3, 4]}
    pb={2}
    justify="space-between"
    align="center"
    w={1}
    style={{ position: 'relative' }}
    {...props}
  >
    <Flag scrolled />
    {breadcrumb ? (
      <Box f={[2, 4]} mt={2} w={32 * 16}>
        <Breadcrumb />
      </Box>
    ) : null}
    <LogoutButton mt={2} inverted />
  </Flex>
)

export default ApplyNav
