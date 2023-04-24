import { Box, Button, Heading, ModalBody, ModalFooter } from "@chakra-ui/react";
import { useState } from "react";
import SearchInput from "./SearchInput";

/* @TODO send this list from backend */
const keywordsList = [
    "anniversaire",
    "anus",
    "alkapote",
    "bite",
    "cul",
    "pute",
    "salope",
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

            return;
        }

        setKeywords([...keywords, newKeyword]);
    };

    return (
        <>
            <ModalBody>
                <Heading size="lg" mt="4rem" mb="5" textAlign="center">
                    Pick a zbro !
                </Heading>
                <SearchInput search={search} setSearch={setSearch} />
                <Box mt="5">
                    {keywordsList
                        .filter((keyword: string) => keyword.includes(search))
                        .map((keyword: string) => {
                            return (
                                <Button
                                    key={keyword}
                                    isActive={keywords.includes(keyword)}
                                    onClick={() => {
                                        toggleKeyword(keyword);
                                    }}
                                >
                                    #{keyword}
                                </Button>
                            );
                        })}
                </Box>
            </ModalBody>
            <ModalFooter>
                <Button
                    isLoading={isLoading}
                    isDisabled={keywords.length === 0}
                    onClick={sendZbra}
                    w="100%"
                    colorScheme="brand"
                >
                    Zbra!
                </Button>
            </ModalFooter>
        </>
    );
}
