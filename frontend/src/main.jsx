import { StrictMode } from 'react'
import { ChakraProvider, extendTheme } from "@chakra-ui/react"
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom"

// Define a simple theme
const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: "white",
        color: "black",
      }
    }
  }
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </BrowserRouter>
  </StrictMode>
)
