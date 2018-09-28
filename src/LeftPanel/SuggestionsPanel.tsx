import store from 'common/Store'
import { Button, Text } from 'material-lib'
import { runInAction } from 'mobx'
import { observer } from 'mobx-react'
import * as React from 'react'
export interface GroupsPanelProps {}
@observer
class SuggestionsPanel extends React.Component<any, any> {
  public render() {
    return (
      <Button
        onPress={() => {
          runInAction(() => {
            store.selectedLeftPanelMenu = null
          })
        }}
      >
        <Text>Back</Text>
      </Button>
    )
  }
}

export default SuggestionsPanel
