import { Box } from '@chakra-ui/react';
import Body from './Body';
import NavComponent from './components/Nav/NavComponent';

// import FooterComponent from './components/FooterComponent';

function App() {
  return (
    <Box h="100vh" display="grid" gridTemplateRows="auto 1fr">
      <NavComponent />
      <Box className='App' overflowY="auto" h="100%">
        <Body />
      </Box>
      {/* <FooterComponent /> */}
    </Box>
  )
}

export default App;
