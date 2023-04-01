import { Button, ButtonProps } from "@chakra-ui/react";
import { ReactNode } from "react";
import { Link } from "react-router-dom";

export const NavLink = ({ children, link }: { children: ReactNode, link: string }) => (
    <Link to={link}>
      <NavMenuButton
        rounded="full"
        bg="white"
        color="brand.900"
        _hover={{
          textDecoration: "none",
          bg: "gray.300",
        }}
      >
        {children}
      </NavMenuButton>
    </Link>
  );

export const NavMenuButton = (props: ButtonProps) => {
    return (
    <Button 
        rounded="full"
        bg="white"
        color="brand.900"
        p="0"
        size="sm"
        _hover={{
            textDecoration: "none",
            bg: "gray.300",
        }}
        {...props}
    >
        {props.children}
    </Button>
    )
}