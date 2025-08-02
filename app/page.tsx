import SplitText from "./components/TextAnimations/SplitText/SplitText";

export default function Home() {
  return (
    <main>
      {/* Home Section */}
      <section id="home" className="min-h-screen flex items-center justify-center px-6 md:px-10">
        <div className="container mx-auto flex flex-col-reverse md:flex-row items-center gap-12">
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-slate-900 dark:text-white">
                <SplitText 
                  text="Welcome to My Portfolio"
                  className="text-2xl font-semibold text-center"
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
              
              <p className="mt-4 text-lg text-slate-600 dark:text-slate-400 max-w-xl mx-auto md:mx-0">
                Mobile Developer
              </p>
            </div>
            </div>
      </section>  
    </main>
  );
}
