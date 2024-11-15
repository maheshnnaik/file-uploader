'use client';

import Image from "next/image"

export const FileUplolader = () => {
    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const newFile = event.target.files[0]
            console.log(newFile);
        }
    };

    return (

        <div className="flex flex-1 justify-center items-center p-2 border-[2px] border-dashed border-[#E8E8E8] bg-[#F3F3F3] rounded-xl">
            <div className="flex flex-col items-center gap-2">
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
                        <input type="file" className="opacity-0 w-full h-full absolute left-0 top-0 cursor-pointer" onChange={handleFileSelect} />
                    </label>

                </div>
            </div>
        </div>
    )
}