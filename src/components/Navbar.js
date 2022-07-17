import { Box, Button, Heading } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import { ColorModeSwitcher } from '../ColorModeSwitcher';
import "../styles/Navbar.css"
import useIdentity from '../backend/indentity';
import Deso from 'deso-protocol'
export const Navbar = (props) => {
    
  return (
    <nav>
        <Box 
            display="flex"                     
            justifyContent="space-between"
            bg="black"
            height="70px"
            width='100vw'
            px="200px"
            alignItems="center"
        >
           
             <h1 className="art-heading"> N.F.T Makeover Studio </h1>
            
        <Box
            display="flex"
            justifyContent="space-between"
        >
            <Button
                size="xl"
                p="3px"
                width="140px"
                mx="20px"
                colorScheme={!props.createNftON ? "whatsapp" : "red"}
                onClick={()=>{props.setCreateNft(prevState => !prevState)}}
            >
                {!props.createNftON ? "Create NFT": "Stop Creating"}
            </Button>
            <Button
                variant="solid"
                size="xl"
                p="3px"
                width="100px"
                onClick={props.isLoggedIn ? props.logout: props.login}
            >
                {props.isLoggedIn ? "Logout" : "Login" }
            </Button>
            
        
            <ColorModeSwitcher justifySelf="flex-end" color="white" />
        </Box>
        </Box>
          
    </nav>
  )
}
