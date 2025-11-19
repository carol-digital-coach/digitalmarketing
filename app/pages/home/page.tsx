"use client"
import AboutPage from "../about/page"
import StatCard from "@/app/components/statscard"

export const HomePage = () => {
    return (
        <div className="min-h-screen border-none">
            <div className="bg-[var(--site-pink)]">
                <div className="flex flex-col lg:flex-row items-start justify-center min-h-[90vh] lg:min-h-[80vh] px-4 py-8 lg:py-0 lg:mt-30 gap-8 lg:gap-16">
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
                <section className="bg-[var(--site-black)] text-white py-16 md:py-24 px-6 md:px-12 overflow-hidden">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

                            <div className="lg:col-span-4">
                                <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
                                    Empowering Growth Through Digital Skills.
                                </h2>
                                <div className="h-1 w-20 bg-[var(--site-pink)] rounded-full mb-6"></div>
                                <p className="text-white text-sm uppercase tracking-widest font-medium">
                                    About Me
                                </p>
                            </div>

                            <div className="lg:col-span-8 space-y-6 text-lg text-gray-300 leading-relaxed">
                                <p>
                                    <span className="text-white font-semibold border-b border-blue-500/30 pb-0.5">
                                        I've helped over 100 individuals discover their ability to create income online.
                                    </span>{" "}
                                    Some have launched their own businesses by turning their talents into
                                    profitable ventures, while others have learned valuable digital skills
                                    such as content writing, social media management, and more —
                                    transforming those skills into sustainable sources of income.
                                </p>

                                <p>
                                    My journey didn't just start — it has been a process of growth,
                                    resilience, and purpose. I began learning digital skills as a mother
                                    of twins, when I realized how difficult it was to re-enter the job
                                    market while caring for my children. That challenge became my
                                    turning point and ignited my passion for empowering other mums to
                                    find freedom and opportunity online.
                                </p>

                                <p>
                                    What began with a single YouTube video has grown into 10+
                                    certifications and over 7 years of experience in the digital space.
                                    Along the way, I've had the privilege of working with brands across
                                    education, technology, gardening, and personal development — and I'm
                                    always open to new collaborations that inspire growth and impact.
                                </p>
                            </div>
                        </div>

                        <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent my-16"></div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center p-2">
                            <StatCard label="Clients Coached" value="100+" delay="0" />
                            <StatCard label="Years Experience" value="7+" delay="100" />
                            <StatCard label="Success Rate" value="95%" delay="200" />
                            <StatCard label="Support Available" value="24/7" delay="300" />
                        </div>
                    </div>
                </section>
            </div>
            <AboutPage />
        </div>
    )
}