import { Box, Button, Center,Link, Heading,Image, Text,useColorMode } from '@chakra-ui/react'
import { makeUseVisualState } from 'framer-motion'
import React from 'react'
import carnival from "../images/carnival-mask.png"

export const ProductCard = (props) => {
    const {colorMode} = useColorMode()
    console.log(props)
  return (
    <Box 
        border={`5px solid ${colorMode === "light" ? "black": "white"}`}
        borderRadius="20px"
        mx="20px"
        width="300px"
        minW="300px"
        height="400px"
        display="flex"
        flexDirection="column"
    >
        <Heading size="lg"mt="8px">
        {props.title}
        </Heading>
        <Center>
            <Image
                width="90%"
                mt="15px"
                height="220px"
                bg="white"
                borderRadius="10px"
                objectFit="contain"
                src={props.imageUrl} 
            />
        </Center>
        <Text textAlign="left"m="8px" ml="18px">Created By: Mr. X</Text>
        <Box
            display="flex"
            justifyContent="space-evenly"
        >
            
            <Link 
            width="40%"
            href={`https://diamondapp.com/posts/${props.postId}`} isExternal>
            <Button 
                width="90%"
                variant="solid"
                colorScheme="yellow"
                
            >
                Get Post  
            </Button>
            </Link>
            
            <Button
                 width="40%"
                 variant="solid"
                 colorScheme="teal"
                 onClick={()=>{
                    props.changeUrl(prevState =>{
                        return {
                            ...prevState,
                            [props.type]: props.imageUrl
                        }
                    })
                 }}
            >
                Try This
            </Button>
        </Box>

    </Box>
  )
}
