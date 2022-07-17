import React, {createRef, useEffect} from 'react'
import * as cam from "@mediapipe/camera_utils"
import {Hands, HAND_CONNECTIONS} from "@mediapipe/hands/hands"
import * as draw from "@mediapipe/drawing_utils"
// import ben10 from "../ben10.jpg";
// import ring from "../nbaRing.png"

function HandDetection(props) {
    const videoRef = createRef(null);
    const canvasRef = createRef(null);
    const benRef = createRef(null);
    
    
    useEffect(()=>{
        const videoElement = videoRef.current
        const canvasElement = canvasRef.current
        const canvasCtx = canvasElement.getContext('2d');
        canvasRef.current.width = props.width;
        canvasRef.current.height = props.height;

        console.log(videoElement)
        function onResults(results) {
            canvasCtx.save();
            canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
            canvasCtx.drawImage(
                results.image, 0, 0, canvasElement.width, canvasElement.height);
            if (results.multiHandLandmarks) {
              for (const landmarks of results.multiHandLandmarks) {
              
                
                draw.drawConnectors(canvasCtx, landmarks,HAND_CONNECTIONS,
                               {color: '#00FF00', lineWidth: 5});
                draw.drawLandmarks(canvasCtx, landmarks, {color: '#FF0000', lineWidth: 2});
                // canvasCtx.save();
                
                // console.log(canvasElement.width)
                // // canvasCtx.drawImage(benRef.current, (landmarks[9].x)* canvasElement.width-30, (landmarks[9].y)* canvasElement.height, 80,80);
                // canvasCtx.drawImage(benRef.current, (landmarks[6].x)* canvasElement.width-10, (landmarks[6].y)* canvasElement.height, 30,30);
                // canvasCtx.restore();

              }
            }
            canvasCtx.restore();
          }
        const hands = new Hands({locateFile: (file) => {
            return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
          }});
         
    
        hands.setOptions({
            maxNumHands: 2,
            modelComplexity: 1,
            minDetectionConfidence: 0.5,
            minTrackingConfidence: 0.5
        });
        hands.onResults(onResults);
        
        const camera = new cam.Camera(videoElement, {
            onFrame: async () => {
              await hands.send({image: videoElement});
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
        {/* <img src={ring} ref={benRef} /> */}
    </div>
  )
}

export default HandDetection