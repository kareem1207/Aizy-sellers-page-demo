import { Box, ChakraProvider, ColorModeScript } from "@chakra-ui/react"
import HomePage from './pages/HomePage'
import CreatePage from './pages/CreatePage'
import Navbar from './components/Navbar'
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <ChakraProvider>
      <ColorModeScript />
      <Box p={5} border="1px solid red">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<CreatePage />} />
        </Routes>
      </Box>
    </ChakraProvider>
  )
}

export default App
