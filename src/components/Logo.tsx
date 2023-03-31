import { Image, ImageProps, useColorMode } from '@chakra-ui/react';
import zbraLogo from '../assets/images/zbra_logo.png';
import zbraLogoDark from '../assets/images/zbra_logo_dark.png';

export default function Logo(props: ImageProps) {
    const { colorMode } = useColorMode();

    let logo = zbraLogo;

    if (colorMode === 'dark') {
        logo = zbraLogoDark; 
    }

    return <Image src={logo} {...props} />
}