import {
  Box,
  FormControl, FormErrorMessage, FormLabel,
  IconButton,
  Input, InputGroup, InputRightElement,
  useDisclosure
} from '@chakra-ui/react'
import { useRef } from 'react'
import { HiEye, HiEyeOff } from 'react-icons/hi'

const PasswordField = ({ error } : { error: Array<string> }) => {
  const { isOpen, onToggle } = useDisclosure()
  const inputRef = useRef<HTMLInputElement>(null)
  const onClickReveal = () => {
    onToggle()
    if (inputRef.current) {
      inputRef.current.focus({ preventScroll: true })
    }
  }

  return (
    <FormControl isInvalid={error.length !== 0}>
      <InputGroup>
        <InputRightElement>
          <IconButton
            variant="link"
            aria-label={isOpen ? 'Mask password' : 'Reveal password'}
            icon={isOpen ? <HiEyeOff /> : <HiEye />}
            onClick={onClickReveal}
            tabIndex={-1}
          />
        </InputRightElement>
        <Input
          py="6"
          px="5"
          id="password"
          name="password"
          placeholder="Password"
          ref={inputRef}
          type={isOpen ? 'text' : 'password'}
          autoComplete="current-password"
          defaultValue=""
          minLength={8}
          required
        />
      </InputGroup>
      <FormErrorMessage display="block">
          { error.map((error) => <Box pt={1}>{error}</Box>) }
      </FormErrorMessage>
    </FormControl>
  )
}

PasswordField.defaultProps = {
  error: [],
}

export default PasswordField;