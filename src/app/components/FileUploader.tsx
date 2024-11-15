'use client';

import Image from "next/image"
import { useState } from "react";
import { Loading } from "./Loading";

let intervalId: unknown | null = null;

export const FileUplolader = () => {
    const [isDragging, setIsDragging] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [isUploadComplete, setIsUploadComplete] = useState(false);
    const [isUploadFailed, setIsUploadFailed] = useState(false);
    const [file, setFile] = useState<File | null>(null);

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        setIsUploading(true)
        if (event.target.files && event.target.files.length > 0) {
            const newFile = event.target.files[0]
            setIsUploading(false)
            setIsUploadComplete(true)
            setFile(newFile);
            console.log(newFile);
            const file = event.target.files[0];
            intervalId = setTimeout(() => {
                setIsUploading(false)
                setIsUploadComplete(true)
                setFile(file);
            }, 2000) as unknown;
        }
    };

    const cancelUpload = () => {
        if(intervalId){
            clearTimeout(intervalId);
            setIsUploading(false);
            setIsUploadComplete(false);
        }
    }

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDragging(true);
    }

    const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDragging(false);
    }

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDragging(false)
    }

    const renderContent = () => {
        if (isUploading) {
            return <UploadInProgress cancelUpload={cancelUpload} />
        }
        if (isUploadComplete) {
            return <UploadComplete fileName={file?.name || ''} setIsUploadComplete={setIsUploadComplete} />
        }
        if(isUploadFailed) {
            return <UploadFailed setIsUploadFailed={setIsUploadFailed}/>
        }
        return <FileUpload handleFileSelect={handleFileSelect} />
    }

    return (

        <div
            className={`flex flex-1 justify-center items-center p-2 border-[2px] border-dashed bg-[#F3F3F3] rounded-xl ${isDragging ? 'border-blue-400' : 'border-[#E8E8E8]'} ${isUploadComplete && '!border-solid border-[#048848]'} ${isUploadFailed && '!border-solid border-[#DE1135]'} `}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
        >
            <div className="flex flex-col items-center gap-2">
                {
                    renderContent()
                }
            </div>
        </div>
    )
}

const FileUpload = ({ handleFileSelect }: { handleFileSelect: (event: React.ChangeEvent<HTMLInputElement>) => void }) => {
    return (
        <>
            <Image
                src={'/cloud-arrow-up.svg'}
                width={24}
                height={24}
                alt="upload_file"
            />
            <span className="text-[#4B4B4B] font-semibold text-[14px]">Drop files here to upload</span>
            <div className="relative bg-[#E8E8E8] py-2.5 px-3.5 rounded-3xl cursor-pointer">
                <label className="inline-block text-black font-semibold text-[14px]" htmlFor="fileInput">
                    Browse Files
                    <input type="file" accept="*" className="opacity-0 w-full h-full absolute left-0 top-0 cursor-pointer" onChange={handleFileSelect} />
                </label>

            </div>
        </>
    )
}
const UploadInProgress = ({cancelUpload}:{cancelUpload: () => void}) => {
    return (
        <>
            <Loading />
            <span className="text-[#4B4B4B] font-semibold text-[14px]">Uploading File</span>
            <div className="relative bg-[#E8E8E8] py-2.5 px-3.5 rounded-3xl cursor-pointer">
                <button className="inline-block text-black font-semibold text-[14px]" onClick={cancelUpload}>
                    Cancel
                </button>
            </div>
        </>
    )
}

const UploadComplete = ({ fileName, setIsUploadComplete }: { fileName: string, setIsUploadComplete: React.Dispatch<React.SetStateAction<boolean>> }) => {
    return (
        <>
            <Image
                src={'/circle-check-solid.svg'}
                width={24}
                height={24}
                alt="upload_file"
            />
            <span className="text-[#4B4B4B] font-semibold text-[14px]">{fileName}</span>
            <div>
                <div className="flex gap-4 cursor-pointer">
                    <button className="inline-block py-2.5 px-3.5 bg-[#E8E8E8] text-black font-semibold text-[14px] rounded-3xl ">
                        View Details
                    </button>
                    <button className="inline-block py-2.5 px-3.5 bg-[#E8E8E8] text-black font-semibold text-[14px] rounded-3xl " onClick={() => setIsUploadComplete(false)}>
                        New Upload
                    </button>
                </div>
            </div>
        </>
    )
}

const UploadFailed = ({ setIsUploadFailed }: { setIsUploadFailed: React.Dispatch<React.SetStateAction<boolean>> }) => {
    return (
        <>
        <Image
                src={'/circle-exclamation.svg'}
                width={24}
                height={24}
                alt="upload_file"
            />
            <span className="text-[#4B4B4B] font-semibold text-[14px]">Upload Failed</span>
            <span className="text-[#4B4B4B] font-semibold text-[14px]">File type not compatible</span>

            <div className="relative bg-[#E8E8E8] py-2.5 px-3.5 rounded-3xl cursor-pointer">
                <button className="inline-block text-black font-semibold text-[14px]" onClick={() => setIsUploadFailed(false)}>
                    Reupload
                </button>

            </div>
        </>
    )
}