
import React, {useState} from 'react'
import validator from 'validator'
import {
    Box,
    Center,
    useColorModeValue,
    Heading,
    Text,
    Stack,
    Image,
    Button
  } from '@chakra-ui/react';
  import Deso from 'deso-protocol'
 
  


export default function CreateNft(props) {
    const deso = new Deso();
  

    const [formData, setFormData] = useState(
        {
            title: "",
            description: "",
            imageUrl: " Upload Image"
        }
    );
    const [postData, setPostData] = useState(null)
    async function daoCoins(){
        const request = {
            "UpdaterPublicKeyBase58Check": props.userLoginInfo.key,
            "ProfilePublicKeyBase58CheckOrUsername": "Atharva310",
            "OperationType": "mint",
            "CoinsToMintNanos": "0x3B9ACA00",
            "MinFeeRateNanosPerKB": 1
          };
           const response = await deso.dao.DAOCoin(request);
           console.log(response)

    }
    async function createNft(){

    }
    async function createPost(){
        console.log(validator.isURL(formData.imageUrl))
        if (!validator.isURL(formData.imageUrl) || formData.title === "" || formData.description === "") {
            window.alert("Fill all form fields")
            return;
          } else{
            const request = {
                "UpdaterPublicKeyBase58Check": props.userLoginInfo.key,
                "BodyObj": {
                  "Body": "" ,
                  "VideoURLs": [],
                  "ImageURLs": [formData.imageUrl]
                },
               

              };
               const response = await deso.posts.submitPost(request);
               console.log(response)

          }
    }
    async function uploadImage(userLoginInfo){
        
        const request = await {
            "UserPublicKeyBase58Check": userLoginInfo.key
          };
        const response = await deso.media.uploadImage(request);
        return response.ImageURL;
        
    }
    console.log(props)

    function handleChange(e){
        console.log(formData)
        const name = e.target.name;
        setFormData(pervState =>{
            return {
                ...pervState,
                [name] : e.target.value

            }
        })
    }

  return (
    <>
  
    
    
        <Center py={12} pt="0" >
            
        <Box
            border="1px solid white"
            role={'group'}
            p={6}
            maxW={'430px'}
            w={'full'}
            bg={useColorModeValue('white', 'gray.800')}
            boxShadow={'2xl'}
            rounded={'lg'}
            pos={'relative'}
            zIndex={1}>
            <Box
            rounded={'lg'}
            mt={-12}
            pos={'relative'}
            height={'230px'}
            _after={{
                transition: 'all .3s ease',
                content: '""',
                w: 'full',
                h: 'full',
                pos: 'absolute',
                top: 14,
                left: 0,
                backgroundImage: `url(${formData.imageUrl ===  " Upload Image"?" ": formData.imageUrl})`,
                backgroundPosition: "center center",
                backgroundSize: "fit",
                filter: 'blur(15px)',
                zIndex: -1,
            }}
            _groupHover={{
                _after: {
                filter: 'blur(20px)',
                },
            }}>
            <Center pt="0" mt="0">
         
         
            {formData.imageUrl ===  " Upload Image"?
                <Heading mt="80px">
                    Upload the Image to See preview
                </Heading>
            :
                <Image
                rounded={'lg'}
                mt="40px"
                height={230}
                alt="Upload the Image to See preview"
                width="90%"
                objectFit={'contain'}
                background="white"
                src={formData.imageUrl}
            />
            }
            </Center>
            </Box>
            <Stack pt={10} align="left" mt="50px" >
            <label align="left" >
                <Text as="h3" fontSize="25px" fontWeight="600" fontFamily="monospace" > NFT Title</Text>
    
                <input 
                    name='title'
                    onChange={handleChange}
                    style={{border: "2px solid black", borderRadius: "5px", width:"60%"}} 
                />
            </label>
            <label align="left" >
                <Text as="h3" fontSize="24px" fontWeight="600" fontFamily="monospace" > NFT description</Text>
    
                <textarea 
                    name='description'
                    onChange={handleChange}
                    style={{border: "2px solid black", borderRadius: "5px", width:"95%"}} 
                />
            </label>
            <label align="left" >
                <Text as="h3" fontSize="24px" fontWeight="600" fontFamily="monospace" > Image Url</Text>
    
                <input 
                    disabled
                    name='imageUrl'
                
                    value={formData.imageUrl}
                    onChange={handleChange}
                    style={{border: "2px solid black", borderRadius: "5px", width:"100%"}} 
                />
            </label>
            
            <Button
                fontWeight="700"
                colorScheme="red"
                onClick={async()=> {
                    if(!props.isLoggedIn){
                        window.alert("Login to Upload Images")
                    }else {
                        const url = await uploadImage(props.userLoginInfo);
                        setFormData(pervState =>{
                            return {
                                ...pervState,
                                "imageUrl" : url
                
                            }
                        })

                    }
                }}
            >
                Uplaod Image
            </Button>
            <Button
                size="lg"
                fontSize="30px"
                fontWeight="700"
                colorScheme="green"
                onClick={createPost}
            >
            Create NFT 
            </Button>
            <Button
                size="lg"
                fontSize="30px"
                fontWeight="700"
                colorScheme="green"
                onClick={daoCoins}
            >
                Mint Coins 
            </Button>
            {/* <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500}>
                Nice Chair, pink
            </Heading>
            <Stack direction={'row'} align={'center'}>
                <Text fontWeight={800} fontSize={'xl'}>
                $57
                </Text>
                <Text textDecoration={'line-through'} color={'gray.600'}>
                $199
                </Text>
            </Stack> */}
            </Stack>
        </Box>
        </Center>
    
    

    </>
  )
}
