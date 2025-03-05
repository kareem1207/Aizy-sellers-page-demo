import { Box, FormControl, FormLabel, Heading, Button, HStack, Input, SimpleGrid, Text, useDisclosure, useToast, IconButton, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useProductStore } from "../store/product";
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';

const HomePage = () => {
  const { fetchProducts, products, deleteProduct, updateProduct } = useProductStore();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [currentProduct, setCurrentProduct] = useState(null);
  
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleOpenUpdateModal = (product) => {
    setCurrentProduct({...product}); // Create a copy of the product
    onOpen();
  };
  
  const handleUpdateProduct = async() => {
    if (!currentProduct) return;
    
    const { success, message } = await updateProduct(currentProduct._id, currentProduct);
    
    toast({
      title: success ? "Product updated" : message || "Update failed",
      status: success ? "success" : "error",
      isClosable: true,
    });
    
    onClose();

  };
  
  const handleDelete = async(id) => {
    const { success, message } = await deleteProduct(id);
    toast({
      title: message,
      status: success ? "success" : "error",
      isClosable: true,
    });
  };

  return (
    <Box p={5}>
      <Box maxW="container.md" mx="auto">
        <Heading as="h1" size="xl" mb={4}>
          Welcome to the Home Page
        </Heading>
        {products.length === 0 && (
          <Text fontSize="lg">
            No products found 😢{" "}
            <Link to="/create">
              <Text as="span" fontWeight="bold" color="teal.500">
                Create a new product
              </Text>
            </Link>
          </Text>
        )}
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10} mt={10} w={"full"}>
          {products.map((product) => (
            <Box key={product._id} p={5} shadow="md" borderWidth="1px">
              <Text fontSize="xl">{product.name}</Text>
              <Text mt={4}>Price: ${product.price}</Text>
              <img src={product.image} alt={product.name} />
              <HStack spacing={4} mt={4}>
                <IconButton
                  aria-label="Edit product"
                  icon={<EditIcon />}
                  onClick={() => handleOpenUpdateModal(product)}
                />
                <IconButton
                  aria-label="Delete product"
                  icon={<DeleteIcon />}
                  onClick={() => handleDelete(product._id)}
                />
              </HStack>
            </Box>
          ))}
        </SimpleGrid>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {currentProduct && (
              <>
                <FormControl>
                  <FormLabel>Product Name</FormLabel>
                  <Input 
                    placeholder='Product Name' 
                    value={currentProduct.name || ''} 
                    onChange={(e) => setCurrentProduct({...currentProduct, name: e.target.value})}
                  />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Product Price</FormLabel>
                  <Input 
                    placeholder='Product Price' 
                    value={currentProduct.price || ''} 
                    onChange={(e) => setCurrentProduct({...currentProduct, price: e.target.value})}
                  />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Product Image URL</FormLabel>
                  <Input 
                    placeholder='Product Image URL' 
                    value={currentProduct.image || ''} 
                    onChange={(e) => setCurrentProduct({...currentProduct, image: e.target.value})}
                  />
                </FormControl>
              </>
            )}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={handleUpdateProduct}>
              Update
            </Button>
            <Button variant='ghost' onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default HomePage;