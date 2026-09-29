import React, { useState, useEffect } from 'react';
import { NexusLogo } from './NexusLogo';
import { ThemeMode, PageId } from '../types';
import {
  Sun,
  Moon,
  ArrowRight,
  Menu,
  X,
  Sparkles,
  Activity,
  ShieldAlert,
  Bell,
  BellRing,
} from 'lucide-react';

interface NavbarProps {
  activePage: PageId;
  onNavigate: (page: PageId) => void;
  theme: ThemeMode;
  onToggleTheme: () => void;
  onExploreSystem: () => void;
  unreadNotificationsCount?: number;
  onOpenNotifications?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activePage,
  onNavigate,
  theme,
  onToggleTheme,
  onExploreSystem,
  unreadNotificationsCount = 0,
  onOpenNotifications,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: { id: PageId; label: string; highlight?: boolean; badge?: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'disaster', label: 'Disaster Control', highlight: true, badge: 'EARLY WARNING' },
    { id: 'architecture', label: 'Architecture' },
    { id: 'infrastructure', label: 'Infrastructure' },
    { id: 'command-center', label: 'Command Center' },
    { id: 'sustainability', label: 'Sustainability' },
  ];

  const handleLinkClick = (pageId: PageId) => {
    setMobileMenuOpen(false);
    onNavigate(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'py-2.5 bg-[#050914]/95 dark:bg-[#050914]/95 light:bg-white/95 backdrop-blur-xl border-b border-cyan-500/20 shadow-lg shadow-black/30'
          : 'py-4 bg-[#050914]/70 backdrop-blur-md border-b border-slate-800/40'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          {/* Left: Brand with Logo & Subtitle */}
          <button
            onClick={() => handleLinkClick('home')}
            className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-lg p-1 transition-all text-left"
          >
            <NexusLogo size={40} showText={true} subtitle={true} />
          </button>

          {/* Center: Desktop Navigation Links as Separate Pages */}
          <nav className="hidden lg:flex items-center gap-1.5 p-1 rounded-2xl bg-slate-950/70 border border-slate-800/80 shadow-inner">
            {navLinks.map((link) => {
              const isActive = activePage === link.id;

              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`text-xs font-semibold uppercase tracking-wider px-3.5 py-1.5 rounded-xl transition-all duration-200 flex items-center gap-1.5 relative ${
                    isActive
                      ? link.highlight
                        ? 'bg-red-950/90 text-red-200 border border-red-500/60 shadow-lg shadow-red-950/60 font-bold scale-[1.02]'
                        : 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30 font-bold scale-[1.02]'
                      : link.highlight
                      ? 'text-red-400 hover:text-red-300 hover:bg-red-950/40'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  {link.highlight && (
                    <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse shrink-0" />
                  )}
                  <span>{link.label}</span>
                  {link.highlight && (
                    <span
                      className={`text-[9px] font-mono px-1.5 py-0.2 rounded-full font-bold ml-1 hidden xl:inline-block ${
                        isActive
                          ? 'bg-red-900 text-red-100'
                          : 'bg-red-950/80 text-red-300 border border-red-500/40'
                      }`}
                    >
                      LIVE
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right: Actions (Notification Bell, Theme Toggle & Explore System Button) */}
          <div className="flex items-center gap-2.5">
            {/* Global Notification Centre Trigger Button */}
            {onOpenNotifications && (
              <button
                onClick={onOpenNotifications}
                className={`relative p-2 rounded-xl border transition-all duration-200 flex items-center justify-center ${
                  unreadNotificationsCount > 0
                    ? 'border-red-500/50 bg-red-950/40 text-red-300 hover:bg-red-900/50 shadow-sm shadow-red-950/50'
                    : 'border-slate-700/50 bg-slate-900/60 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/40'
                }`}
                title={`City Notification Centre (${unreadNotificationsCount} unread)`}
                aria-label="Open City Notification Centre"
              >
                {unreadNotificationsCount > 0 ? (
                  <BellRing className="w-4 h-4 text-red-400 animate-pulse" />
                ) : (
                  <Bell className="w-4 h-4" />
                )}

                {unreadNotificationsCount > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-red-500 text-white text-[10px] font-mono font-bold flex items-center justify-center shadow-md animate-pulse">
                    {unreadNotificationsCount}
                  </span>
                )}
              </button>
            )}

            {/* Quick Disaster Direct Button on Mobile / Header */}
            {activePage !== 'disaster' && (
              <button
                onClick={() => handleLinkClick('disaster')}
                className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-950/60 border border-red-500/40 text-red-300 text-xs font-mono hover:bg-red-900/60 transition-colors"
                title="Launch Disaster Control Room"
              >
                <ShieldAlert className="w-3.5 h-3.5 text-red-400 animate-pulse" />
                <span className="hidden xl:inline">Emergency</span>
                <span>Room</span>
              </button>
            )}

            {/* Theme Toggle Button */}
            <button
              onClick={onToggleTheme}
              aria-label="Toggle Theme"
              className="p-2 rounded-xl border border-slate-700/50 dark:border-slate-700/50 light:border-slate-300 bg-slate-900/60 dark:bg-slate-900/60 light:bg-slate-100 text-slate-300 dark:text-slate-300 light:text-slate-700 hover:text-cyan-400 hover:border-cyan-500/40 transition-all duration-200"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400 hover:rotate-90 transition-transform duration-300" />
              ) : (
                <Moon className="w-4 h-4 text-cyan-600 hover:-rotate-12 transition-transform duration-300" />
              )}
            </button>

            {/* Explore System Primary Action */}
            <button
              onClick={onExploreSystem}
              className="relative group hidden sm:inline-flex items-center gap-2 px-3.5 py-2 text-xs font-bold tracking-wider uppercase rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-cyan-500 bg-[length:200%_auto] hover:bg-right text-slate-950 font-mono shadow-md shadow-cyan-500/20 border border-cyan-300/40 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            >
              <Activity className="w-3.5 h-3.5 animate-pulse text-slate-950" />
              <span>Explore Twin</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Mobile Menu"
              className="lg:hidden p-2 rounded-xl border border-slate-700 dark:border-slate-700 light:border-slate-300 bg-slate-900/80 dark:bg-slate-900/80 light:bg-slate-100 text-slate-300 dark:text-slate-300 light:text-slate-700"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu with all Separate Pages */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 p-4 rounded-2xl bg-[#080f20]/98 dark:bg-[#080f20]/98 light:bg-white/98 border border-cyan-500/30 backdrop-blur-2xl shadow-2xl animate-in fade-in slide-in-from-top-4 duration-200">
            <div className="text-[11px] font-mono text-slate-500 uppercase mb-2 px-3">
              City Navigation Pages
            </div>
            <div className="flex flex-col gap-1.5">
              {/* Notification Centre Link in Mobile */}
              {onOpenNotifications && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenNotifications();
                  }}
                  className="px-3 py-2.5 rounded-xl text-xs font-mono font-bold uppercase transition-all flex items-center justify-between text-left bg-gradient-to-r from-red-950/70 to-slate-900 border border-red-500/40 text-red-200 mb-1"
                >
                  <div className="flex items-center gap-2">
                    <BellRing className="w-4 h-4 text-red-400 animate-pulse" />
                    <span>Notification Centre</span>
                  </div>
                  {unreadNotificationsCount > 0 && (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-red-600 text-white font-bold">
                      {unreadNotificationsCount} NEW
                    </span>
                  )}
                </button>
              )}

              {navLinks.map((link) => {
                const isActive = activePage === link.id;

                return (
                  <button
                    key={link.id}
                    onClick={() => handleLinkClick(link.id)}
                    className={`px-3 py-2.5 rounded-xl text-xs font-mono font-bold uppercase transition-all flex items-center justify-between text-left ${
                      isActive
                        ? link.highlight
                          ? 'bg-red-950 text-red-200 border border-red-500/50'
                          : 'bg-cyan-500 text-slate-950'
                        : link.highlight
                        ? 'text-red-400 hover:bg-red-950/30'
                        : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {link.highlight && (
                        <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
                      )}
                      <span>{link.label}</span>
                    </div>
                    {link.badge && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-red-950 border border-red-500/40 text-red-300 font-bold">
                        {link.badge}
                      </span>
                    )}
                  </button>
                );
              })}

              <div className="pt-3 border-t border-slate-800 mt-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onExploreSystem();
                  }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-md shadow-cyan-500/20 font-mono"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Launch System Digital Twin</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
