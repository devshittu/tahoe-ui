// src/app/components/floating-panel/page.tsx
'use client';

import FloatingControlPanel from '@/components/ui/FloatingControlPanel';
import { ControlAction } from '@/types/fcp';
import { useTheme } from 'next-themes';
import React, { useState, useEffect } from 'react';
import {
  FiHome,
  FiShoppingCart,
  FiHeart,
  FiSettings,
  FiUser,
  FiMessageCircle,
  FiBell,
  FiSun,
  FiMoon,
  FiInfo,
} from 'react-icons/fi';

export default function FloatingPanelDemo() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [cartCount, setCartCount] = useState(3);
  const [messageCount, setMessageCount] = useState(5);
  const [notificationCount, setNotificationCount] = useState(12);
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        setMessageCount((prev) => prev + 1);
      }
      if (Math.random() > 0.8) {
        setNotificationCount((prev) => prev + 1);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  const mainActions: ControlAction[] = [
    {
      id: 'home',
      icon: <FiHome />,
      label: 'Home',
      onClick: () => console.log('Navigate to home'),
      variant: 'default',
    },
    {
      id: 'messages',
      icon: (
        <div className="relative">
          <FiMessageCircle />
          {messageCount > 0 && (
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-[8px] flex items-center justify-center text-white font-bold">
              {messageCount > 9 ? '9+' : messageCount}
            </span>
          )}
        </div>
      ),
      label: `Messages (${messageCount})`,
      onClick: () => {
        console.log('Open messages');
        setMessageCount(0);
      },
      variant: messageCount > 0 ? 'primary' : 'default',
    },
    {
      id: 'cart',
      icon: (
        <div className="relative">
          <FiShoppingCart />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full text-[8px] flex items-center justify-center text-white font-bold">
              {cartCount}
            </span>
          )}
        </div>
      ),
      label: `Cart (${cartCount} items)`,
      onClick: () => console.log('Open cart'),
      variant: 'default',
    },
    {
      id: 'favorites',
      icon: (
        <FiHeart
          className={`transition-all duration-200 ${isFavorited ? 'fill-red-500 text-red-500' : ''}`}
        />
      ),
      label: isFavorited ? 'Remove from favorites' : 'Add to favorites',
      onClick: () => setIsFavorited(!isFavorited),
      variant: isFavorited ? 'danger' : 'default',
    },
  ];

  const notificationActions: ControlAction[] = [
    {
      id: 'notifications',
      icon: (
        <div className="relative">
          <FiBell />
          {notificationCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[9px] flex items-center justify-center text-white font-bold">
              {notificationCount > 99 ? '99+' : notificationCount}
            </span>
          )}
        </div>
      ),
      label: `Notifications (${notificationCount})`,
      onClick: () => {
        console.log('Open notifications');
        setNotificationCount(0);
      },
      variant: notificationCount > 0 ? 'danger' : 'default',
    },
  ];

  const settingsActions: ControlAction[] = [
    {
      id: 'theme',
      icon: mounted && resolvedTheme === 'dark' ? <FiSun /> : <FiMoon />,
      label: `Switch to ${resolvedTheme === 'dark' ? 'light' : 'dark'} mode`,
      onClick: toggleTheme,
      variant: 'primary',
    },
    {
      id: 'profile',
      icon: <FiUser />,
      label: 'Profile Settings',
      onClick: () => console.log('Open profile'),
      variant: 'default',
    },
    {
      id: 'settings',
      icon: <FiSettings />,
      label: 'App Settings',
      onClick: () => console.log('Open settings'),
      variant: 'default',
    },
  ];

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50 to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-colors duration-500">
      {/* Header */}
      <header className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            Floating Control Panel Demo
          </h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            Featuring confirmation system, pill & rounded shapes, smooth
            animations
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Stats Cards */}
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 border border-slate-200 dark:border-slate-700">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
              Real-time Activity
            </h3>
            <div className="space-y-4">
              <StatItem label="Cart Items" value={cartCount} color="blue" />
              <StatItem
                label="Unread Messages"
                value={messageCount}
                color="green"
              />
              <StatItem
                label="Notifications"
                value={notificationCount}
                color="red"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 border border-slate-200 dark:border-slate-700">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
              Quick Actions
            </h3>
            <div className="space-y-3">
              <ActionButton
                label="Add to Cart"
                onClick={() => setCartCount((prev) => prev + 1)}
                color="blue"
              />
              <ActionButton
                label="Clear Messages"
                onClick={() => setMessageCount(0)}
                color="green"
                disabled={messageCount === 0}
              />
              <ActionButton
                label="Clear Notifications"
                onClick={() => setNotificationCount(0)}
                color="red"
                disabled={notificationCount === 0}
              />
            </div>
          </div>
        </div>

        {/* Info Box with Confirmation Feature */}
        <div className="mt-8 bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-950/30 dark:to-blue-950/30 border border-cyan-200 dark:border-cyan-800 rounded-xl p-6">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 mt-1">
              <div className="w-10 h-10 rounded-full bg-cyan-500/20 dark:bg-cyan-400/20 flex items-center justify-center">
                <FiInfo className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-cyan-900 dark:text-cyan-100 mb-2">
                ✨ New Feature: Confirmation System
              </h3>
              <ul className="space-y-2 text-sm text-cyan-800 dark:text-cyan-200">
                <li className="flex items-start gap-2">
                  <span className="text-cyan-500 mt-1">•</span>
                  <span>
                    <strong>Two-Step Close:</strong> Click the X button once to
                    see confirmation popover
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-500 mt-1">•</span>
                  <span>
                    <strong>Visual Feedback:</strong> Button turns red, icon
                    rotates, ring appears
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-500 mt-1">•</span>
                  <span>
                    <strong>Auto-Reset:</strong>{' '}
                    {
                      "If you don't click again within 5s, it resets automatically"
                    }
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-500 mt-1">•</span>
                  <span>
                    <strong>Progress Bar:</strong> Watch the countdown in the
                    confirmation popover
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-500 mt-1">•</span>
                  <span>
                    <strong>Prevents Accidents:</strong> No more accidental
                    closes!
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Original Info Box */}
        <div className="mt-6 bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800/30 dark:to-slate-700/30 border border-slate-200 dark:border-slate-700 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
            💡 Control Panels Guide
          </h3>
          <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
            <li>
              • <strong>Bottom Right (Pill, Horizontal):</strong> Main
              navigation with confirmation
            </li>
            <li>
              • <strong>Top Right (Rounded, Vertical):</strong> Notifications
            </li>
            <li>
              • <strong>Top Left (Pill, Vertical):</strong> Settings (no close
              button)
            </li>
            <li>
              • <strong>Confirmation:</strong> Enabled by default, customizable
              timeout
            </li>
          </ul>
        </div>
      </main>

      {/* Multiple Floating Panels with Confirmation */}
      <FloatingControlPanel
        size="lg"
        position="bottom-right"
        orientation="horizontal"
        shape="pill"
        actions={mainActions}
        collapsible={true}
        closable={true}
        confirmClose={true}
        confirmTimeout={5000}
        closeConfirmMessage="Click again to close panel"
        showTooltips={true}
      />

      <FloatingControlPanel
        size="md"
        position="top-right"
        orientation="vertical"
        shape="rounded"
        actions={notificationActions}
        collapsible={true}
        closable={true}
        confirmClose={true}
        confirmTimeout={5000}
        showTooltips={true}
      />

      <FloatingControlPanel
        size="md"
        position="top-left"
        orientation="vertical"
        shape="pill"
        actions={settingsActions}
        collapsible={true}
        closable={false}
        showTooltips={true}
      />
    </div>
  );
}

