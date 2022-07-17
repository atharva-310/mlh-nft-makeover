import React, {createRef, useEffect} from 'react'
import * as cam from "@mediapipe/camera_utils"
import {Holistic , POSE_CONNECTIONS, FACEMESH_TESSELATION, HAND_CONNECTIONS } from "@mediapipe/holistic/holistic"
import * as draw from "@mediapipe/drawing_utils"
// import specs from "../images/carnival-mask.png"
import specs from "../images/crown.png"
// import ben10 from "../ben10.jpg";
// import ring from "../nbaRing.png"

function HolisticDetection(props) {
    const videoRef = createRef(null);
    const canvasRef = createRef(null);
    const benRef = createRef(null);
    
    
    useEffect(()=>{
        const videoElement = videoRef.current
        const canvasElement = canvasRef.current
        const canvasCtx = canvasElement.getContext('2d');
        canvasRef.current.width = props.width;
        canvasRef.current.height = props.height;
      
      
       
        
        function onResults(results) {
          canvasCtx.save();
          canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
          canvasCtx.drawImage(results.segmentationMask, 0, 0,
                              canvasElement.width, canvasElement.height);
        
          // Only overwrite existing pixels.
          canvasCtx.globalCompositeOperation = 'source-in';
          canvasCtx.fillStyle = '#00FF00';
          canvasCtx.fillRect(0, 0, canvasElement.width, canvasElement.height);
        
          // Only overwrite missing pixels.
          canvasCtx.globalCompositeOperation = 'destination-atop';
          canvasCtx.drawImage(
              results.image, 0, 0, canvasElement.width, canvasElement.height);
        
          canvasCtx.globalCompositeOperation = 'source-over';
          draw.drawConnectors(canvasCtx, results.poseLandmarks, POSE_CONNECTIONS,
                         {color: '#00FF00', lineWidth: 4});
          draw.drawLandmarks(canvasCtx, results.poseLandmarks,
                        {color: '#FF0000', lineWidth: 2});
          draw.drawConnectors(canvasCtx, results.faceLandmarks, FACEMESH_TESSELATION,
                         {color: '#C0C0C070', lineWidth: 1});
          draw.drawConnectors(canvasCtx, results.leftHandLandmarks, HAND_CONNECTIONS,
                         {color: '#CC0000', lineWidth: 5});
          draw.drawLandmarks(canvasCtx, results.leftHandLandmarks,
                        {color: '#00FF00', lineWidth: 2});
          draw.drawConnectors(canvasCtx, results.rightHandLandmarks, HAND_CONNECTIONS,
                         {color: '#00CC00', lineWidth: 5});
          draw.drawLandmarks(canvasCtx, results.rightHandLandmarks,
                        {color: '#FF0000', lineWidth: 2});
          canvasCtx.restore();
        }
        const holistic = new Holistic({locateFile: (file) => {
          return `https://cdn.jsdelivr.net/npm/@mediapipe/holistic@0.1/${file}`;
        }});
    
          holistic.setOptions({
            modelComplexity: 1,
            smoothLandmarks: true,
            enableSegmentation: true,
            smoothSegmentation: true,
            refineFaceLandmarks: true,
            minDetectionConfidence: 0.5,
            minTrackingConfidence: 0.5
          });
          holistic.onResults(onResults);
        
        const camera = new cam.Camera(videoElement, {
            onFrame: async () => {
              await holistic.send({image: videoElement});
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
        <img src={specs} ref={benRef} />
    </div>
  )
}

export default HolisticDetection