"use client"
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export default function NotFoundPage() {
    return (
        <div
            className="h-screen flex flex-row justify-center align-center bg-[var(--site-pink)]"
        >
            <div
                className="border w-full mt-[5%]"
            >
                <p className='absolute text-4xl text-center m-10 underline text-white cursor-pointer top-20 flex justify-center align-center'><a className='font-3xl' href='/home'>Page Not found return to home page</a></p>
                <DotLottieReact
                    src="https://lottie.host/b707a7c5-c4e9-431e-9a83-7b4fd067a815/8vigBbn7tk.lottie"
                    loop
                    autoplay
                />
            </div>
        </div>
    )
}