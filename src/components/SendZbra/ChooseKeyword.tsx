import {
    Box,
    Button,
    ButtonProps,
    Grid,
    Heading,
    ModalBody,
    ModalFooter,
    Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";
import SearchInput from "./SearchInput";

/* @TODO send this list from backend */
const keywordsList = [
    "anniversaire",
    "chipos",
    "lolmdr",
    "warkwick",
    "zbra",
    "zbro",
];

export default function ChooseKeyword({
    isLoading,
    keywords,
    setKeywords,
    sendZbra,
}: {
    isLoading: boolean;
    keywords: string[];
    setKeywords: (keywords: string[]) => void;
    sendZbra: () => void;
}) {
    const [search, setSearch] = useState("");

    const toggleKeyword = (newKeyword: string) => {
        if (keywords.includes(newKeyword)) {
            setKeywords(
                keywords.filter((keyword) => {
                    return keyword !== newKeyword;
                })
            );
        } else {
            setKeywords([newKeyword]);
        }
    };

    return (
        <>
            <ModalBody h="calc(100% - 56px)">
                <Grid h="100%" gridTemplateRows="auto 1fr 6.37875rem">
                    <Box mt="4rem" textAlign="center">
                        <Heading size="lg">Keyword your zbra</Heading>
                        <Text fontSize="xs">
                            Your message and gif will be based on that keyword
                        </Text>
                        <Box mt="2rem">
                            <SearchInput
                                search={search}
                                setSearch={setSearch}
                            />
                        </Box>
                    </Box>
                    <Box mt="6" overflow="scroll">
                        {keywordsList
                            .filter((keyword: string) =>
                                keyword.includes(search)
                            )
                            .map((keyword: string) => {
                                return (
                                    <KeywordButton
                                        isActive={keywords.includes(keyword)}
                                        onClick={() => toggleKeyword(keyword)}
                                    >
                                        #{keyword}
                                    </KeywordButton>
                                );
                            })}
                    </Box>
                    {0 !== keywords.length && (
                        <Box p="5">
                            <Heading fontSize="md" pb="2">
                                Keyword:
                            </Heading>
                            {keywords.map((keyword: string) => {
                                return (
                                    <KeywordButton
                                        fontSize="sm"
                                        py="1"
                                        h="1.8rem"
                                        borderRadius="lg"
                                        isActive={keywords.includes(keyword)}
                                        onClick={() => toggleKeyword(keyword)}
                                    >
                                        #{keyword}
                                    </KeywordButton>
                                );
                            })}
                        </Box>
                    )}
                </Grid>
            </ModalBody>
            <ModalFooter p="0">
                <Button
                    isLoading={isLoading}
                    isDisabled={keywords.length === 0}
                    onClick={sendZbra}
                    w="100%"
                    h="3.5rem"
                    colorScheme="brand"
                    bg="brand.900"
                    borderRadius="1px 1px var(--chakra-radii-3xl) var(--chakra-radii-3xl)"
                    fontSize="2xl"
                    fontWeight="bold"
                    justifyContent="space-between"
                    px="7"
                >
                    <Text>Zbra !</Text>
                    <FaPaperPlane size="25" />
                </Button>
            </ModalFooter>
        </>
    );
}

const KeywordButton = (props: ButtonProps) => {
    return (
        <Button
            fontSize="2xl"
            fontWeight="bold"
            bg="none"
            px="1"
            py="2"
            m="0.5"
            borderRadius="xl"
            _active={{
                bg: "brand.900 !important",
                color: "white",
            }}
            _hover={{ bg: "none" }}
            {...props}
        >
            {props.children}
        </Button>
    );
};
