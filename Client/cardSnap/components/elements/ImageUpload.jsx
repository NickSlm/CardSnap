import { useState, useEffect, useRef, useCallback } from 'react';
import Webcam from "react-webcam";


const BOX_WIDTH_PERCENT = 0.25; 
const BOX_HEIGHT_PERCENT = 0.08; 
export function ImageUpload(){

     const webcamRef = useRef(null);
    const canvasRef = useRef(null);
    const [result, setResult] = useState(null);
    const [scanning, setScanning] = useState(false);

    const capture = async () => {
        setScanning(true);
        try {
            const screenshot = webcamRef.current.getScreenshot();
            const img = new Image();
            img.src = screenshot;
            await new Promise(res => img.onload = res);

            // Crop math — must match the overlay percentages exactly
            const cropW = img.width * BOX_WIDTH_PERCENT;
            const cropH = img.height * BOX_HEIGHT_PERCENT;
            const cropX = (img.width - cropW) / 2;
            const cropY = (img.height - cropH) / 2;

            const canvas = canvasRef.current;
            canvas.width = cropW;
            canvas.height = cropH;
            canvas.getContext('2d').drawImage(img, cropX, cropY, cropW, cropH, 0, 0, cropW, cropH);

            const blob = await new Promise(res => canvas.toBlob(res, 'image/jpeg', 1.0));
            const formData = new FormData();
            formData.append('Image', blob, 'card.jpg');

            const response = await fetch('/data/upload/image', { method: 'POST', body: formData });
            const data = await response.json();
            setResult(data);
        } finally {
            setScanning(false);
        }
    };


    return ( 
             <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
            <canvas ref={canvasRef} className="hidden" />

            <div className="flex flex-col items-center gap-4 w-full max-w-sm">
                <div className="relative w-full rounded-xl overflow-hidden">
                    <Webcam
                        ref={webcamRef}
                        audio={false}
                        screenshotFormat="image/jpeg"
                        videoConstraints={{ facingMode: 'environment' }}
                        className="w-full"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div
                            className="border-2 border-yellow-400 shadow-[0_0_0_9999px_rgba(0,0,0,0.6)]"
                            style={{
                                width: `${BOX_WIDTH_PERCENT * 100}%`,
                                height: `${BOX_HEIGHT_PERCENT * 100}%`,
                            }}
                        >
                            {/* Corner markers */}
                            {[
                                'top-0 left-0 border-t-2 border-l-2',
                                'top-0 right-0 border-t-2 border-r-2',
                                'bottom-0 left-0 border-b-2 border-l-2',
                                'bottom-0 right-0 border-b-2 border-r-2',
                            ].map((cls, i) => (
                                <div key={i} className={`absolute w-3 h-3 border-yellow-400 ${cls}`} />
                            ))}
                        </div>
                    </div>
                </div>

                <button
                    onClick={capture}
                    disabled={scanning}
                    className="w-16 h-16 rounded-full bg-white border-4 border-yellow-400
                               hover:scale-95 transition-transform disabled:opacity-50"
                />

                {result && (
                    <div className="text-green-400 font-mono text-xl font-bold">
                        {result?.cardId ?? JSON.stringify(result)}
                    </div>
                )}
            </div>
        </div>
        );
}