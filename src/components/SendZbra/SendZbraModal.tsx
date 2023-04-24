import {
    Box,
    Modal,
    ModalCloseButton,
    ModalContent,
    ModalOverlay,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Friend from "../../@ts/Friend";
import FriendAvatarItem from "../Friend/FriendAvatarItem";
import ChooseKeyword from "./ChooseKeyword";
import PickFriend from "./PickFriend";

export default function SendZbraModal({
    isOpen,
    onClose,
}: {
    isOpen: boolean;
    onClose: () => void;
}) {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [friend, setFriend] = useState<Friend | null>(null);
    const [keywords, setKeywords] = useState<string[]>([]);
    const navigate = useNavigate();

    const sendZbra = async () => {
        // @TODO implement in backend
        setIsLoading(true);
        alert(`send zbra: mange moi le ${keywords.join(", ")} ici`);
        console.log(keywords);
        setFriend(null);
        setKeywords([]);
        navigate(`/zbros/${friend?.id}`);
        onClose();
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={() => {
                setFriend(null);
                setKeywords([]);
                onClose();
            }}
            isCentered
        >
            <ModalOverlay />
            <ModalContent h="80vh" maxW="90%" borderRadius="3xl">
                <ModalCloseButton />
                {null === friend ? (
                    <PickFriend setFriend={setFriend} />
                ) : (
                    <>
                        <Box
                            position="absolute"
                            top="-3rem"
                            left="50%"
                            transform="translateX(-50%)"
                        >
                            <FriendAvatarItem friend={friend} />
                        </Box>
                        <ChooseKeyword
                            keywords={keywords}
                            setKeywords={setKeywords}
                            sendZbra={sendZbra}
                            isLoading={isLoading}
                        />
                    </>
                )}
                {null !== friend}
            </ModalContent>
        </Modal>
    );
}
