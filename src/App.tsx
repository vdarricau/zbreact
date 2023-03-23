import { Box } from '@chakra-ui/react';
import Body from './Body';
import FooterComponent from './components/FooterComponent';
import NavComponent from './components/NavComponent';

function App() {
  return (
    <>
      <NavComponent />
      <Box className='App' minHeight={{ 'md': 'calc(100vh - 145px)', 'base': 'calc(100vh - 185px)' }}>
        <Body />
      </Box>
      <FooterComponent />
    </>
  )
}

export default App;
