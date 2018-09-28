import { observer } from 'mobx-react'
import * as React from 'react'
import Media from 'react-media'
import store from '../common/Store'
import UIRouterPlain from '../common/UIRouterPlain'
import Details from '../components/Details'
import Members from '../components/Members'

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
