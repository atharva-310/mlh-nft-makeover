import React, {useState, useRef} from 'react';
import Deso from 'deso-protocol'
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
  GridItem,
  Button,
} from '@chakra-ui/react';
import './index.css'
import { Logo } from './Logo';
import { Navbar } from './components/Navbar';
import CreateNft from './components/createNft';
import HandDetection from "./components/handDetection"
import FaceDetection from "./components/faceDetection"
import { MakeUp } from './components/makeUp';
import PoseDetection from "./components/poseDectection" 
import HolisticDetection from './components/holistic';
function App() {
  const [userLoginInfo, setLoginInfo] = useState(null);
    const [isLoggedIn, setLogin] = useState(userLoginInfo === null ? false : true) 
    const [createNftON, setCreateNft] = useState(false)
    const [webCamON, setWebCam] = useState(false)
    const camBoxRef = useRef(null);
    const [tryingImages , setTrying] = useState({
      headWear: "",
      eyeWear: "",
      faceCover: ""
    })
    console.log(tryingImages)
    const deso = new Deso();
    async function  login(){
        const request = 3;
        const response = await deso.identity.login(request);
        setLoginInfo({...response})
        setLogin(true)
        console.log(userLoginInfo);
    }
   
    async function logout(){
        
        const response = await deso.identity.logout(userLoginInfo.key);
        if(response)
            setLogin(false);
        setLoginInfo(null);
      
    }
  
  
  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
      <Navbar {...{isLoggedIn, login, logout,setCreateNft, createNftON}} />
      
      <Box
        display="flex"
        flexWrap="wrap"
        justifyContent="center"
      >

        <Box
          width={["90vw","90vw","90vw", "60vw", "60vw", "60vw"]}
          maxWidth="1024px"
          height={["300px", "400px","500px","570px"]}
          borderRadius="20px"
          mt="40px"
          mx={["auto","auto","40px"]}
          bg="#141414"
          ref={camBoxRef}
        >
          
          {webCamON && <FaceDetection tryingImages={tryingImages} width={camBoxRef.current.clientWidth} height={camBoxRef.current.clientHeight} />}
          
          {/* {webCamActive && <WebCam width={camBoxRef.current.offsetWidth} height={camBoxRef.current.offsetHeight} />} */}
        </Box>
        <Box width={["90vw","90vw","90vw", "90vw", "30vw", "30vw", "30vw"]}
          height="500px"
          borderRadius="20px"
          mt="40px"
          mx={["auto","auto","10px"]}
        >
          {createNftON ? <CreateNft {...{isLoggedIn,userLoginInfo}} /> : 
            <>
              <Button width="100%" colorScheme={`${webCamON ? "red" : "green"}`} fontSize="50px"height="70px" onClick={()=> {setWebCam(prevState => !prevState)}}>
              {webCamON ? "stop" : "start"}
            </Button>
              <MakeUp url={tryingImages} changeUrl={setTrying} />
            </>
          }
          
        </Box>
      
      </Box>
      
      </Box>
    </ChakraProvider>
  );
}

export default App;
