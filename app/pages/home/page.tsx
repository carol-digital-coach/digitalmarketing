"use client"
import AboutPage from "../about/page"

export const HomePage = () => {
    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <div className="bg-[var(--site-pink)]">
                <div className="flex flex-col lg:flex-row items-start justify-center min-h-screen px-4 py-8 lg:py-0 lg:mt-20 gap-8 lg:gap-16">
                    <div className="flex justify-center items-center order-1 lg:order-1 w-full">
                        <div className="relative w-[280px] h-[280px] sm:w-[350px] sm:h-[350px]">
                            <div
                                className={
                                    "absolute border-2 border-gray-200 rounded-[50%] w-[80px] h-[80px] sm:w-[120px] sm:h-[120px] bg-white shadow-sm z-30"
                                }
                                style={{
                                    bottom: '15px',
                                    left: '15px',
                                }}
                            ></div>
                            <div
                                className="absolute rounded-[50%] w-full h-full overflow-hidden border-4 border-white shadow-2xl z-40 bg-gray-100"
                                style={{
                                    top: '50%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                }}
                            >
                                <img
                                    src="https://www.pngplay.com/wp-content/uploads/6/Scattered-Books-PNG-HD-Quality.png"
                                    className="w-full h-full object-contain scale-110"
                                    alt="Carol - Digital Coach"
                                />
                            </div>

                            <div
                                className="absolute border border-gray-100 rounded-[50%] w-[60px] h-[60px] sm:w-[80px] sm:h-[80px] bg-white/80 shadow-md z-20"
                                style={{
                                    bottom: '40px',
                                    left: '-10px',
                                }}
                            ></div>

                            <div
                                className="absolute border border-gray-100 rounded-[50%] w-[40px] h-[40px] sm:w-[60px] sm:h-[60px] bg-white/60 shadow-sm z-10"
                                style={{
                                    bottom: '5px',
                                    left: '35px',
                                }}
                            ></div>
                        </div>
                    </div>
                    <div className="flex flex-col items-center lg:items-start text-center lg:text-left order-2 lg:order-2 max-w-2xl w-full lg:mr-20">
                        <h1 className="font-bold text-white text-3xl sm:text-4xl lg:text-5xl leading-tight text-center lg:text-left">
                            Hi I'm Carol
                            <span className="block text-white/70 mt-2">The Digital Coach</span>
                        </h1>

                        <p className="mt-6 text-xl sm:text-2xl text-white font-light text-center lg:text-left">
                            Your Digital Success Partner
                        </p>

                        <div className="mt-6 space-y-3 w-full">
                            <p className="text-white text-lg sm:text-xl leading-relaxed text-center lg:text-left">
                                Empowering entrepreneurs and businesses to thrive in the digital world through
                            </p>
                            <p className="text-white text-lg sm:text-xl leading-relaxed text-center lg:text-left">
                                strategic coaching, proven systems, and authentic growth.
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 mt-8 w-full sm:w-auto justify-center lg:justify-start p-2">
                            <button
                                className="px-8 py-4 rounded-sm text-[var(--site-light-pink)] hover:text-white font-semibold bg-white hover:bg-transparent hover:border hover:border hover:scale-105 transition-all duration-300 cursor-pointer shadow-lg min-w-[180px]"
                            >
                                Explore Services
                            </button>
                            <button
                                className="px-8 py-4 rounded-sm text-white font-semibold bg-transparent border-2 border-white hover:text-[var(--site-light-pink)] hover:bg-white hover:scale-105 transition-all duration-300 cursor-pointer shadow-lg min-w-[180px]"
                            >
                                Get Started
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* About Page Section */}
            <AboutPage />
        </div>
    )
}