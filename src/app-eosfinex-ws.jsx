'use strict'

import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import App from './containers/root.jsx'
import configureStore from './configureStore.js'

import Eos from 'eosjs'
import Sunbeam from 'sunbeam'

import getUser from './common/login.js'

const user = { id: null, name: getUser('testuser1431') }

const sbConf = {
  url: 'ws://',
  eos: {
    expireInSeconds: 60 * 60, // 1 hour,
    Eos: Eos,

    httpEndpoint: 'http://', // used to get metadata for signing transactions
    keyProvider: [''],
    account: user.name
  },
  transform: {
    orderbook: { keyed: true },
    wallet: {},
    orders: { keyed: true }
  }
}

const ws = new Sunbeam(sbConf)
ws.open()

const conf = {
  dev: true,
  user: user,
  exchangeName: 'Cantor Exchange - eosfinex',
  pair: 'EOS.USD',
  pairs: [
    'EOS.USD',
    'IQX.USD'
  ],
  client: ws,
  margin: false
}

const store = configureStore({ pairPairs: { pairs: conf.pairs, pair: conf.pair } })

ReactDOM.render((
  <Provider store={store}>
    <App conf={conf} />
  </Provider>
), document.getElementById('root'))
