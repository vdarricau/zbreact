import { menuAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers, defineStyle } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(menuAnatomy.keys)

// define the base component styles
const baseStyle = definePartsStyle({
  list: {
    // this will style the MenuList component
    py: "4",
    borderRadius: "0 0 0 45px",
    border: "none",
    bg: "brand.900",
    bgGradient: "linear(to-b, brand.900, brand.100)",
  },
  item: {
    // this will style the MenuItem and MenuItemOption components
    px: "5",
    color: "white",
    fontWeight: "bold",
    fontSize: "xl",
    bg: "brand.900",
    _hover: {
      bg: "brand.600",
    },
    _focus: {
      bg: "brand.600",
    },
  },
});

// export the base styles in the component theme
export const menuTheme = defineMultiStyleConfig({ baseStyle })