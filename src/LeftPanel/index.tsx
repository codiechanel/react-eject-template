// export interface HomeProps {
//   history: Object
// }
import store from 'common/Store'
import UIRouterPlain from 'common/UIRouterPlain'
import { Icon } from 'material-lib'
import { observable } from 'mobx'
import { observer } from 'mobx-react'
import * as React from 'react'
// import Icon from 'material/Icon'
import SearchBar from '../components/SearchBar'
import GroupsPanel from './GroupsPanel'
import SuggestionsPanel from './SuggestionsPanel'

@observer
class LeftPanel extends React.Component<any, any> {
  @observable
  selectedMenu = null
  // static propTypes = {
  //   match: PropTypes.object.isRequired,
  //   location: PropTypes.object.isRequired,
  //   history: PropTypes.object.isRequired,
  // }
  state = {
    items: [],
  }
  componentDidMount() {}
  public render() {
    return (
      // <Container style={{ padding: 10 }}>
      <div className="leftPanel">
        <div className="sidebarHeader">
          <Icon name="home" active />
          <Icon name="favorite" active />
          <Icon name="notifications" active />
          <Icon name="settings" active />
          <Icon name="menu" active />
        </div>

        <div>
          <SearchBar history={this.props.history} />
        </div>
        {/* <IconToggle /> */}
        <UIRouterPlain routeSource={store.selectedLeftPanelMenu}>
          <GroupsPanel history={this.props.history} />
          <SuggestionsPanel route="/suggestions" />
        </UIRouterPlain>
      </div>
    )
  }
}

export default LeftPanel
