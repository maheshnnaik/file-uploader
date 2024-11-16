'use client';

import Image from "next/image"
import { useState } from "react";
import { Loading } from "./Loading";
import { notoSansJP, openSans } from "@/app/utils/font";
import "../globals.css";

enum UploadStatus {
    PENDING = 0,
    SUCCESS = 1,
    FAILED = 2
}

interface FileUploladerProps { 
    file: File | null;
    status: UploadStatus
}
let intervalId: unknown | null = null;

export const FileUplolader = () => {
    const [isDragging, setIsDragging] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [isUploadComplete, setIsUploadComplete] = useState(false);
    const [isUploadFailed, setIsUploadFailed] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [filesUploaded, setFilesUploaded] = useState<FileUploladerProps[]>([]);

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        setIsUploading(true)
        if (event.target.files && event.target.files.length > 0) {
            const files = Array.from(event.target.files);
            processFiles(files);
        }
    };

    const processFiles = (files: File[]) => {
        const newFile = files.map(file => {
            return {
                file: file,
                status: UploadStatus.PENDING
            }
        });
        intervalId = setTimeout(() => {
            newFile.forEach(file => file.status = UploadStatus.SUCCESS)
            setIsUploading(false)
            setIsUploadComplete(true)
            setFile(file);
            setFilesUploaded(prevFiles => [...prevFiles, ...newFile]);
        }, 2000) as unknown;
    }

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
        setIsUploading(true)
        if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
            const files = Array.from(event.dataTransfer.files);
            processFiles(files);
        }
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

const Dot = () => {
    return (
        <span className={openSans.className + ' font-normal text-[#4B4B4B] text-sm'}>•</span>
    )
}

const ToolTip = ({ title, failedFiles }: { title: string, failedFiles: (string | undefined)[] }) => {
    return (
        <div data-tooltip-target="tooltip-default relative" className="w-auto text-center">
            <Image
                src={'/circle-info.svg'}
                width={12}
                height={12}
                className="tooltip cursor-pointer"
                alt="info"
            />
            
            <div className="tooltip-text absolute right flex flex-col justify-center items-center">
                <div className="absolute w-2 h-2 top-0 left-0">
                    <Image src={'/caret-up-solid.svg'} width={8} height={8} alt={'caret'} />
                </div>
                <div className="absolute top-2 -left-2.5 w-[200px] bg-[#282828] rounded-lg p-4 text-white flex flex-col items-start gap-1">
                    <h4 className={notoSansJP.className + ' text-[16px]'}>{title}</h4>
                    <div className="flex flex-col gap-2 items-start">
                    {
                        failedFiles.map((file, index) => {
                            return (
                                <div key={index} className="flex gap-2 items-center">
                                    <Image src={'/file.svg'} width={16} height={16} alt={'file'}/>
                                    <span className={notoSansJP.className + ' text-[12px]'}>{file}</span>
                                </div>
                            )
                        })
                    }
                </div>
                </div>
            </div>
        </div>
    )
}