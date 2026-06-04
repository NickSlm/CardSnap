import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { useState } from 'react'
import Layout from '../components/layout/layout';
import './App.css'




function App() {

  return (
   <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Layout />}/>
                            
                    </Routes>
    </BrowserRouter>
  )
}

export default App
