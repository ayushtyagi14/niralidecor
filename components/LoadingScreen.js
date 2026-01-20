import React from 'react'
import Image from 'next/image'

const LoadingScreen = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-white to-[#fef7ff]">
            <div className="relative">
                {/* Subtle background glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#f4c7ff]/20 to-[#ffe4f3]/20 blur-2xl scale-150 rounded-full"></div>
                
                {/* Logo container */}
                <div className="relative flex flex-col items-center">
                    {/* Logo with elegant entrance */}
                    <div className="relative animate-fade-in-scale">
                        <Image
                            src="/assets/logo.png"
                            alt="Loading Logo"
                            width={300}
                            height={100}
                            className="relative z-10 drop-shadow-lg"
                            priority
                        />
                        {/* Subtle shine effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 animate-shine"></div>
                    </div>
                </div>
            </div>
            
            {/* Custom animations */}
            <style jsx>{`
                @keyframes fade-in-scale {
                    0% {
                        opacity: 0;
                        transform: scale(0.9) translateY(20px);
                    }
                    100% {
                        opacity: 1;
                        transform: scale(1) translateY(0);
                    }
                }
                
                @keyframes bounce-subtle {
                    0%, 80%, 100% {
                        transform: translateY(0);
                        opacity: 0.7;
                    }
                    40% {
                        transform: translateY(-8px);
                        opacity: 1;
                    }
                }
                
                @keyframes shine {
                    0% {
                        transform: translateX(-100%) skewX(-12deg);
                    }
                    100% {
                        transform: translateX(200%) skewX(-12deg);
                    }
                }
                
                @keyframes fade-in {
                    0% {
                        opacity: 0;
                        transform: translateY(10px);
                    }
                    100% {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                .animate-fade-in-scale {
                    animation: fade-in-scale 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
                }
                
                .animate-bounce-subtle {
                    animation: bounce-subtle 1.4s ease-in-out infinite;
                }
                
                .animate-shine {
                    animation: shine 3s ease-in-out infinite;
                }
                
                .animate-fade-in {
                    animation: fade-in 0.6s ease-out forwards;
                }
            `}</style>
        </div>
    )
}

export default LoadingScreen
