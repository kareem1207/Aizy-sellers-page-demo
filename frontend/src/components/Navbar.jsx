import { Container, Flex, Box, Text, Link as ChakraLink, useColorMode, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Navbar = () => {
    const { colorMode, toggleColorMode } = useColorMode();

    return (
        <Box bg={colorMode === "light" ? "gray.100" : "gray.900"} color={colorMode === "light" ? "black" : "white"}>
            <Container maxW="container.xl" p={4}>
                <Flex h={16} justifyContent={"space-between"} alignItems={"center"}>
                    <Box fontWeight="bold" fontSize="xl">
                        Logo
                    </Box>
                    <Box>
                        <ChakraLink as={Link} to="/" mx={2}>
                            Home
                        </ChakraLink>
                        <ChakraLink as={Link} to="/create" mx={2}>
                            Create
                        </ChakraLink>
                        <Button onClick={toggleColorMode} mx={2}>
                            {colorMode === "light" ? "Dark" : "Light"} Mode
                        </Button>
                    </Box>
                </Flex>
            </Container>
        </Box>
    );
};

export default Navbar;