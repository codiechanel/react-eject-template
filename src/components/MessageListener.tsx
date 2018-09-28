import * as React from 'react'
// import Snackbar from "@material-ui/core/Snackbar";
import { observer } from 'mobx-react'
import store from '../common/Store'
import { MDCSnackbar } from '@material/snackbar'
import './snackbar.css'
function isEmpty(obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) return false
  }
  return true
}
class MainSnackbar extends React.Component<any, any> {
  state = {
    snackBarOpen: false,
    snackBarMessage: '',
  }

  componentDidUpdate(prevProps) {
    /**
     * it is normal that this method will be called twice
     * since you are using setState below
     * however, we need to check if the props have changed
     * if not, we will have an infinite loop here
     */

    if (this.props.snack !== prevProps.snack) {
      let snack = this.props.snack
      // console.log('source item has changed, refreshing...', this.props.item)
      //   this.setState({
      //     snackBarOpen: true,
      //     snackBarMessage: isEmpty(snack) ? 'cool' : snack.snackBarMessage,
      //   })
      const snackbar = new MDCSnackbar(document.querySelector('.mdc-snackbar'))
      const dataObj = {
        message: 'cool',
        actionText: 'Undo',
        actionHandler: function() {
          console.log('my cool function')
        },
      }

      snackbar.show(dataObj)
    }
  }

  render() {
    // let snack = this.props.store.snackMessage.toJSON()
    // console.log('resp', snack)

    return (
      <div
        className="mdc-snackbar"
        aria-live="assertive"
        aria-atomic="true"
        aria-hidden="true"
      >
        <div className="mdc-snackbar__text" />
        <div className="mdc-snackbar__action-wrapper">
          <button type="button" className="mdc-snackbar__action-button" />
        </div>
      </div>
    )
  }
}

@observer
class MessageListener extends React.Component<any, any> {
  render() {
    let snack = store.snackMessage.toJSON()
    return (
      <div>
        <MainSnackbar snack={snack} />
      </div>
    )
  }
}

export default MessageListener
