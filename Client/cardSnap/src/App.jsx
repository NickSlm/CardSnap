import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { useState } from 'react'
import Layout from '../components/layout/layout';
import Binder from '../components/routes/binder';
import Home from '../components/routes/home';
import './App.css'




function App() {

  return (
   <BrowserRouter>
        <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home/>}/>
              <Route path="home" element={<Home/>}/>
              <Route path="binder" element={<Binder/>}/>
            </Route>
        </Routes>
    </BrowserRouter>
  )
}

export default App
