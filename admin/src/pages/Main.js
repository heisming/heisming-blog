import React from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from './login/Login'
import Index from './index/AdminIndex'

export default function Main() {
  return (
    <Router>
          {/* react-router-dom v5 */}
          <Route path="/" exact component={Login} />
          <Route path="/index/" component={Index} />
          {/* react-router-dom v6 */}
          {/* <Routes>
            <Route path="/" exact element={<Login/>} />
            <Route path="/index/*" element={<Index/>} />
          </Routes> */}
    </Router>
  )
}