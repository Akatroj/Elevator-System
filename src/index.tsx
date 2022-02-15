import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import { App } from './App';
import { ElevatorContainer } from './components/';
import { DebugModeProvider } from './contexts';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <DebugModeProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/floors/0" />} />
          <Route path="floors" element={<App />}>
            <Route path=":floor" element={<ElevatorContainer />} />
          </Route>
          <Route path="*" element={<h1>Nothing here 😔</h1>} />
        </Routes>
      </HashRouter>
    </DebugModeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
