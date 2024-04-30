import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './redux/store.js'
// import AppRouters from './pages/Admin/AppRouter/AppRouters.jsx'
import Loading from './components/Loading.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <React.Suspense fallback={<Loading />}>
      <Provider store={store}>
        <App />
        {/* <AppRouters /> */}
      </Provider>
    </React.Suspense>

  </BrowserRouter>
)
