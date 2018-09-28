import * as React from 'react'

import * as PropTypes from 'prop-types'

import store from '../common/Store'
import { observer } from 'mobx-react'
import '@material/button/dist/mdc.button.css'
import { Bar } from 'react-chartjs-2'

import {
  Container,
  Card,
  CardItem,
  Thumbnail,
  Linking,
  Content,
  Icon,
  List,
  Left,
  ListItem,
  Button,
  Text,
  Body,
} from 'material-lib'
// import { observer } from "mobx-react"
import { withRouter } from 'react-router'

// import { Linking } from "react-native"
// export interface MembersProps {
//   history: any
// }

@observer
class Details extends React.Component<any, any> {
  state = {
    graphType: null,
  }
  // static propTypes = {
  //   match: PropTypes.object.isRequired,
  //   location: PropTypes.object.isRequired,
  //   history: PropTypes.object.isRequired,
  // }
  render() {
    let arr = store.compareList.entries()
    // if (arr.length < 1) {
    //   return null
    // }
    let list = Array.from(arr)
    if (this.state.graphType == 'jsDelivrHits') {
      list.sort((a, b) => {
        if (b[1].jsDelivr && a[1].jsDelivr) {
          return (
            b[1].jsDelivr.statsByWeek.total - a[1].jsDelivr.statsByWeek.total
          )
        } else {
          return 0
        }
      })
    } else if (this.state.graphType == 'downloads') {
      list.sort((a, b) => {
        if (b[1].monthlyDownloads && a[1].monthlyDownloads) {
          return (
            b[1].monthlyDownloads.downloads - a[1].monthlyDownloads.downloads
          )
        } else {
          return 0
        }
      })
    } else {
      list.sort((a, b) => {
        if (b[1].github && a[1].github) {
          return b[1].github.stargazers_count - a[1].github.stargazers_count
        } else {
          return 0
        }
      })
    }
    // jsdDownloadsPerDay.total
    /**
     * limit to top 5
     */
    list = list.slice(0, 5)
    let labels = []
    let values = []
    // jsDelivrHits
    if (this.state.graphType == 'jsDelivrHits') {
      list.map(([key, item]) => {
        if (item.jsDelivr) {
          labels.push(item.name)
          values.push(item.jsDelivr.statsByWeek.total)
        }
      })
    } else if (this.state.graphType == 'downloads') {
      list.map(([key, item]) => {
        if (item.monthlyDownloads) {
          labels.push(item.name)
          values.push(item.monthlyDownloads.downloads)
        }
      })
    } else {
      list.map(([key, item]) => {
        if (item.github) {
          labels.push(item.name)
          values.push(item.github.stargazers_count)
        }
      })
    }

    const onSmallScreen = window.matchMedia('(min-width: 960px)').matches

    // let arr = this.props.store.twitterList.entries();
    return (
      // <Container style={{ padding: 10 }}>
      <div className="details">
        <div className="sidebarHeader">
          {!onSmallScreen && (
            <Button
              raised
              // style={{ backgroundColor: 'yellow' }}
              onPress={() => {
                store.selectedMenu.set(null)
                //   this.props.history.goBack()
              }}
            >
              <Text>goBack </Text>
            </Button>
          )}
          <Icon name="home" active style={{ marginRight: 'auto' }} />

          <Icon name="menu" active />
        </div>
        <Left>
          <Button
            onPress={() => {
              this.setState({ graphType: null })
            }}
          >
            <Text>Stars</Text>
          </Button>
          <Button
            onPress={() => {
              this.setState({ graphType: 'downloads' })
            }}
          >
            <Text>Downloads</Text>
          </Button>
          {/* <Button
            onPress={() => {
              this.setState({ graphType: 'jsDelivrHits' })
            }}
          >
            <Text>jsDelivrHits</Text>
          </Button> */}
        </Left>

        <MyCanvas labels={labels} values={values} />
      </div>
    )
  }
}

class MyCanvas extends React.Component<any, any> {
  state = {
    labels: [],
    values: [],
  }
  myRef: React.RefObject<{}> | any
  myChart: any

  // static getDerivedStateFromProps(props, state) {
  //   if (props.values !== state.values) {
  //     return { labels: props.labels, values: props.values }
  //   } else {
  //     return null
  //   }
  // }

  constructor(props) {
    super(props)
    this.state = {
      labels: props.labels,
      values: props.values,
    }
  }

  componentDidMount() {
    console.log('  componentDidMount cool canvas: ')
  }

  render() {
    let data = {
      labels: this.props.labels,
      datasets: [
        {
          label: '# of Votes',
          data: this.props.values,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 1,
        },
      ],
    }

    /**
     * we set maintainAspectRatio to false
     * to make it responsive
     */
    return (
      <div style={{ flex: 1 }}>
        <Bar
          data={data}
          // width={400}
          // height={250}
          options={{
            maintainAspectRatio: false,
            tooltips: {
              callbacks: {
                label: function(tooltipItem, data) {
                  let label = data.datasets[tooltipItem.datasetIndex].label
                  let value =
                    data.datasets[tooltipItem.datasetIndex].data[
                      tooltipItem.index
                    ]
                  return `${label}: ${value.toLocaleString()}`
                  // return "cool"
                },
              },
            },
          }}
        />
      </div>
    )
  }
}
export default Details
// export default withRouter(Members)
