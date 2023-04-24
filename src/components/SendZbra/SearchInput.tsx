import { Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";

export default function SearchInput({
    search,
    setSearch,
}: {
    search: string;
    setSearch: (search: string) => void;
}) {
    return (
        <InputGroup>
            <Input
                id="search"
                name="search"
                type="text"
                placeholder="Start typing to filter..."
                className="edy-input"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <InputRightElement h="100%">
                <FaSearch size="18" />
            </InputRightElement>
        </InputGroup>
    );
}
