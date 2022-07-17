import React, {createRef, useEffect} from 'react'
import * as cam from "@mediapipe/camera_utils"
import {Pose, POSE_CONNECTIONS} from "@mediapipe/pose/pose"
import {LandmarkGrid} from '@mediapipe/control_utils/control_utils';
import * as draw from "@mediapipe/drawing_utils"
import specs from "../images/carnival-mask.png"
import crown from "../images/crown.png"
// import ben10 from "../ben10.jpg";
// import ring from "../nbaRing.png"

function PoseDetection(props) {
    const videoRef = createRef(null);
    const canvasRef = createRef(null);
    const benRef = createRef(null);
    const landmarkRef = createRef(null)
    
    useEffect(()=>{
        const videoElement = videoRef.current
        const canvasElement = canvasRef.current
        const canvasCtx = canvasElement.getContext('2d');
        const landmarkContainer = landmarkRef.current
        canvasRef.current.width = props.width;
        canvasRef.current.height = props.height;
        
        console.log(videoElement)
        
        
        
          function onResults(results) {
            console.log(results)
            canvasCtx.save();
            canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
            canvasCtx.drawImage(results.image, 0, 0,
                                canvasElement.width, canvasElement.height);
            // // Only overwrite existing pixels.
            // canvasCtx.globalCompositeOperation = 'source-in';
            // canvasCtx.fillStyle = '#00FF00';
            // canvasCtx.fillRect(0, 0, canvasElement.width, canvasElement.height);

            // // Only overwrite missing pixels.
            // canvasCtx.globalCompositeOperation = 'destination-atop';
            // canvasCtx.drawImage(
            //     results.image, 0, 0, canvasElement.width, canvasElement.height);

            // canvasCtx.globalCompositeOperation = 'source-over';
            // draw.drawConnectors(canvasCtx, results.poseLandmarks, POSE_CONNECTIONS,
            //               {color: '#00FF00', lineWidth: 4});
            draw.drawLandmarks(canvasCtx, results.poseLandmarks,
                          {color: '#FF0000', lineWidth: 2});
            canvasCtx.restore();

            
          }
                // // canvasCtx.drawImage(benRef.current, (landmarks[284].x)* canvasElement.width +10,( (landmarks[10].y)*canvasElement.height)-40,((landmarks[156].x-landmarks[383].x)*canvasElement.width)-30 ,130);
                // // glasses
                // canvasCtx.drawImage(benRef.current, (landmarks[284].x)* canvasElement.width +18,( (landmarks[152].y)*canvasElement.height)-40,((landmarks[156].x-landmarks[383].x)*canvasElement.width)-40 ,(landmarks[296].y-landmarks[295].y)*canvasElement.height*28);

                // //crown 
                // canvasCtx.drawImage(benRef.current, (landmarks[284].x)* canvasElement.width +38,( (landmarks[197].y)*canvasElement.height)-35,((landmarks[156].x-landmarks[383].x)*canvasElement.width)-80 ,(landmarks[296].y-landmarks[295].y)*canvasElement.height*35);
                // // canvasCtx.drawImage(benRef.current, (landmarks[6].x)* canvasElement.width-10, (landmarks[6].y)* canvasElement.height, 30,30);
                // canvasCtx.restore();

              // }
            
        const pose = new Pose({locateFile: (file) => {
            return `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`;
          }});
         
    
        pose.setOptions({
          modelComplexity: 1,
          smoothLandmarks: true,
          enableSegmentation: true,
          smoothSegmentation: true,
          minDetectionConfidence: 0.5,
          minTrackingConfidence: 0.5
        });
        pose.onResults(onResults);
        
        const camera = new cam.Camera(videoElement, {
            onFrame: async () => {
              await pose.send({image: videoElement});
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
        <div ref={landmarkRef}></div>
    </div>
  )
}

export default PoseDetection