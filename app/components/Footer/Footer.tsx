interface FooterProps {
  hasBottomNav?: boolean;
  topMargin?: 'small' | 'large';
}

export default function Footer({ hasBottomNav = false, topMargin = 'small' }: FooterProps) {
  return (
    <>
      {/* Footer Divider */}
      <div className={`max-w-8xl mx-auto px-4 md:px-6 ${topMargin === 'large' ? 'mt-16' : 'mt-8'} mb-2`}>
        <div className="h-[2px] rounded-full bg-gradient-to-r from-transparent via-slate-400/60 to-transparent" />
      </div>

      {/* Footer */}
      <div className={`text-center pt-4 pb-4 ${hasBottomNav ? 'mb-24' : 'mb-2'}`}>
        <p className="text-slate-400 text-sm">
          © 2025 Arvin Roeslim. All rights reserved.
        </p>
      </div>
    </>
  );
}
