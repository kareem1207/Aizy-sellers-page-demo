import { Container, FormControl, FormLabel, Input, Button, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { useProductStore } from "../store/product";

const CreatePage = () => {
    const [newProduct , setNewProduct] = useState({
        name: "",
        price: 0,
        image: "",
    })
    const {createProduct} = useProductStore();
    const toast = useToast();

    const handleCreateProduct = async () => {
        const {success, message} = await createProduct(newProduct)
            toast({
                title: message,
                status: success ? "success" : "error",
                isClosable: true,
            });
            setNewProduct({
                name: "",
                price: 0,
                image: "",
            })
    }
  return <>
  <Container>
    <FormControl id="name" mb={4}>
        <FormLabel>Product Name</FormLabel>
        <Input 
            type="text" 
            value={newProduct.name} 
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} 
        />
    </FormControl>
    <FormControl id="price" mb={4}>
        <FormLabel>Product Price</FormLabel>
        <Input 
            type="number" 
            value={newProduct.price} 
            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} 
        />
    </FormControl>
    <FormControl id="image" mb={4}>
        <FormLabel>Product Image URL</FormLabel>
        <Input 
            type="text" 
            value={newProduct.image} 
            onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })} 
        />
    </FormControl>
    <Button colorScheme="teal" onClick={() => handleCreateProduct()}>
        Create Product
    </Button>
  </Container>
  </>
}

export default CreatePage