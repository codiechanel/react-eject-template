import * as React from 'react'
import * as PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import store from 'common/Store'
import { Container, Content, Icon, List, ListItem, Text } from 'material-lib'
export interface GroupsPanelProps {}

@observer
class GroupsPanel extends React.Component<any, any> {
  public render() {
    let arr: any = store.compareGroups.entries()
    if (arr.length < 1) {
      return null
    }
    let list: any = Array.from(arr)
    return (
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          overflowY: 'auto',
          backgroundColor: '#393f4f',
        }}
      >
        {list.map(([key, item]) => {
          // console.log(key)

          return (
            <ListItem
              // onPress={() => {
              //   console.log('great')
              //   this.props.history.push('/members')
              //   store.selectTwitterList(key, null).catch()
              //   // this.props.history.push("/members")
              // }}
              onPress={() => {
                // store.selectList(item)
                store.selectGroup(key)
                if (window.matchMedia('(min-width: 600px)').matches) {
                  /* the viewport is greater or equal 600 pixels wide */
                } else {
                  /* the viewport is less than 600 pixels wide */

                  this.props.history.push('/rightPanel/home')
                }

                // if (isWidthDown("xs", this.props.width)) {
                //   this.props.history.push("/rightPanel/home")
                // }
                // else {
                //   console.log('resp', "not xs")
                // }
              }}
              key={key}
            >
              <Text>{key}</Text>
            </ListItem>
          )
        })}
      </div>
    )
  }
}

export default GroupsPanel
