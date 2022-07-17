import React, {createRef, useEffect} from 'react'
import * as cam from "@mediapipe/camera_utils"
import {FaceMesh, FACEMESH_TESSELATION, FACEMESH_RIGHT_EYE,FACEMESH_RIGHT_EYEBROW, FACEMESH_RIGHT_IRIS , FACEMESH_LEFT_EYE, FACEMESH_LEFT_EYEBROW, FACEMESH_LEFT_IRIS , FACEMESH_FACE_OVAL, FACEMESH_LIPS } from "@mediapipe/face_mesh/face_mesh"
import * as draw from "@mediapipe/drawing_utils"

// import ben10 from "../ben10.jpg";
// import ring from "../nbaRing.png"

function FaceDetection(props) {
    const videoRef = createRef(null);
    const canvasRef = createRef(null);
    const eyeRef = createRef(null);
    const headRef= createRef(null);
    
    useEffect(()=>{
        const videoElement = videoRef.current
        const canvasElement = canvasRef.current
        const canvasCtx = canvasElement.getContext('2d');
        canvasRef.current.width = props.width;
        canvasRef.current.height = props.height;
        console.table(FACEMESH_LEFT_EYE)
        console.log(videoElement)
       
        
        function onResults(results) {
            canvasCtx.save();
            canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
            canvasCtx.drawImage(
                results.image, 0, 0, canvasElement.width, canvasElement.height);
            if (results.multiFaceLandmarks) {
              for (const landmarks of results.multiFaceLandmarks) {
              
                
                // draw.drawConnectors(canvasCtx, landmarks, FACEMESH_TESSELATION,
                //   {color: '#C0C0C070', lineWidth: 1});
                // draw.drawConnectors(canvasCtx, landmarks, FACEMESH_RIGHT_EYE, {color: '#FF3030'});
                // draw.drawConnectors(canvasCtx, landmarks, FACEMESH_RIGHT_EYEBROW, {color: '#FF3030'});
                // draw.drawConnectors(canvasCtx, landmarks, FACEMESH_RIGHT_IRIS, {color: '#FF3030'});
                // draw.drawConnectors(canvasCtx, landmarks, FACEMESH_LEFT_EYE, {color: '#30FF30'});
                // draw.drawConnectors(canvasCtx, landmarks, FACEMESH_LEFT_EYEBROW, {color: '#30FF30'});
                // draw.drawConnectors(canvasCtx, landmarks, FACEMESH_LEFT_IRIS, {color: '#30FF30'});
                // draw.drawConnectors(canvasCtx, landmarks, FACEMESH_FACE_OVAL, {color: '#E0E0E0'});
                // draw.drawConnectors(canvasCtx, landmarks, FACEMESH_LIPS, {color: '#E0E0E0'});
                // draw.drawLandmarks(canvasCtx, FACEMESH_FACE_OVAL, {
                //   color: 'red',
                //   radius: 5,
                // });
                canvasCtx.save();
                // canvasCtx.drawImage(eyeRef.current, (landmarks[284].x)* canvasElement.width +10,( (landmarks[10].y)*canvasElement.height)-40,((landmarks[156].x-landmarks[383].x)*canvasElement.width)-30 ,130);
                // glasses
                canvasCtx.drawImage(eyeRef.current, (landmarks[284].x)* canvasElement.width +18,( (landmarks[152].y)*canvasElement.height)-40,((landmarks[156].x-landmarks[383].x)*canvasElement.width)-40 ,(landmarks[296].y-landmarks[295].y)*canvasElement.height*28);

                //crown 
                canvasCtx.drawImage(headRef.current, (landmarks[284].x)* canvasElement.width +38,( (landmarks[197].y)*canvasElement.height)-35,((landmarks[156].x-landmarks[383].x)*canvasElement.width)-80 ,(landmarks[296].y-landmarks[295].y)*canvasElement.height*35);
                // canvasCtx.drawImage(eyeRef.current, (landmarks[6].x)* canvasElement.width-10, (landmarks[6].y)* canvasElement.height, 30,30);
                canvasCtx.restore();

              }
            }
            canvasCtx.restore();
          }
        const faceMesh = new FaceMesh({locateFile: (file) => {
            return `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`;
          }});
         
    
          faceMesh.setOptions({
            maxNumHands: 2,
            modelComplexity: 1,
            minDetectionConfidence: 0.5,
            minTrackingConfidence: 0.5
        });
        faceMesh.onResults(onResults);
        
        const camera = new cam.Camera(videoElement, {
            onFrame: async () => {
              await faceMesh.send({image: videoElement});
            },
            width: props.width,
            height: props.height
          });
          camera.start();

    },[])
  return (
    <div>
       
      
        <video className="input_video "  ref={videoRef}  style={{borderRadius : "10px", display: 'none'} }>
        </video>
        <canvas
            p="20px"
            ref={canvasRef}
            style={{borderRadius : "20px" }}
        >

        </canvas>
        {/* <img src={ben10}  /> */}
        <img src={props.tryingImages.eyeWear} ref={eyeRef}  />
        <img src={props.tryingImages.headWear} ref={headRef}  />
    </div>
  )
}

export default FaceDetection