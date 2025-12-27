"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function Home() {
    useGSAP(() => {
        gsap.fromTo(
            "#green-box",
            {
                x: 0,
                rotation: 0,
                borderRadius: "5%",
            },
            {
                x: 400,
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
            <div className="h-screen w-full">
                <div className="h-[80%] flex flex-col items-center justify-center">
                    <h1 className="text-5xl">
                        The <span className="text-green-700">Squares</span> of
                        Satisfaction
                    </h1>
                    <div className="flex items-center justify-center gap-8 my-8">
                        <button className="py-2 px-5 rounded-xl text-lg border border-white hover:border-green-700 ">
                            Login
                        </button>
                    </div>
                </div>
                <div className="mx-10">
                    <div
                        id="green-box"
                        className="w-[100px] h-[100px] bg-green-700 rounded-xl"
                    />
                </div>
            </div>
        </main>
    );
}
