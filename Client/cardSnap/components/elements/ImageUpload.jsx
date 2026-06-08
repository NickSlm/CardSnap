import { useState, useEffect, useRef } from 'react';
import Webcam from "react-webcam";


export function ImageUpload(){

    const [image, setImage] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const HandleImageUpload = (event) =>{
        const file = event.target.files[0];
        setImage(file);
    };

    const webcamRef = useRef(null);
    const canvasRef = useRef(null);

    const drawBoundingBox = () => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        context.clearRect(0, 0, canvas.width, canvas.height);

        context.strokeStyle = '#FF0000';
        context.lineWidth = 4;

        const bounds = { x: 50, y: 50, width: 200, height: 150 };

        context.strokeRect(bounds.x, bounds.y, bounds.width, bounds.height);
    };



    useEffect(() => {
        const fetchData = async () => {
            try {
                const formData = new FormData();
                formData.append("Image",image);
                const response = await fetch("/data/upload/image", {method: "POST", body: formData})

                if (!response.ok){
                    throw new Error("Failed to fetch Image");
                }
                const result = await response.json();
            }catch (err)
            {
                setError(err);
            }finally{
                setLoading(false);
            }
        }
        if (image.length != 0){
            fetchData();
        }
    }, [image]);

    return ( 
        <div class="flex justify-center items-center h-screen">

              <Webcam
                ref={webcamRef}
                audio={false}
                videoConstraints={{
                    facingMode: "environment" // back camera
                }}
                />
        
        </div>
        );
}