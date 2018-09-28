import '@material/button/dist/mdc.button.css'
import { Button, Text } from 'material-lib'
import { observer } from 'mobx-react'
import * as React from 'react'
import store from '../common/Store'

// import { Linking } from "react-native"
// export interface MembersProps {
//   history: any
// }

@observer
class Details extends React.Component<any, any> {
  // static propTypes = {
  //   match: PropTypes.object.isRequired,
  //   location: PropTypes.object.isRequired,
  //   history: PropTypes.object.isRequired,
  // }
  render() {
    // let arr = this.props.store.twitterList.entries();
    return (
      // <Container style={{ padding: 10 }}>
      <div className="details">
        {!window.matchMedia('(min-width: 960px)').matches && (
          <Button
            raised
            // style={{ backgroundColor: 'yellow' }}
            onPress={() => {
              store.selectedMenu.set(null)
              //   this.props.history.goBack()
            }}
          >
            <Text>goBack </Text>
          </Button>
        )}
        details
      </div>
    )
  }
}

export default Details
// export default withRouter(Members)
