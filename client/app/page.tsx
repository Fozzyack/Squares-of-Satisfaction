"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function Home() {
    useGSAP(() => {
        gsap.fromTo(
            "#green-box",
            {
                x: -250,
                rotation: 0,
                borderRadius: "15%",
            },
            {
                x: 250,
                repeat: -1,
                yoyo: true,
                rotation: 360,
                duration: 2,
                borderRadius: "100%",
                ease: "power1.inOut",
            },
        );
    }, []);
    return (
        <main className="w-full h-screen">
            <div className="h-screen w-full flex flex-col items-center justify-center">
                <div className="flex flex-col items-center justify-center">
                    <h1 className="text-5xl">
                        The <span className="text-green-700">Squares</span> of
                        Satisfaction
                    </h1>
                    <div className="flex items-center justify-center gap-8 my-8">
                        <button className="py-2 px-5 rounded-xl text-xl border border-white hover:border-black hover:cursor-pointer hover:bg-green-700 hover:text-black hover:-translate-y-1 transition-all ease-in-out">
                            Login
                        </button>
                    </div>
                </div>
                <div className="mx-10">
                    <div
                        id="green-box"
                        className="w-[100px] h-[100px] bg-green-700"
                    />
                </div>
            </div>
        </main>
    );
}
