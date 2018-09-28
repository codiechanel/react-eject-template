import * as React from 'react'
import { observer } from 'mobx-react'
import { observable } from 'mobx'

import * as PropTypes from 'prop-types'
import Media from 'react-media'
import Members from '../components/Members'
import UIRouterPlain from '../common/UIRouterPlain'
import store from '../common/Store'
import Details from '../components/Details'
import { MemoryRouter, Switch, Route } from 'react-router'
@observer
class RightPanel extends React.Component<any, any> {
  render() {
    let selectedMenu = store.selectedMenu.get()
    return (
      <div className="rightPanel">
        <Media query="(min-width: 960px)">
          {matches =>
            matches ? (
              <>
                <Members />
                <Details />
              </>
            ) : (
              <UIRouterPlain routeSource={selectedMenu}>
                <Members history={this.props.history} />
                <Details route="/details" />
              </UIRouterPlain>
            )
          }
        </Media>
      </div>
    )
  }
}

export default RightPanel
