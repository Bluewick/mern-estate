import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { persistor, store } from './redux/store.js';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Footer from './components/Footer'

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  //   <App />
  // </StrictMode>,
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
    <div style={{ marginTop: '80px' }}>
        <App />
      </div>
      <Footer />
    </PersistGate>
  </Provider>,
)
