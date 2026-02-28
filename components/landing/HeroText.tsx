"use client";

import React, { useRef, useState, useEffect } from "react";
import { Roboto_Flex } from "next/font/google";

const robotoFlex = Roboto_Flex({ subsets: ["latin"], display: "swap" });

interface HeroTextProps {
    firstLine: string;
    secondLine: string;
}

export default function HeroText({ firstLine, secondLine }: HeroTextProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePos({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    const renderLine = (text: string, colorClass: string) => {
        return (
            <div
                className="flex justify-center items-center leading-none uppercase tracking-tighter"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
            >
                {text.split("").map((char, i) => {
                    if (char === " ") return <span key={i} className="w-3 md:w-6 lg:w-10" />;
                    return (
                        <InteractiveLetter
                            key={i}
                            char={char}
                            mousePos={mousePos}
                            colorClass={colorClass}
                            isContainerHovered={isHovering}
                        />
                    );
                })}
            </div>
        );
    };

    return (
        <div
            ref={containerRef}
            className={`${robotoFlex.className} flex flex-col items-center justify-center py-10 select-none cursor-default w-full`}
        >
            {renderLine(firstLine, "text-[#ffffff]")}
            {renderLine(secondLine, "text-[#e5e5e5]")}
        </div>
    );
}

function InteractiveLetter({
    char,
    mousePos,
    colorClass,
    isContainerHovered
}: {
    char: string;
    mousePos: { x: number; y: number };
    colorClass: string;
    isContainerHovered: boolean;
}) {
    const spanRef = useRef<HTMLSpanElement>(null);
    const [distance, setDistance] = useState(1000);

    useEffect(() => {
        if (!spanRef.current) return;
        const rect = spanRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const dx = mousePos.x - centerX;
        const dy = mousePos.y - centerY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        setDistance(dist);
    }, [mousePos]);

    // Max distance a letter reacts to the cursor
    const maxDist = 300;
    // Weight interpolation: normally 900 (thick), drops to 100 (thin) based on proximity
    const baseWeight = 1000;
    const targetWeight = 100;

    // Width interpolation: normally 150 (wide), drops to 25 (narrow)
    const baseWidth = 150;
    const targetWidth = 25;

    let effectRatio = 0;
    if (isContainerHovered && distance < maxDist) {
        // Smoother falloff
        const normalizedDist = distance / maxDist;
        effectRatio = 1 - Math.pow(normalizedDist, 1.5);
    }

    const weight = baseWeight - effectRatio * (baseWeight - targetWeight);
    const width = baseWidth - effectRatio * (baseWidth - targetWidth);

    return (
        <span
            ref={spanRef}
            className={`relative inline-block transition-all duration-100 ease-out text-7xl sm:text-8xl md:text-[8rem] lg:text-[11rem] xl:text-[13rem] ${colorClass}`}
            style={{
                fontVariationSettings: `"wdth" ${width}, "wght" ${weight}`,
            }}
        >
            {char}
        </span>
    );
}
