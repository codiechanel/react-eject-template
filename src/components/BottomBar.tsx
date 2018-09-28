import * as React from 'react'
import { Button, Input } from 'material-lib'
import store from '../common/Store'
import { runInAction } from 'mobx'
export interface BottomBarProps {}

export default class BottomBar extends React.Component<any, any> {
  state = {
    val: '',
  }
  render() {
    return (
      <div className="bottomBar">
        <Input
          placeholder="Search"
          // margin={"dense"}
          onKeyDown={e => {
            if (e.keyCode == 13) {
            }
          }}
          onChange={event => {
            this.setState({ val: event.target.value })
          }}
        />
        <Button
          onPress={() => {
            console.log('running batch')
            store.runBatch(this.state.val).catch()
          }}
        >
          Save
        </Button>
      </div>
    )
  }
}
