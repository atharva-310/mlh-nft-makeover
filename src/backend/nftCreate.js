import { useState } from "react";
import Deso from 'deso-protocol';
import useIdentity from "./indentity";
function useNftCreate(){
    const deso = new Deso();
    const  {userPK, isLoggedIn, login, userLoginInfo} = useIdentity();

    
    async function uploadImage(){
        
        const request = {
            "UserPublicKeyBase58Check": userLoginInfo.key
            };
        const response = await  deso.media.uploadImage(request)
        console.log(response);

        
    }

    return {uploadImage}
}


export default  useNftCreate;