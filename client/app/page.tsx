"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Link from "next/link";

export default function Home() {
    useGSAP(() => {
        gsap.fromTo(
            "#square",
            {
                x: -250,
                rotation: 0,
                borderRadius: "15%",
                backgroundColor: "rgb(21, 128, 61)", // green-700
            },
            {
                x: 250,
                repeat: -1,
                yoyo: true,
                rotation: 360,
                duration: 2,
                borderRadius: "100%",
                backgroundColor: "rgb(14, 165, 233)", // sky-500
                ease: "power1.inOut",
            },
        );
    }, []);
    return (
        <main className="w-full h-screen flex-center">
            <div className="flex-center">
                <h1 className="text-5xl">
                    The <span className="text-green-700">Squares</span> of
                    Satisfaction
                </h1>
                <div className="flex items-center justify-center gap-8 my-8">
                    <Link
                        href="/signup"
                        className="py-2 px-5 rounded-xl text-xl border border-white hover:border-black hover:cursor-pointer hover:bg-green-700 hover:text-black hover:-translate-y-1 transition-all ease-in-out"
                    >
                        Login.
                    </Link>
                    <Link
                        href="/login"
                        className="py-2 px-5 rounded-xl text-xl border border-white hover:border-black hover:cursor-pointer hover:bg-sky-500 hover:text-black hover:-translate-y-1 transition-all ease-in-out"
                    >
                        Sign Up.
                    </Link>
                </div>
                <div className="mx-10">
                    <div
                        id="square"
                        className="w-[100px] h-[100px] bg-green-700"
                    />
                </div>
            </div>
            <div className="absolute bottom-0 flex flex-col md:flex-row justify-center md:justify-between w-full p-10 md:px-40 shrink">
                <p>A small habbit tracker.</p>
                <p>
                    Created by:{" "}
                    <Link
                        href="https://frasier.dev"
                        className="text-green-700 hover:text-green-500 transition-all ease-in-out"
                    >
                        Frasier Sundra
                    </Link>
                </p>
            </div>
        </main>
    );
}
