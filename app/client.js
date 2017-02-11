import 'babel-polyfill'
import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux'
import routes from './routes';
import configure from './store/configureStore';
import myhistory from './history'
import mock from './mock/mock';

console.log(mock.mockData1);

const store = configure({ config: global.$GLOBALCONFIG })
const history = syncHistoryWithStore(myhistory, store)
history.listen(location => console.log('location:', location))
// history.listen(function (location) { return location })


ReactDOM.render(
  <Provider store={store}>
    <Router history={history} >
        { routes }
    </Router>
  </Provider>,
  document.getElementById('root')
);