// Helper Components
interface StatItemProps {
  label: string;
  value: number;
  color: 'blue' | 'green' | 'red';
}

function StatItem({ label, value, color }: StatItemProps) {
  const colors = {
    blue: 'bg-blue-100 dark:bg-blue-900/30 text-blue-900 dark:text-blue-100',
    green:
      'bg-green-100 dark:bg-green-900/30 text-green-900 dark:text-green-100',
    red: 'bg-red-100 dark:bg-red-900/30 text-red-900 dark:text-red-100',
  };

  return (
    <div className="flex items-center justify-between">
      <span className="text-slate-700 dark:text-slate-300">{label}</span>
      <span className={`px-3 py-1 rounded-full font-semibold ${colors[color]}`}>
        {value}
      </span>
    </div>
  );
}

interface ActionButtonProps {
  label: string;
  onClick: () => void;
  color: 'blue' | 'green' | 'red';
  disabled?: boolean;
}

function ActionButton({ label, onClick, color, disabled }: ActionButtonProps) {
  const colors = {
    blue: 'bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 dark:disabled:bg-blue-800',
    green:
      'bg-green-600 hover:bg-green-700 disabled:bg-green-300 dark:disabled:bg-green-800',
    red: 'bg-red-600 hover:bg-red-700 disabled:bg-red-300 dark:disabled:bg-red-800',
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        w-full px-4 py-2 rounded-lg text-white font-medium
        transition-colors duration-200
        disabled:cursor-not-allowed disabled:opacity-50
        ${colors[color]}
      `}
    >
      {label}
    </button>
  );
}
