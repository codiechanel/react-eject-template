import '@material/textfield/dist/mdc.textfield.css'
import { Input } from 'material-lib'
import * as React from 'react'
// import SearchIcon from "@material-ui/icons/Search"
// import Input from "@material-ui/core/Input"
// import IconButton from "@material-ui/core/IconButton"
// import * as commonStyle from "./commonStyle.module.css"
import store from '../common/Store'

class SearchBar extends React.Component<any, any> {
  state = {
    val: '',
  }
  render() {
    return (
      <div className="searchBar">
        {/* <Item> */}
        {/* <Icon name="search" /> */}

        <Input
          id="my-text-field"
          // style={{ margin: 0 }}
          placeholder="Search"
          // margin={"dense"}
          onKeyDown={e => {
            if (e.keyCode == 13) {
              store.selectedLeftPanelMenu = '/suggestions'
            }
          }}
          onChange={event => {
            this.setState({ val: event.target.value })
          }}
        />

        {/* <Icon style={{ width: 50 }} name="people" /> */}
      </div>
    )
  }
}

export default SearchBar
