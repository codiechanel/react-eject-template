import '@material/button/dist/mdc.button.css';
import { Body, Button, Card, CardItem, Icon, Left, List, Text } from 'material-lib';
import { observer } from 'mobx-react';
import * as React from 'react';
import store from '../common/Store';
import BottomBar from './BottomBar';




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
    let arr = store.compareList.entries()
    // if (arr.length < 1) {
    //   return null
    // }
    let list = Array.from(arr)

    const onMicroScreen = window.matchMedia('(min-width: 600px)').matches

    // let arr = this.props.store.twitterList.entries();
    return (
      // <Container style={{ padding: 10 }}>
      <div className="home">
        <div className="sidebarHeader">
          {!onMicroScreen && (
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
          <Icon name="home" active />
          {!window.matchMedia('(min-width: 960px)').matches && (
            <Button
              onPress={() => {
                store.selectedMenu.set('/details')
              }}
              style={{ marginRight: 'auto' }}
            >
              <Icon name="bar_chart" active />
            </Button>
          )}

          <Icon name="menu" active />
        </div>

        <List>
          {list.map(([key, item]) => {
            return (
              <Card
                // style={{ backgroundColor: 'blue' }}
                // transparent
                key={key}
              >
                <CardItem
                  // bordered={false}
                  // button
                  onPress={() => {
                    // let link = `https://twitter.com/${item.screen_name}`
                    // Linking.openURL(link)
                    // console.log(item.screen_name)
                    // store.fetchTimeline(item.screen_name).catch()
                    // store.selectedMenu.set('/details')
                  }}
                >
                  <Left>
                    {/* <Thumbnail
                      // square
                      // small
                      source={{ uri: item.profile_image_url }}
                    /> */}
                    <Body>
                      <Text>{item.name}</Text>
                      <Text>version: {item.version}</Text>
                      {/* <Text>repo: {item.repository.url}</Text> */}
                    </Body>
                  </Left>
                </CardItem>
              </Card>
            )
          })}
        </List>
        <BottomBar />
      </div>
    )
  }
}
export default Members
// export default withRouter(Members)
