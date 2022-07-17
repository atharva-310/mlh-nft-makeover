import React, { useEffect, useState } from 'react'
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box
} from '@chakra-ui/react'
import { ProductCard } from './productCard'
import {headWearPosts} from "../data/headWearPosts"
import {eyeWearPosts} from "../data/eyeWear"
import Deso from 'deso-protocol';


export const MakeUp = ({changeUrl}) => {
  const deso = new Deso();


  async function getPostInfo(post){
    const request = {
      "PostHashHex": post
    };
     const response = await deso.posts.getSinglePost(request);
    //  console.log(response)

     return response;
  }
  // getPostInfo("d801f95913dfc1a5016619aeaf28d16434cb9c22ed5462c164614a67b7275f83").then(res => console.log(res))
  const HeadWearCardList = headWearPosts.map( (post)=>{
      // console.log(post)
      return (
        <ProductCard
          type="headWear"
          title={post.Body}
          imageUrl={post.ImageURLs[0]}
          changeUrl={changeUrl}
        />
      )
  })
  const EyeWearList = eyeWearPosts.map( (post)=>{
    // console.log(post)
    return (
      <ProductCard
        type="eyeWear"
        title={post.Body}
        imageUrl={post.ImageURLs[0]}
        changeUrl={changeUrl}
      />
    )
})

 



  return (
    <Accordion width="100%">
  <AccordionItem>
    <h2>
      <AccordionButton>
        <Box flex='1' textAlign='left'fontSize="40px">
           Headwear
        </Box>
        <AccordionIcon />
      </AccordionButton>
    </h2>
    <AccordionPanel pb={4}>
      <Box 
      overflowX="scroll"
      display="flex"
      >
      {HeadWearCardList}
      </Box>
    </AccordionPanel>
  </AccordionItem>

  <AccordionItem>
    <h2>
      <AccordionButton>
        <Box flex='1' textAlign='left' fontSize="40px">
            Eyewear
        </Box>
        <AccordionIcon />
      </AccordionButton>
    </h2>
    <AccordionPanel pb={4}>
    <Box 
      overflowX="scroll"
      display="flex"
      >
      {EyeWearList}
      </Box>
    </AccordionPanel>
  </AccordionItem>
 
</Accordion>
  )
}
