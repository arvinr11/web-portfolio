"use client";

import SplitText from "./components/TextAnimations/SplitText/SplitText";
import {MoveRight, Download} from 'lucide-react';
import Image from 'next/image';
import BottomNav from './components/BottomNav/BottomNav';
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    // Smooth scrolling dengan offset untuk fixed navbar
    const handleSmoothScroll = (e: Event) => {
      const target = e.target as HTMLAnchorElement;
      if (target.hash) {
        e.preventDefault();
        const targetElement = document.querySelector(target.hash);
        if (targetElement) {
          const offset = 100; // Offset untuk bottom navbar
          const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - offset;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      }
    };

    // Add event listeners to all navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
      link.addEventListener('click', handleSmoothScroll);
    });

    // Cleanup
    return () => {
      navLinks.forEach(link => {
        link.removeEventListener('click', handleSmoothScroll);
      });
    };
  }, []);

  return (
    <main>
      {/* Home Section */}
      <section id="home" className="min-h-screen flex items-center justify-center px-6 md:px-10">
        <div className="container mx-auto flex flex-col-reverse md:flex-row items-center gap-12">
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-8xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-slate-900 dark:text-white">
              <SplitText 
                text="Hi, I'm Arvin"
                className="text-6xl font-semibold text-center"
                delay={100}
                duration={0.6}
                ease="power3.out"
                splitType="chars"
                from={{ opacity: 0, y: 40 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.1}
                rootMargin="-100px"
                textAlign="center"
              />
            </h1>
              
            <p className="mt-4 text-xl text-slate-900 dark:text-white max-w-xl mx-auto md:mx-0 animate-text-fade-in">
              A Mobile Developer with experience in Flutter and native Android (Kotlin).
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <button className="group flex items-center gap-2 px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg hover:bg-slate-800 dark:hover:bg-gray-200 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                <span className="animate-text-slide-in">See Projects</span>
                <MoveRight size={20} className="animate-text-slide-in transition-transform duration-300 group-hover:translate-x-1" />
              </button>
              <button className="group flex items-center gap-2 px-6 py-3 border-2 border-slate-900 dark:border-white text-slate-900 dark:text-white rounded-lg hover:bg-slate-900 dark:hover:bg-white hover:text-white dark:hover:text-slate-900 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                <span className="animate-text-slide-in">Contact Me</span>
                <MoveRight size={20} className="animate-text-slide-in transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>
          </div>
          
          {/* Illustration Section */}
          <div className="flex-1 flex justify-center md:justify-end">
            <div className="w-[400px] h-[400px] md:w-[600px] md:h-[600px] flex items-center justify-center">
              {/* Mobile Phone Logo with Animations */}
              <div className="mobile-logo-container">
                <Image 
                  src="/mobile-illustrator.png" 
                  alt="Mobile Development Illustration - Two phones showing mobile development" 
                  width={1000}
                  height={1000}
                  className="w-full h-full object-contain animate-mobile-entrance"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* About Me Section */}
      <section id="about" className="min-h-screen flex items-center justify-center px-6 md:px-10 py-20">
        <div className="container mx-auto">
          {/* Title di tengah */}
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-slate-900 dark:text-white mb-4">
              About Me
            </h2>
          </div>

          {/* Content dengan 3 kolom */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
            
            {/* Kolom kiri - Deskripsi */}
            <div className="lg:col-span-1">
              <p className="text-lg md:text-xl text-slate-700 dark:text-slate-300 leading-relaxed mb-8">
                I am currently a fifth-semester Mobile Application and Technology (MAT) student at Bina Nusantara (BINUS) University, with a deep passion for mobile development.
              </p>
              
              {/* Button group */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="flex items-center justify-center gap-2 px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg hover:bg-slate-800 dark:hover:bg-gray-200 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                  <Download size={20} />
                  Download CV
                </button>
                <button className="flex items-center justify-center gap-2 px-6 py-3 border-2 border-slate-900 dark:border-white text-slate-900 dark:text-white rounded-lg hover:bg-slate-900 dark:hover:bg-white hover:text-white dark:hover:text-slate-900 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                  <Download size={20} />
                  Download Portfolio
                </button>
              </div>
            </div>

            {/* Kolom tengah - Kosong untuk spacing */}
            <div className="hidden lg:block"></div>

            {/* Kolom kanan - Lanyard Component */}
            <div className="lg:col-span-1 flex justify-center lg:justify-end">
              <div className="w-80 h-80 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg shadow-2xl flex items-center justify-center">
                {/* Placeholder untuk Lanyard Component */}
                <div className="text-white text-center">
                  <div className="text-2xl font-bold mb-2">Lanyard Component</div>
                  <div className="text-sm opacity-80">React Bits</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
      
      {/* Bottom Navigation */}
      <BottomNav />
    </main>
  );  
}