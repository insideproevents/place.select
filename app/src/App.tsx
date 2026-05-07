import { Routes, Route } from 'react-router'
import Home from './pages/Home'
import ProjectDetail from './pages/ProjectDetail'
import Registration from './pages/Registration'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/proyecto/:slug" element={<ProjectDetail />} />
      <Route path="/registro" element={<Registration />} />
    </Routes>
  )
}