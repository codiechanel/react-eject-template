import { common } from 'material-lib'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import Media from 'react-media'
// import Home from 'components/LeftPanel'
import { MemoryRouter, Route } from 'react-router'
import './icons.css'
import './index.css'
import LeftPanel from './LeftPanel'
import RightPanel from './RightPanel'

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

  componentDidMount() {}

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
