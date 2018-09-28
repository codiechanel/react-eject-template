import axios from 'axios'
import { observable, runInAction, autorun } from 'mobx'
import * as firebase from 'firebase/app'
/**
 * this import is important
 * because firestore is not added by default
 */
import 'firebase/firestore'
let GRAPH_ENDPOINT = 'https://graph-express.herokuapp.com/graphql'
// const GRAPH_ENDPOINT = 'http://localhost:4000/graphql'
// let GRAPH_ENDPOINT = "https://graph-express.localhost/graphql";

import {
  format,
  parse,
  formatDistance,
  formatRelative,
  subDays,
} from 'date-fns'

import * as AsyncStorage from 'localforage'
import * as Coolness from 'prop-types'
import { User } from '../model/User'
class Store {
  packages = observable.map(new Map(), { deep: false })
  compareGroups = observable.map(new Map(), { deep: false })
  selectedCompareGroup = observable.map(new Map(), { deep: false })
  selectedPackage = observable.map(new Map(), { deep: false })
  suggestions = observable.map(new Map(), { deep: false })
  compareList = observable.map(new Map(), { deep: false })

  snackMessage = observable.map(new Map(), { deep: false })
  selectedMenu = observable.box(null)
  @observable
  selectedLeftPanelMenu
  db: firebase.firestore.Firestore

  constructor() {
    var config = {
      apiKey: 'AIzaSyDNauAkJyAYn3GWy5Hu-Ho9JfWnO9kS8LU',
      authDomain: 'search-demo-29c1a.firebaseapp.com',
      databaseURL: 'https://search-demo-29c1a.firebaseio.com',
      projectId: 'search-demo-29c1a',
      storageBucket: '',
      messagingSenderId: '776597968044',
    }

    firebase.initializeApp(config)

    this.db = firebase.firestore()

    /**
     * needed  this to remove the warning
     * about timestamp changes
     * temporary maybe
     */

    const settings = { /* your settings... */ timestampsInSnapshots: true }
    this.db.settings(settings)

    autorun(() => {
      let selected = this.selectedCompareGroup
      let item = selected.toJSON()
      runInAction(() => {
        this.selectedMenu.set(null)
        this.compareList.clear()
        this.selectedPackage.clear()
        for (let name in item.value) {
          let pkg = this.packages.get(name)
          this.compareList.set(name, pkg)
        }
      })
    })
  }

  async fetchSuggestions(query) {
    const url = `https://registry.npmjs.org/-/v1/search?text=${query}&popularity=1.0&quality=0.0&maintenance=0.0`
    let resp = await axios.get(url)
    runInAction(() => {
      this.suggestions.clear()

      for (let x of resp.data.objects) {
        this.suggestions.set(x.package.name, x)
      }
    })
  }

  async selectSuggestion(id) {
    let item = this.suggestions.get(id)
    let name = item.package.name
    let version = ''
    if (item.package.scope === 'unscoped') {
      version = item.package.version
    }
    let result = await this.fetchDetails(name, version)
    runInAction(() => {
      this.compareList.set(id, result)
      this.packages.set(id, result)
    })
  }

  async fetchDetails(name, version) {
    // await this.weeklyHits()
    // let boardId = "5948f1e5eed3b589485ecaa3";
    let query = `{ npm {
      packageInfo(name: "${name}", version: "${version}") {
        name
        description
        homepage
        version
        repository
        monthlyDownloads
        github{
          name
          full_name
          stargazers_count
        }
        jsDelivr {
          name
          version
          statsByWeek{
            total
            
          }
        }
      }
      }
    }`

    let { data } = await axios.get(GRAPH_ENDPOINT, { params: { query } })

    let result = data.data.npm.packageInfo

    return result
  }

  selectGroup(key) {
    let x = this.compareGroups.get(key)
    runInAction(() => {
      let newValue = {
        key: key,
        value: x,
      }
      this.selectedCompareGroup.replace(newValue)
    })
  }

  async loadPackages() {
    let querySnapshot = await this.db.collection('packages3').get()
    runInAction(() => {
      querySnapshot.forEach(doc => {
        let item = doc.data()
        this.packages.set(doc.id, item)
      })
    })
  }

  async runBatch(groupName) {
    try {
      let batch = this.db.batch()

      let keys = this.compareList.keys()

      let mapMe = {}
      let nycRef

      this.compareList.forEach((value, key, map) => {
        mapMe[encodeURIComponent(key)] = true
        nycRef = this.db.collection('packages3').doc(encodeURIComponent(key))
        batch.set(nycRef, value)
      })
      nycRef = this.db.collection('compareGroups2').doc(groupName)
      batch.set(nycRef, mapMe)
      await batch.commit()
      runInAction(() => {
        this.compareGroups.set(groupName, mapMe)
      })
    } catch (e) {
      console.log('error man', e.message)
    }
    console.log('done')
  }

  async loadCompareGroups() {
    let querySnapshot = await this.db.collection('compareGroups2').get()
    runInAction(() => {
      querySnapshot.forEach(doc => {
        let item = doc.data()
        this.compareGroups.set(doc.id, item)
      })
    })
  }

  retrieveData = async key => {
    try {
      const value = await AsyncStorage.getItem(key)

      return value
    } catch (error) {
      // Error retrieving data
      return null
    }
  }

  storeData = async (key, val) => {
    try {
      await AsyncStorage.setItem(key, val)
    } catch (error) {
      // Error saving data
    }
  }
}

const store = new Store()
export default store
