/**
 * this import is important
 * because firestore is not added by default
 */

import { observable } from 'mobx'

class Store {
  selectedMenu = observable.box(null)
  @observable
  selectedLeftPanelMenu

  constructor() {}
}

const store = new Store()
export default store
