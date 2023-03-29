import {
    Button, FormControl,
    FormLabel, Input, Modal, ModalBody,
    ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useToast
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Friend from "../@ts/Friend";
import useApi from "../hooks/useApi";

export default function SendZbraModal(
    { friend, isOpen, onOpen, onClose }:
    { friend: Friend|null, isOpen: boolean, onOpen: () => void, onClose: () => void }
) {
    const [ isLoading, setIsLoading ] = useState<boolean>(false);
    const { createZbraApi } = useApi();
    const toast = useToast();
    const navigate = useNavigate();

    const handleSubmitSendZbra = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        e.stopPropagation();

        setIsLoading(true);

        const target = e.target as typeof e.target & {
          friendId: { value: string };
          message: { value: string };
        };
        
        try {
            const response = await createZbraApi(target.friendId.value, target.message.value);

            onClose();
            toast({
                title: `!ZBRA!`,
                status: 'success'
            });
            navigate(`/zbros/${target.friendId.value}`);
        } catch (error) {

        }

        setIsLoading(false);
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Send Zbra to "{friend?.username}"</ModalHeader>
                <ModalCloseButton />

                <form method="post" onSubmit={handleSubmitSendZbra}>
                    <ModalBody>
                        <Input id="friendId" type="hidden" value={friend?.id} />
                        <FormControl isRequired>
                            <FormLabel>Zbra</FormLabel>
                            <Input id="message" placeholder='a-ZBRA-cada-ZBRA' defaultValue="a-ZBRA-cada-ZBRA" /> {/* TODO randomize this */}
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button 
                            variant="solid"
                            type="submit"
                            colorScheme="orange"
                            isLoading={isLoading}
                            mr="2"
                        >ZBRA!</Button>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </form>
            </ModalContent>
        </Modal>
    )
}