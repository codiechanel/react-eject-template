import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as PropTypes from 'prop-types'

import * as styles from '../styles.module.css'

// import Home from 'components/LeftPanel'
import { MemoryRouter, Switch, Route } from 'react-router'
import './index.css'
import './icons.css'

import LeftPanel from './LeftPanel'
import RightPanel from './RightPanel'
import MessageListener from './components/MessageListener'
import { Container, common } from 'material-lib'
import Media from 'react-media'
import store from 'common/Store'

let palette = {
  brandPrimary: '#606984',
}

let userTheme = common.createTheme({
  palette,

  button: {
    backgroundColor: palette.brandPrimary,
  },

  item: {
    // alignItems: 'flexStart',
    // backgroundColor: 'blue',
  },
  icon: {
    // width: 'auto',
  },
})

// const ThemeContext = React.createContext('cool')
const ThemeProvider: any = common.createProvider()

class App extends React.Component<any, any> {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.loadInitialData().catch()
  }

  async loadInitialData() {
    await store.loadPackages()
    await store.loadCompareGroups()
  }

  render() {
    return (
      <ThemeProvider theme={userTheme}>
        <div className="vbox">
          <div className="hbox">
            <Media query="(min-width: 600px)">
              {/*big screen, 2 column mode*/}
              {matches =>
                matches ? (
                  <>
                    <nav>
                      <LeftPanel />
                    </nav>
                    <article>
                      <RightPanel />
                    </article>
                  </>
                ) : (
                  <nav>
                    <MemoryRouter>
                      {/*<Switch>*/}
                      <>
                        <Route
                          exact
                          path="/"
                          render={props => <LeftPanel {...props} />}
                        />
                        <Route
                          path="/rightPanel/:id"
                          render={props => <RightPanel {...props} />}
                        />
                      </>
                      {/*</Switch>*/}
                    </MemoryRouter>
                  </nav>
                )
              }
            </Media>
          </div>
          {/* <MessageListener /> */}
        </div>
      </ThemeProvider>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
  // <Hello compiler="TypeScript" framework="React" />,
  // document.getElementById("root")
)
