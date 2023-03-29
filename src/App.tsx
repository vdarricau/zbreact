import { Box } from '@chakra-ui/react';
import Body from './Body';
import FooterComponent from './components/FooterComponent';
import NavComponent from './components/NavComponent';

function App() {
  return (
    <Box h="100vh" display="grid" gridTemplateRows="auto 1fr auto">
      <NavComponent />
      <Box className='App' overflowY="auto">
        <Body />
      </Box>
      <FooterComponent />
    </Box>
  )
}

export default App;
