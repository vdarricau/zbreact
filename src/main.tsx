import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'
import type { StyleFunctionProps } from '@chakra-ui/styled-system'

import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en.json'
import React from 'react'
import { AuthProvider } from 'react-auth-kit'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './assets/css/App.scss'
import { menuTheme } from './theme/Menu'

TimeAgo.addDefaultLocale(en)

const theme = extendTheme({
  initialColorMode: 'dark',
  useSystemColorMode: true,
  fonts: {
    heading: "Poppins",
    body: "Poppins",
  },
  colors: {
    lightBlue: '#EEF7FF',
    dark: '#1B1F30',
    brand: {
      100: '#7E94D9',
      200: '#9F85FF',
      300: '#9F85FF',
      400: '#8768F7',
      500: '#8768F7',
      600: '#8768F7',
      700: '#6850BF',
      800: '#6850BF',
      900: '#6850BF',
    }
  },
  styles: {
    global: (props: StyleFunctionProps) => ({
      body: {
        fontFamily: 'body',
        color: mode('brand.800', 'white')(props),
        bg: mode('white', 'dark')(props),
        lineHeight: 'base',
      },
    }),
  },
  components: {
    Button: {
      variants: {
        gradient: {
          bgGradient: 'linear(to-r, brand.100, brand.600)',
          color: 'white',
          borderRadius: '3xl',
          py: '6',
          _hover: {
            bgGradient: 'linear(to-r, brand.600, brand.900)',
          }
        }
      }
    },
    Menu: menuTheme,
  }
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider
      authType = {'cookie'}
      authName={'_auth'}
      cookieDomain={window.location.hostname}
      cookieSecure={window.location.protocol === "https:"}
    >
      <ChakraProvider theme={theme}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ChakraProvider>
    </AuthProvider>
  </React.StrictMode>,
)
