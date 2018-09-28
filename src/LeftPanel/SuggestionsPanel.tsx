import * as React from 'react'
import * as PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import store from 'common/Store'
import {
  Container,
  Content,
  Icon,
  List,
  ListItem,
  Text,
  Button,
} from 'material-lib'
import { runInAction, observable } from 'mobx'
export interface GroupsPanelProps {}
@observer
class SuggestionsPanel extends React.Component<any, any> {
  public render() {
    let arr: any = store.suggestions.entries()
    if (arr.length < 1) {
      return null
    }
    let list: any = Array.from(arr)
    return (
      <List>
        <Button
          onPress={() => {
            runInAction(() => {
              store.selectedLeftPanelMenu = null
            })
          }}
        >
          <Text>Back</Text>
        </Button>
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
                store.selectSuggestion(key).catch()
                if (window.matchMedia('(min-width: 600px)').matches) {
                  /* the viewport is greater or equal 600 pixels wide */
                } else {
                  /* the viewport is less than 600 pixels wide */
                  // this.props.history.push('/rightPanel/home')
                }
              }}
              key={key}
            >
              <Text>{key}</Text>
            </ListItem>
          )
        })}
      </List>
    )
  }
}

export default SuggestionsPanel
