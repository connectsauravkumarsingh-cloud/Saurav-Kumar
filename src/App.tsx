import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { ThemeMode, PageId } from './types';
import { CityNotification } from './types/disaster';
import { INITIAL_NOTIFICATIONS, SIMULATION_ALERT_TEMPLATES } from './data/notificationsData';
import { playNotificationChime, playEmergencySiren } from './utils/audioAlert';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ExploreSystemModal } from './components/ExploreSystemModal';
import { NotificationCenterDrawer } from './components/notifications/NotificationCenterDrawer';
import { NotificationToastBanner } from './components/notifications/NotificationToastBanner';
import { NexusAiChatbot } from './components/chat/NexusAiChatbot';
import { HomePage } from './pages/HomePage';
import { DisasterPage } from './pages/DisasterPage';
import { ArchitecturePage } from './pages/ArchitecturePage';
import { InfrastructurePage } from './pages/InfrastructurePage';
import { CommandCenterPage } from './pages/CommandCenterPage';
import { SustainabilityPage } from './pages/SustainabilityPage';

export default function App() {
  const [theme, setTheme] = useState<ThemeMode>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('nexus_city_theme') as ThemeMode;
      return saved === 'light' ? 'light' : 'dark';
    }
    return 'dark';
  });

  const getPageFromHash = (): PageId => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      if (
        hash === 'disaster' ||
        hash === 'disaster-control' ||
        hash === 'disaster-intelligence'
      ) {
        return 'disaster';
      }
      if (hash === 'architecture' || hash === 'cloud') {
        return 'architecture';
      }
      if (hash === 'infrastructure' || hash === 'digital-twin') {
        return 'infrastructure';
      }
      if (hash === 'command-center' || hash === 'operations') {
        return 'command-center';
      }
      if (hash === 'sustainability' || hash === 'green') {
        return 'sustainability';
      }
    }
    return 'home';
  };

  const [currentPage, setCurrentPage] = useState<PageId>(getPageFromHash);
  const [isExploreModalOpen, setIsExploreModalOpen] = useState(false);
  const [isNotificationCenterOpen, setIsNotificationCenterOpen] = useState(false);
  const [latestToastNotification, setLatestToastNotification] = useState<CityNotification | null>(null);

  // Sound preference state
  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('nexus_city_sound_enabled');
      return saved !== 'false';
    }
    return true;
  });

  // Notifications state
  const [notifications, setNotifications] = useState<CityNotification[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('nexus_city_notifications');
        if (saved) return JSON.parse(saved);
      } catch (e) {
        console.debug('Failed to load notifications from storage', e);
      }
    }
    return INITIAL_NOTIFICATIONS;
  });

  // Persist notifications & sound settings
  useEffect(() => {
    try {
      localStorage.setItem('nexus_city_notifications', JSON.stringify(notifications));
    } catch (e) {
      console.debug('Failed to save notifications', e);
    }
  }, [notifications]);

  useEffect(() => {
    try {
      localStorage.setItem('nexus_city_sound_enabled', String(soundEnabled));
    } catch (e) {
      console.debug('Failed to save sound preference', e);
    }
  }, [soundEnabled]);

  // Sync hash changes (e.g. browser back/forward buttons or direct links)
  useEffect(() => {
    const handleHashChange = () => {
      const page = getPageFromHash();
      setCurrentPage(page);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Theme synchronization
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
    localStorage.setItem('nexus_city_theme', theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  const toggleSound = useCallback(() => {
    setSoundEnabled((prev) => !prev);
  }, []);

  const handleNavigate = useCallback((page: PageId) => {
    setCurrentPage(page);
    if (typeof window !== 'undefined') {
      window.location.hash = page === 'home' ? '' : page;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  const handleOpenExploreModal = useCallback(() => {
    setIsExploreModalOpen(true);
  }, []);

  const handleCloseExploreModal = useCallback(() => {
    setIsExploreModalOpen(false);
  }, []);

  const handleOpenNotifications = useCallback(() => {
    setIsNotificationCenterOpen(true);
  }, []);

  const handleCloseNotifications = useCallback(() => {
    setIsNotificationCenterOpen(false);
  }, []);

  const handleMarkAsRead = useCallback((id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: !n.isRead } : n))
    );
  }, []);

  const handleMarkAllAsRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  }, []);

  const handleDeleteNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const handleResetNotifications = useCallback(() => {
    setNotifications(INITIAL_NOTIFICATIONS);
  }, []);

  // Trigger a simulated incoming live disaster alert
  const handleSimulateNewAlert = useCallback(() => {
    const randomTemplate =
      SIMULATION_ALERT_TEMPLATES[
        Math.floor(Math.random() * SIMULATION_ALERT_TEMPLATES.length)
      ];

    const newAlert: CityNotification = {
      ...randomTemplate,
      id: `alert-sim-${Date.now()}`,
      timestamp: 'Just now',
      timeIso: new Date().toISOString(),
      isRead: false,
    };

    setNotifications((prev) => [newAlert, ...prev]);
    setLatestToastNotification(newAlert);

    // Audio cue
    if (soundEnabled) {
      if (newAlert.severity === 'critical' || newAlert.severity === 'warning') {
        playEmergencySiren();
      } else {
        playNotificationChime();
      }
    }

    // Optional Browser Notification
    if (
      typeof window !== 'undefined' &&
      'Notification' in window &&
      Notification.permission === 'granted'
    ) {
      try {
        new Notification(`NEXUS ALERT: ${newAlert.title}`, {
          body: `${newAlert.location} — ${newAlert.message}`,
          icon: '/favicon.ico',
        });
      } catch (e) {
        console.debug('Browser notification failed', e);
      }
    }
  }, [soundEnabled]);

  const unreadCount = useMemo(() => {
    return notifications.filter((n) => !n.isRead).length;
  }, [notifications]);

  return (
    <div
      className={`min-h-screen transition-colors duration-300 flex flex-col justify-between ${
        theme === 'dark'
          ? 'bg-[#050914] text-slate-100'
          : 'bg-[#f8fafc] text-slate-900 light'
      }`}
    >
      {/* Floating Glass Navbar with Page Navigation & Notification Bell */}
      <Navbar
        activePage={currentPage}
        onNavigate={handleNavigate}
        theme={theme}
        onToggleTheme={toggleTheme}
        onExploreSystem={handleOpenExploreModal}
        unreadNotificationsCount={unreadCount}
        onOpenNotifications={handleOpenNotifications}
      />

      {/* Real-time High-Priority Alert Toast Banner */}
      <NotificationToastBanner
        notification={latestToastNotification}
        onDismiss={() => setLatestToastNotification(null)}
        onOpenCenter={handleOpenNotifications}
      />

      {/* Main Page Viewport */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage
            onNavigate={handleNavigate}
            onOpenNotifications={handleOpenNotifications}
          />
        )}

        {currentPage === 'disaster' && (
          <DisasterPage
            onNavigate={handleNavigate}
            onOpenNotifications={handleOpenNotifications}
          />
        )}

        {currentPage === 'architecture' && (
          <ArchitecturePage onNavigate={handleNavigate} />
        )}

        {currentPage === 'infrastructure' && (
          <InfrastructurePage onNavigate={handleNavigate} />
        )}

        {currentPage === 'command-center' && (
          <CommandCenterPage
            onNavigate={handleNavigate}
            onExploreSystem={handleOpenExploreModal}
          />
        )}

        {currentPage === 'sustainability' && (
          <SustainabilityPage onNavigate={handleNavigate} />
        )}
      </main>

      {/* Persistent Footer with Direct Page Links */}
      <Footer onNavigate={handleNavigate} />

      {/* Full-Screen Digital Twin Diagnostics Modal */}
      <ExploreSystemModal
        isOpen={isExploreModalOpen}
        onClose={handleCloseExploreModal}
      />

      {/* Slide-Over City Notification Centre Drawer */}
      <NotificationCenterDrawer
        isOpen={isNotificationCenterOpen}
        onClose={handleCloseNotifications}
        notifications={notifications}
        onMarkAsRead={handleMarkAsRead}
        onMarkAllAsRead={handleMarkAllAsRead}
        onDeleteNotification={handleDeleteNotification}
        onSimulateNewAlert={handleSimulateNewAlert}
        onResetNotifications={handleResetNotifications}
        onNavigatePage={handleNavigate}
        soundEnabled={soundEnabled}
        onToggleSound={toggleSound}
      />

      {/* Floating NEXUS AI Urban Intelligence Assistant Chatbot */}
      <NexusAiChatbot onNavigatePage={handleNavigate} />
    </div>
  );
}
