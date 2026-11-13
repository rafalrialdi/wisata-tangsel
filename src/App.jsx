import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Detail from './pages/Detail.jsx'

function ScrollKeAtas() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function App() {
  return (
    <>
      <ScrollKeAtas />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/wisata/:slug" element={<Detail />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </>
  )
}
