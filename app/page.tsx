"use client";

import SplitText from "./components/TextAnimations/SplitText/SplitText";
import {MoveRight, Download, FolderOpen, Award, Code} from 'lucide-react';
import Image from 'next/image';
import BottomNav from './components/BottomNav/BottomNav';
import ProjectCard from './components/ProjectCard';
import CertificateCard from './components/CertificateCard';
import ProfileCard from './components/Components/ProfileCard/ProfileCard';

import { useEffect, useState } from 'react';

export default function Home() {
  const [activeTab, setActiveTab] = useState('projects');
  const [projects, setProjects] = useState<any[]>([]);
  const [certificates, setCertificates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Fetch data from Sanity
    async function fetchData() {
      try {
        const { client } = await import('../lib/client');
        const { projectQueries, certificateQueries } = await import('../lib/queries');
        
        const projectsData = await client.fetch(projectQueries.all);
        const certificatesData = await client.fetch(certificateQueries.all);
        
        // Sort projects: featured first, then by year (newest first)
        const sortedProjects = projectsData.sort((a: any, b: any) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return (b.yearCreated || 0) - (a.yearCreated || 0);
        });
        
        setProjects(sortedProjects);
        setCertificates(certificatesData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

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

  useEffect(() => {
    // Reveal on scroll for elements with .reveal-on-scroll
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target as HTMLElement;
          if (entry.isIntersecting) {
            el.classList.add('is-visible');
          } else {
            el.classList.remove('is-visible');
          }
        });
      },
      { threshold: 0.15 }
    );

    const elements = document.querySelectorAll('.reveal-on-scroll');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
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
              <a href="#portfolio" className="group flex items-center gap-2 px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg hover:bg-slate-800 dark:hover:bg-gray-200 transition-all duration-300 hover:scale-105 hover:shadow-lg animate-fade-in-up">
                <span className="animate-text-slide-in">See Projects</span>
                <MoveRight size={20} className="animate-text-slide-in transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <a href="#contact" className="group flex items-center gap-2 px-6 py-3 border-2 border-slate-900 dark:border-white text-slate-900 dark:text-white rounded-lg hover:bg-slate-900 dark:hover:bg-white hover:text-white dark:hover:text-slate-900 transition-all duration-300 hover:scale-105 hover:shadow-lg animate-fade-in-up">
                <span className="animate-text-slide-in">Contact Me</span>
                <MoveRight size={20} className="animate-text-slide-in transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>
          </div>
          
          {/* Illustration Section */}
          <div className="flex-1 flex justify-center md:justify-end">
            <div className="w-[400px] h-[400px] md:w-[600px] md:h-[600px] flex items-center justify-center">
              {/* Mobile Phone Logo with Animations */}
              <div
                className="mobile-logo-container select-none"
                draggable={false}
                onDragStart={(e) => e.preventDefault()}
                onMouseDown={(e) => e.preventDefault()}
                onPointerDown={(e) => e.preventDefault()}
                onTouchStart={(e) => e.preventDefault()}
              >
                <Image 
                  src="/mobile-illustrator.png" 
                  alt="Mobile Development Illustration - Two phones showing mobile development" 
                  width={1000}
                  height={1000}
                  className="w-full h-full object-contain animate-mobile-entrance select-none"
                  draggable={false}
                  onDragStart={(e) => e.preventDefault()}
                  onMouseDown={(e) => e.preventDefault()}
                  onPointerDown={(e) => e.preventDefault()}
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
          <div className="text-center mb-12 reveal-on-scroll" style={{ animationDelay: '0.05s' }}>
            <h2 className="text-5xl md:text-6xl font-bold text-blue-600 dark:text-blue-400 mb-4">
              About Me
            </h2>
          </div>

          {/* Content dengan 3 kolom */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
            
            {/* Kolom kiri - Deskripsi */}
            <div className="lg:col-span-1">
              <h3 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4 leading-tight reveal-on-scroll" style={{ animationDelay: '0.15s' }}>
                <span className="block text-blue-600 dark:text-blue-400">Hello, I'm</span>
                <span className="block">Arvin Roeslim</span>
              </h3>
              <p className="text-xl md:text-2xl text-slate-700 dark:text-slate-300 leading-relaxed mb-8 reveal-on-scroll" style={{ animationDelay: '0.25s' }}>
                I am currently a fifth-semester Mobile Application and Technology (MAT) student at Bina Nusantara (BINUS) University, with a deep passion for mobile development.
              </p>
              
              {/* Button group */}
              <div className="reveal-on-scroll flex flex-row flex-nowrap gap-4 items-center justify-start" style={{ animationDelay: '0.35s' }}>
                <button className="group flex items-center justify-center gap-2 px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg hover:bg-slate-800 dark:hover:bg-gray-200 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                  <Download size={20} className="reveal-slide-in delay-1 transition-transform duration-300 group-hover:-translate-x-1" />
                  <span className="reveal-slide-in delay-2 whitespace-nowrap transition-transform duration-300 group-hover:translate-x-1">Download CV</span>
                </button>
                <button className="group flex items-center justify-center gap-2 px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg hover:bg-slate-800 dark:hover:bg-gray-200 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                  <Download size={20} className="reveal-slide-in delay-1 transition-transform duration-300 group-hover:-translate-x-1" />
                  <span className="reveal-slide-in delay-2 whitespace-nowrap transition-transform duration-300 group-hover:translate-x-1">Download Portfolio</span>
                </button>
              </div>
            </div>

            {/* Kolom tengah - Kosong untuk spacing */}
            <div className="hidden lg:block"></div>

            {/* Kolom kanan - ProfileCard Component */}
            <div className="lg:col-span-1 flex justify-center lg:justify-end reveal-on-scroll" style={{ animationDelay: '0.45s' }}>
              <ProfileCard
                avatarUrl="/mobile-illustrator.png"
                name="Arvin Roeslim"
                title="Mobile Developer"
                handle="arvinr11"
                status="Available for work"
                contactText="Contact Me"
                showUserInfo={true}
                enableTilt={true}
              />
            </div>

          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-16 px-6 md:px-10">
        <div className="container mx-auto">
          {/* Title di tengah */}
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-400 dark:from-blue-400 dark:via-sky-400 dark:to-cyan-300 bg-clip-text text-transparent mb-4">
              Portfolio Showcase
            </h2>
          </div>

          {/* 3 Kotak Portfolio */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-2 md:px-4 mb-4">
            {/* Projects Tab */}
            <button
              onClick={() => setActiveTab('projects')}
              className={`w-full p-4 rounded-lg border-2 transition-all duration-300 hover:scale-105 ${
                activeTab === 'projects'
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-lg'
                  : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600'
              }`}
            >
              <div className="flex flex-col items-center justify-center text-center gap-1">
                <FolderOpen 
                  size={32} 
                  className={`mx-auto ${
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
              className={`w-full p-4 rounded-lg border-2 transition-all duration-300 hover:scale-105 ${
                activeTab === 'certificates'
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-lg'
                  : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600'
              }`}
            >
              <div className="flex flex-col items-center justify-center text-center gap-1">
                <Award 
                  size={32} 
                  className={`mx-auto ${
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
              className={`w-full p-4 rounded-lg border-2 transition-all duration-300 hover:scale-105 ${
                activeTab === 'techstack'
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-lg'
                  : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600'
              }`}
            >
              <div className="flex flex-col items-center justify-center text-center gap-1">
                <Code 
                  size={32} 
                  className={`mx-auto ${
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
                {loading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-slate-600 dark:text-slate-400">Loading projects...</p>
                  </div>
                ) : projects.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-2 md:px-4 auto-rows-fr">
                    {projects.map((project) => (
                      <ProjectCard key={project._id} project={project} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-slate-600 dark:text-slate-400">No projects found</p>
                  </div>
                )}
              </div>
            )}

            {/* Certificates Content */}
            {activeTab === 'certificates' && (
              <div className="animate-fade-in">
                {loading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-slate-600 dark:text-slate-400">Loading certificates...</p>
                  </div>
                ) : certificates.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-2 md:px-4 auto-rows-fr">
                    {certificates.map((certificate) => (
                      <CertificateCard key={certificate._id} certificate={certificate} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-slate-600 dark:text-slate-400">No certificates found</p>
                  </div>
                )}
              </div>
            )}

            {/* Tech Stack Content */}
            {activeTab === 'techstack' && (
              <div className="animate-fade-in">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 px-2 md:px-4 max-w-6xl mx-auto items-stretch">
                  {/* Dart */}
                  <div className="group w-full aspect-square p-6 rounded-2xl bg-slate-800/50 hover:bg-slate-700/50 transition-all duration-300 ease-in-out flex flex-col items-center justify-center gap-3 hover:scale-105 cursor-pointer shadow-lg hover:shadow-xl">
                    <div className="relative">
                      <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full opacity-0 group-hover:opacity-50 blur transition duration-300"></div>
                      <Image 
                        src="/tech-logos/dart.svg"
                        alt="Dart icon"
                        width={96}
                        height={96}
                        className="relative h-16 w-16 md:h-20 md:w-20 transform transition-transform duration-300"
                      />
                    </div>
                    <span className="text-slate-300 font-bold text-sm md:text-base tracking-wide group-hover:text-white transition-colors duration-300">
                      Dart
                    </span>
                  </div>

                  {/* Flutter */}
                  <div className="group w-full aspect-square p-6 rounded-2xl bg-slate-800/50 hover:bg-slate-700/50 transition-all duration-300 ease-in-out flex flex-col items-center justify-center gap-3 hover:scale-105 cursor-pointer shadow-lg hover:shadow-xl">
                    <div className="relative">
                      <div className="absolute -inset-2 bg-gradient-to-r from-blue-400 to-cyan-300 rounded-full opacity-0 group-hover:opacity-50 blur transition duration-300"></div>
                      <Image 
                        src="/tech-logos/flutter.svg"
                        alt="Flutter icon"
                        width={96}
                        height={96}
                        className="relative h-16 w-16 md:h-20 md:w-20 transform transition-transform duration-300"
                      />
                    </div>
                    <span className="text-slate-300 font-bold text-sm md:text-base tracking-wide group-hover:text-white transition-colors duration-300">
                      Flutter
                    </span>
                  </div>

                  {/* Firebase */}
                  <div className="group w-full aspect-square p-6 rounded-2xl bg-slate-800/50 hover:bg-slate-700/50 transition-all duration-300 ease-in-out flex flex-col items-center justify-center gap-3 hover:scale-105 cursor-pointer shadow-lg hover:shadow-xl">
                    <div className="relative">
                      <div className="absolute -inset-2 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-full opacity-0 group-hover:opacity-50 blur transition duration-300"></div>
                      <Image 
                        src="/tech-logos/firebase.svg"
                        alt="Firebase icon"
                        width={96}
                        height={96}
                        className="relative h-16 w-16 md:h-20 md:w-20 transform transition-transform duration-300"
                      />
                    </div>
                    <span className="text-slate-300 font-bold text-sm md:text-base tracking-wide group-hover:text-white transition-colors duration-300">
                      Firebase
                    </span>
                  </div>

                  {/* Node.js */}
                  <div className="group w-full aspect-square p-6 rounded-2xl bg-slate-800/50 hover:bg-slate-700/50 transition-all duration-300 ease-in-out flex flex-col items-center justify-center gap-3 hover:scale-105 cursor-pointer shadow-lg hover:shadow-xl">
                    <div className="relative">
                      <div className="absolute -inset-2 bg-gradient-to-r from-green-500 to-emerald-400 rounded-full opacity-0 group-hover:opacity-50 blur transition duration-300"></div>
                      <Image 
                        src="/tech-logos/nodejs.svg"
                        alt="Node.js icon"
                        width={96}
                        height={96}
                        className="relative h-16 w-16 md:h-20 md:w-20 transform transition-transform duration-300"
                      />
                    </div>
                    <span className="text-slate-300 font-bold text-sm md:text-base tracking-wide group-hover:text-white transition-colors duration-300">
                      Node.js
                    </span>
                  </div>

                  {/* GitHub */}
                  <div className="group w-full aspect-square p-6 rounded-2xl bg-slate-800/50 hover:bg-slate-700/50 transition-all duration-300 ease-in-out flex flex-col items-center justify-center gap-3 hover:scale-105 cursor-pointer shadow-lg hover:shadow-xl">
                    <div className="relative">
                      <div className="absolute -inset-2 bg-gradient-to-r from-white to-gray-200 rounded-full opacity-0 group-hover:opacity-60 blur transition duration-300"></div>
                      <Image 
                        src="/tech-logos/github.svg"
                        alt="GitHub icon"
                        width={96}
                        height={96}
                        className="relative h-16 w-16 md:h-20 md:w-20 transform transition-transform duration-300"
                      />
                    </div>
                    <span className="text-slate-300 font-bold text-sm md:text-base tracking-wide group-hover:text-white transition-colors duration-300">
                      GitHub
                    </span>
                  </div>

                  {/* Figma */}
                  <div className="group w-full aspect-square p-6 rounded-2xl bg-slate-800/50 hover:bg-slate-700/50 transition-all duration-300 ease-in-out flex flex-col items-center justify-center gap-3 hover:scale-105 cursor-pointer shadow-lg hover:shadow-xl">
                    <div className="relative">
                      <div className="absolute -inset-2 bg-gradient-to-r from-purple-500 to-pink-400 rounded-full opacity-0 group-hover:opacity-50 blur transition duration-300"></div>
                      <Image 
                        src="/tech-logos/figma.svg"
                        alt="Figma icon"
                        width={96}
                        height={96}
                        className="relative h-16 w-16 md:h-20 md:w-20 transform transition-transform duration-300"
                      />
                    </div>
                    <span className="text-slate-300 font-bold text-sm md:text-base tracking-wide group-hover:text-white transition-colors duration-300">
                      Figma
                    </span>
                  </div>

                  {/* Kotlin */}
                  <div className="group w-full aspect-square p-6 rounded-2xl bg-slate-800/50 hover:bg-slate-700/50 transition-all duration-300 ease-in-out flex flex-col items-center justify-center gap-3 hover:scale-105 cursor-pointer shadow-lg hover:shadow-xl">
                    <div className="relative">
                      <div className="absolute -inset-2 bg-gradient-to-r from-purple-600 to-orange-500 rounded-full opacity-0 group-hover:opacity-50 blur transition duration-300"></div>
                      <Image 
                        src="/tech-logos/kotlin.svg"
                        alt="Kotlin icon"
                        width={96}
                        height={96}
                        className="relative h-16 w-16 md:h-20 md:w-20 transform transition-transform duration-300"
                      />
                    </div>
                    <span className="text-slate-300 font-bold text-sm md:text-base tracking-wide group-hover:text-white transition-colors duration-300">
                      Kotlin
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Contact Me Section */}
      <section id="contact" className="py-16 px-6 md:px-10 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Let's Connect!
          </h2>
          <p className="text-lg md:text-xl text-slate-300 mb-12 max-w-2xl mx-auto">
            I'm always open to new opportunities and interesting conversations. 
            Feel free to reach out!
          </p>
          
          {/* Contact Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* Email */}
            <a href="mailto:roeslimarvin@gmail.com" className="group p-6 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl hover:bg-white/20 transition-all duration-300 hover:scale-105 cursor-pointer block">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Email</h3>
              <p className="text-slate-300 group-hover:text-white transition-colors duration-300">
                roeslimarvin@gmail.com
              </p>
            </a>

            {/* LinkedIn */}
            <a href="https://www.linkedin.com/in/arvinroeslim" target="_blank" rel="noopener noreferrer" className="group p-6 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl hover:bg-white/20 transition-all duration-300 hover:scale-105 cursor-pointer block">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.047-1.852-3.047-1.853 0-2.136 1.445-2.136 2.939v5.677H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">LinkedIn</h3>
              <p className="text-slate-300 group-hover:text-white transition-colors duration-300">
                Connect with me
              </p>
            </a>

            {/* GitHub */}
            <a href="https://github.com/arvinr11" target="_blank" rel="noopener noreferrer" className="group p-6 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl hover:bg-white/20 transition-all duration-300 hover:scale-105 cursor-pointer block">
              <div className="w-16 h-16 bg-gradient-to-r from-gray-800 to-gray-900 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.301 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">GitHub</h3>
              <p className="text-slate-300 group-hover:text-white transition-colors duration-300">
                Check out my work
              </p>
            </a>
          </div>

          
        </div>
      </section>
      
        
        {/* Footer */}
        <div className="text-center py-8 mb-20">
          <p className="text-slate-400 text-sm">
            © 2025 Arvin Roeslim. All rights reserved.
          </p>
        </div>
        
        {/* Bottom Navigation */}
      <BottomNav />
    </main>
  );  
}