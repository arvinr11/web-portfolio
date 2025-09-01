import { Home, User, ChevronsLeftRight, Mail } from 'lucide-react';

const navItems = [
  { icon: Home, label: 'Home', href: '#home' },
  { icon: User, label: 'About Me', href: '#about' },
  { icon: ChevronsLeftRight, label: 'Portfolio', href: '#portfolio' },
  { icon: Mail, label: 'Contact', href: '#contact' },
];

export default function BottomNav() {
  return (
         <nav className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
       <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-full px-12 py-3 shadow-lg border border-slate-200 dark:border-slate-700">
         <div className="flex items-center gap-8">
           {navItems.map((item, index) => {
             const Icon = item.icon;
             return (
               <div key={index} className="relative group">
                 <a
                   href={item.href}
                   className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200 group"
                 >
                   <Icon size={20} className="text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors" />
                 </a>
                 
                 {/* Tooltip */}
                 <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                   {item.label}
                   
                 </div>
               </div>
             );
           })}
         </div>
      </div>
    </nav>
  );
}
