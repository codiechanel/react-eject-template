import { Button } from 'material-lib'
import { observer } from 'mobx-react'
import * as React from 'react'
export interface GroupsPanelProps {}

@observer
class GroupsPanel extends React.Component<any, any> {
  public render() {
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
        {!window.matchMedia('(min-width: 600px)').matches && (
          <Button
            onPress={() => {
              this.props.history.push('/rightPanel/home')
            }}
          >
            groups
          </Button>
        )}
        the groups
      </div>
    )
  }
}

export default GroupsPanel
