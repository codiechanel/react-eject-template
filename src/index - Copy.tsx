import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as PropTypes from 'prop-types'

import * as styles from '../styles.module.css'

import Home from './LeftPanel'
import { MemoryRouter, Switch, Route } from 'react-router'
import './index.css'
import './icons.css'
import Members from './components/Members'
import MessageListener from './components/MessageListener'
import { Container, common } from 'material-lib'

let userTheme = common.createTheme({
  // container: {
  //   backgroundColor: 'blue',
  // },
})
console.log('userTheme', userTheme)

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
        <Container>
          <MemoryRouter>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/members" component={Members} />
            </Switch>
          </MemoryRouter>
          <MessageListener />
        </Container>
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
