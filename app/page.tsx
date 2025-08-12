"use client";

import SplitText from "./components/TextAnimations/SplitText/SplitText";
import {MoveRight, Download, FolderOpen, Award, Code} from 'lucide-react';
import Image from 'next/image';
import BottomNav from './components/BottomNav/BottomNav';
import { useEffect, useState } from 'react';

export default function Home() {
  const [activeTab, setActiveTab] = useState('projects');
  
  useEffect(() => {
    // Scroll ke atas saat halaman di-refresh - multiple methods untuk memastikan berhasil
    const scrollToTop = () => {
      // Method 1: window.scrollTo
      window.scrollTo(0, 0);
      
      // Method 2: document.documentElement.scrollTop
      document.documentElement.scrollTop = 0;
      
      // Method 3: document.body.scrollTop (untuk Safari)
      document.body.scrollTop = 0;
      
      // Method 4: setTimeout untuk memastikan DOM sudah siap
      setTimeout(() => {
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      }, 100);
    };

    // Jalankan scroll to top
    scrollToTop();
    
    // Tambahan: handle scroll restoration
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    
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
      <section id="about" className="py-16 px-6 md:px-10 mt-8">
        <div className="container mx-auto">
          {/* Title di tengah */}
          <div className="text-center mb-12">
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

      {/* Portfolio Section */}
      <section id="portfolio" className="py-16 px-6 md:px-10">
        <div className="container mx-auto">
          {/* Title di tengah */}
          <div className="text-center mb-12">
            <h2 className="text-5xl md:text-6xl font-bold text-slate-900 dark:text-white mb-4">
              Portfolio Showcase
            </h2>
          </div>

          {/* 3 Kotak Portfolio */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {/* Projects Tab */}
            <button
              onClick={() => setActiveTab('projects')}
              className={`p-6 rounded-lg border-2 transition-all duration-300 hover:scale-105 ${
                activeTab === 'projects'
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-lg'
                  : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600'
              }`}
            >
              <div className="text-center">
                <FolderOpen 
                  size={48} 
                  className={`mx-auto mb-4 ${
                    activeTab === 'projects' 
                      ? 'text-blue-600 dark:text-blue-400' 
                      : 'text-gray-600 dark:text-gray-400'
                  }`}
                />
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                  Projects
                </h3>
              </div>
            </button>

            {/* Certificates Tab */}
            <button
              onClick={() => setActiveTab('certificates')}
              className={`p-6 rounded-lg border-2 transition-all duration-300 hover:scale-105 ${
                activeTab === 'certificates'
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-lg'
                  : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600'
              }`}
            >
              <div className="text-center">
                <Award 
                  size={48} 
                  className={`mx-auto mb-4 ${
                    activeTab === 'certificates' 
                      ? 'text-blue-600 dark:text-blue-400' 
                      : 'text-gray-600 dark:text-gray-400'
                  }`}
                />
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                  Certificates
                </h3>
              </div>
            </button>

            {/* Tech Stack Tab */}
            <button
              onClick={() => setActiveTab('techstack')}
              className={`p-6 rounded-lg border-2 transition-all duration-300 hover:scale-105 ${
                activeTab === 'techstack'
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-lg'
                  : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600'
              }`}
            >
              <div className="text-center">
                <Code 
                  size={48} 
                  className={`mx-auto mb-4 ${
                    activeTab === 'techstack' 
                      ? 'text-blue-600 dark:text-blue-400' 
                      : 'text-gray-600 dark:text-gray-400'
                  }`}
                />
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                  Tech Stack
                </h3>
              </div>
            </button>
          </div>

          {/* Content Area dengan Animasi */}
          <div className="min-h-[400px]">
            {/* Projects Content */}
            {activeTab === 'projects' && (
              <div className="animate-fade-in">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Project Card 1 */}
                  <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                    <div className="w-full h-32 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg mb-4 flex items-center justify-center">
                      <span className="text-white text-lg font-semibold">Flutter App</span>
                    </div>
                    <h4 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                      E-Commerce Mobile App
                    </h4>
                    <p className="text-slate-600 dark:text-slate-400 mb-4">
                      A full-featured e-commerce application built with Flutter and Firebase.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">Flutter</span>
                      <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">Firebase</span>
                    </div>
                  </div>

                  {/* Project Card 2 */}
                  <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                    <div className="w-full h-32 bg-gradient-to-br from-green-400 to-blue-500 rounded-lg mb-4 flex items-center justify-center">
                      <span className="text-white text-lg font-semibold">Kotlin App</span>
                    </div>
                    <h4 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                      Task Management App
                    </h4>
                    <p className="text-slate-600 dark:text-slate-400 mb-4">
                      Native Android app for task management with Room database.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">Kotlin</span>
                      <span className="px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full">Room DB</span>
                    </div>
                  </div>

                  {/* Project Card 3 */}
                  <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                    <div className="w-full h-32 bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg mb-4 flex items-center justify-center">
                      <span className="text-white text-lg font-semibold">React App</span>
                    </div>
                    <h4 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                      Portfolio Website
                    </h4>
                    <p className="text-slate-600 dark:text-slate-400 mb-4">
                      Personal portfolio website built with Next.js and Tailwind CSS.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">React</span>
                      <span className="px-3 py-1 bg-cyan-100 text-cyan-800 text-sm rounded-full">Tailwind</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Certificates Content */}
            {activeTab === 'certificates' && (
              <div className="animate-fade-in">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Certificate 1 */}
                  <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                    <div className="w-full h-32 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg mb-4 flex items-center justify-center">
                      <Award size={48} className="text-white" />
                    </div>
                    <h4 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                      Flutter Development
                    </h4>
                    <p className="text-slate-600 dark:text-slate-400 mb-2">
                      Google Developer Certification
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-500">
                      Issued: 2024
                    </p>
                  </div>

                  {/* Certificate 2 */}
                  <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                    <div className="w-full h-32 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-lg mb-4 flex items-center justify-center">
                      <Award size={48} className="text-white" />
                    </div>
                    <h4 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                      Android Development
                    </h4>
                    <p className="text-slate-600 dark:text-slate-400 mb-2">
                      Google Android Developer
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-500">
                      Issued: 2023
                    </p>
                  </div>

                  {/* Certificate 3 */}
                  <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                    <div className="w-full h-32 bg-gradient-to-br from-green-400 to-teal-500 rounded-lg mb-4 flex items-center justify-center">
                      <Award size={48} className="text-white" />
                    </div>
                    <h4 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                      Mobile App Development
                    </h4>
                    <p className="text-slate-600 dark:text-slate-400 mb-2">
                      BINUS University
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-500">
                      Issued: 2023
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Tech Stack Content */}
            {activeTab === 'techstack' && (
              <div className="animate-fade-in">
                <div className="grid grid-cols-6 gap-8 max-w-6xl mx-auto">
                  {/* Dart */}
                  <div className="group w-44 h-44 p-8 rounded-2xl bg-slate-800/50 hover:bg-slate-700/50 transition-all duration-300 ease-in-out flex flex-col items-center justify-center gap-4 hover:scale-105 cursor-pointer shadow-lg hover:shadow-xl">
                    <div className="relative">
                      <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-0 group-hover:opacity-50 blur transition duration-300"></div>
                      <Image 
                        src="/tech-logos/dart.svg"
                        alt="Dart icon"
                        width={96}
                        height={96}
                        className="relative h-20 w-20 md:h-24 md:w-24 transform transition-transform duration-300"
                      />
                    </div>
                    <span className="text-slate-300 font-bold text-base md:text-lg tracking-wide group-hover:text-white transition-colors duration-300">
                      Dart
                    </span>
                  </div>

                  {/* Flutter */}
                  <div className="group w-44 h-44 p-8 rounded-2xl bg-slate-800/50 hover:bg-slate-700/50 transition-all duration-300 ease-in-out flex flex-col items-center justify-center gap-4 hover:scale-105 cursor-pointer shadow-lg hover:shadow-xl">
                    <div className="relative">
                      <div className="absolute -inset-2 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full opacity-0 group-hover:opacity-50 blur transition duration-300"></div>
                      <Image 
                        src="/tech-logos/flutter.svg"
                        alt="Flutter icon"
                        width={96}
                        height={96}
                        className="relative h-20 w-20 md:h-24 md:w-24 transform transition-transform duration-300"
                      />
                    </div>
                    <span className="text-slate-300 font-bold text-base md:text-lg tracking-wide group-hover:text-white transition-colors duration-300">
                      Flutter
                    </span>
                  </div>

                  {/* Node.js */}
                  <div className="group w-44 h-44 p-8 rounded-2xl bg-slate-800/50 hover:bg-slate-700/50 transition-all duration-300 ease-in-out flex flex-col items-center justify-center gap-4 hover:scale-105 cursor-pointer shadow-lg hover:shadow-xl">
                    <div className="relative">
                      <div className="absolute -inset-2 bg-gradient-to-r from-green-500 to-green-600 rounded-full opacity-0 group-hover:opacity-50 blur transition duration-300"></div>
                      <Image 
                        src="/tech-logos/nodejs.svg"
                        alt="Node.js icon"
                        width={96}
                        height={96}
                        className="relative h-20 w-20 md:h-24 md:w-24 transform transition-transform duration-300"
                      />
                    </div>
                    <span className="text-slate-300 font-bold text-base md:text-lg tracking-wide group-hover:text-white transition-colors duration-300">
                      Node.js
                    </span>
                  </div>

                  {/* Kotlin */}
                  <div className="group w-44 h-44 p-8 rounded-2xl bg-slate-800/50 hover:bg-slate-700/50 transition-all duration-300 ease-in-out flex flex-col items-center justify-center gap-4 hover:scale-105 cursor-pointer shadow-lg hover:shadow-xl">
                    <div className="relative">
                      <div className="absolute -inset-2 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full opacity-0 group-hover:opacity-50 blur transition duration-300"></div>
                      <Image 
                        src="/tech-logos/kotlin.svg"
                        alt="Kotlin icon"
                        width={96}
                        height={96}
                        className="relative h-20 w-20 md:h-24 md:w-24 transform transition-transform duration-300"
                      />
                    </div>
                    <span className="text-slate-300 font-bold text-base md:text-lg tracking-wide group-hover:text-white transition-colors duration-300">
                      Kotlin
                    </span>
                  </div>

                  {/* GitHub */}
                  <div className="group w-44 h-44 p-8 rounded-2xl bg-slate-800/50 hover:bg-slate-700/50 transition-all duration-300 ease-in-out flex flex-col items-center justify-center gap-4 hover:scale-105 cursor-pointer shadow-lg hover:shadow-xl">
                    <div className="relative">
                      <div className="absolute -inset-2 bg-gradient-to-r from-white to-gray-200 rounded-full opacity-0 group-hover:opacity-50 blur transition duration-300 -z-10"></div>
                      <Image 
                        src="/tech-logos/github.svg"
                        alt="GitHub icon"
                        width={96}
                        height={96}
                        className="relative z-10 h-20 w-20 md:h-24 md:w-24 transform transition-transform duration-300"
                      />
                    </div>
                    <span className="text-slate-300 font-bold text-base md:text-lg tracking-wide group-hover:text-white transition-colors duration-300">
                      GitHub
                    </span>
                  </div>

                  {/* Figma */}
                  <div className="group w-44 h-44 p-8 rounded-2xl bg-slate-800/50 hover:bg-slate-700/50 transition-all duration-300 ease-in-out flex flex-col items-center justify-center gap-4 hover:scale-105 cursor-pointer shadow-lg hover:shadow-xl">
                    <div className="relative">
                      <div className="absolute -inset-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-0 group-hover:opacity-50 blur transition duration-300"></div>
                      <Image 
                        src="/tech-logos/figma.svg"
                        alt="Figma icon"
                        width={96}
                        height={96}
                        className="relative h-20 w-20 md:h-24 md:w-24 transform transition-transform duration-300"
                      />
                    </div>
                    <span className="text-slate-300 font-bold text-base md:text-lg tracking-wide group-hover:text-white transition-colors duration-300">
                      Figma
                    </span>
                  </div>

                  {/* Firebase */}
                  <div className="group w-44 h-44 p-8 rounded-2xl bg-slate-800/50 hover:bg-slate-700/50 transition-all duration-300 ease-in-out flex flex-col items-center justify-center gap-4 hover:scale-105 cursor-pointer shadow-lg hover:shadow-xl">
                    <div className="relative">
                      <div className="absolute -inset-2 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full opacity-0 group-hover:opacity-50 blur transition duration-300"></div>
                      <Image 
                        src="/tech-logos/firebase.svg"
                        alt="Firebase icon"
                        width={96}
                        height={96}
                        className="relative h-20 w-20 md:h-24 md:w-24 transform transition-transform duration-300"
                      />
                    </div>
                    <span className="text-slate-300 font-bold text-base md:text-lg tracking-wide group-hover:text-white transition-colors duration-300">
                      Firebase
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
      
      {/* Bottom Navigation */}
      <BottomNav />
    </main>
  );  
}