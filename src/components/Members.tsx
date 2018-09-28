import '@material/button/dist/mdc.button.css'
import { Button, Icon, Text } from 'material-lib'
import { observer } from 'mobx-react'
import * as React from 'react'
import store from '../common/Store'

// import { Linking } from "react-native"
// export interface MembersProps {
//   history: any
// }

@observer
class Members extends React.Component<any, any> {
  state = {
    items: [],
  }
  // static propTypes = {
  //   match: PropTypes.object.isRequired,
  //   location: PropTypes.object.isRequired,
  //   history: PropTypes.object.isRequired,
  // }
  render() {
    // let arr = this.props.store.twitterList.entries();
    return (
      // <Container style={{ padding: 10 }}>
      <div className="home">
        {!window.matchMedia('(min-width: 600px)').matches && (
          <Button
            raised
            // style={{ backgroundColor: 'yellow' }}
            onPress={() => {
              this.props.history.goBack()
            }}
          >
            <Text>goBack </Text>
          </Button>
        )}
        <Button
          onPress={() => {
            store.selectedMenu.set('/details')
          }}
          style={{ marginRight: 'auto' }}
        >
          <Icon name="bar_chart" active />
        </Button>
      </div>
    )
  }
}
export default Members
// export default withRouter(Members)
