"use client"
const colors = {
    base: "#180A0A",
    deep: "#711A75",
    pop: "#F10086",
    soft: "#F582A7"
};

import { Zap } from "lucide-react";

export const ImageAvatar = () => {
    // Using a professional placeholder image for the Digital Coach
    const imageUrl = "https://images.unsplash.com/photo-1599839446227-2c1f3c3d5516?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

    return (
        <div className="flex justify-center items-center order-1 lg:order-1 w-full">
            <div className="relative w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] p-4 overflow-hidden">
                {/* Animated Accent Dot 1 (Large - with Icon) */}
                <div
                    className={
                        "absolute rounded-[50%] w-[80px] h-[80px] lg:w-[100px] lg:h-[100px] sm:w-[120px] sm:h-[120px] shadow-lg z-30 flex items-center justify-center p-2 border-2 pulse-slow"
                    }
                    style={{
                        bottom: '15px',
                        left: '15px',
                        borderColor: colors.deep,
                        backgroundColor: colors.base,
                    }}
                >
                    <Zap size={40} style={{ color: colors.pop }} className="opacity-70" />
                </div>

                {/* Central Image Ring */}
                <div
                    className="absolute rounded-[50%] w-full h-full overflow-y-hidden border-4 shadow-2xl z-40"
                    style={{
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        borderColor: colors.soft,
                        boxShadow: `0 0 30px rgba(245, 130, 167, 0.4)`
                    }}
                >
                    <img
                        src="../carolpic.png"
                        onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.onerror = null;
                            target.src = "";
                        }}
                        className="w-full h-full object-contain scale-110 transition-all duration-500 border"
                        alt="Carol - Digital Coach"
                    />
                </div>

                {/* Animated Accent Dot 2 (Medium) */}
                <div
                    className="absolute rounded-[50%] w-[60px] h-[60px] sm:w-[80px] sm:h-[80px] shadow-md z-20 pulse-medium"
                    style={{
                        bottom: '40px',
                        left: '-10px',
                        border: `1px solid ${colors.soft}`,
                        backgroundColor: `${colors.base}E0`,
                    }}
                ></div>

                {/* Animated Accent Dot 3 (Small) */}
                <div
                    className="absolute rounded-[50%] w-[40px] h-[40px] sm:w-[60px] sm:h-[60px] shadow-sm z-10 pulse-fast"
                    style={{
                        bottom: '5px',
                        left: '35px',
                        border: `1px solid ${colors.deep}`,
                        backgroundColor: `${colors.base}F0`,
                    }}
                ></div>
            </div>
        </div>
    );
};
