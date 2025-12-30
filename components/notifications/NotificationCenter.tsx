'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, X, AlertCircle, CheckCircle2, Info } from 'lucide-react';
import { format } from 'date-fns';

interface Notification {
  id: string;
  type: 'success' | 'warning' | 'info' | 'error';
  title: string;
  message: string;
  timestamp: number;
  read: boolean;
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'success',
    title: 'Strategy Executed',
    message: 'Your balanced strategy has been successfully deployed across 4 protocols.',
    timestamp: Date.now() - 3600000,
    read: false,
  },
  {
    id: '2',
    type: 'info',
    title: 'APY Update',
    message: 'Aave V3 APY increased from 5.2% to 6.1%. Consider rebalancing.',
    timestamp: Date.now() - 7200000,
    read: false,
  },
  {
    id: '3',
    type: 'warning',
    title: 'Rebalance Recommended',
    message: 'Your portfolio allocation deviates from target by 8%. Rebalance to optimize returns.',
    timestamp: Date.now() - 14400000,
    read: true,
  },
  {
    id: '4',
    type: 'success',
    title: 'Rewards Claimed',
    message: 'Successfully claimed $150 in rewards from Lido staking.',
    timestamp: Date.now() - 86400000,
    read: true,
  },
];

const typeConfig = {
  success: { icon: CheckCircle2, color: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/20' },
  warning: { icon: AlertCircle, color: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/20' },
  info: { icon: Info, color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
  error: { icon: AlertCircle, color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/20' },
};

export function NotificationCenter() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState(mockNotifications);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n =>
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const removeNotification = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  return (
    <div className="relative">
      {/* Bell Button - Glider.fi style */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-xl bg-[#1a1a1a] border border-[#262626] hover:bg-[#262626] transition-all"
      >
        <Bell className="w-5 h-5 text-[#a1a1a1]" />
        {unreadCount > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center text-xs font-bold text-white"
          >
            {unreadCount}
          </motion.span>
        )}
      </button>

      {/* Notification Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Panel - Glider.fi style */}
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              className="absolute right-0 mt-2 w-96 max-h-[600px] bg-[#1a1a1a] border border-[#262626] rounded-xl shadow-2xl z-50 overflow-hidden flex flex-col"
            >
              {/* Header */}
              <div className="p-4 border-b border-[#262626]">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-base font-semibold text-white">Notifications</h3>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-1 hover:bg-[#262626] rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5 text-[#a1a1a1]" />
                  </button>
                </div>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="text-sm text-emerald-400 hover:text-emerald-300 transition-colors"
                  >
                    Mark all as read
                  </button>
                )}
              </div>

              {/* Notifications List - Glider.fi style */}
              <div className="flex-1 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="p-8 text-center">
                    <Bell className="w-12 h-12 text-[#262626] mx-auto mb-3" />
                    <p className="text-[#6b7280] text-sm">No notifications</p>
                  </div>
                ) : (
                  <div className="divide-y divide-[#262626]">
                    {notifications.map((notification) => {
                      const config = typeConfig[notification.type];
                      const Icon = config.icon;

                      return (
                        <motion.div
                          key={notification.id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          onClick={() => markAsRead(notification.id)}
                          className={`p-4 hover:bg-[#0d0d0d] transition-colors cursor-pointer ${
                            !notification.read ? 'bg-[#0d0d0d]/50' : ''
                          }`}
                        >
                          <div className="flex gap-3">
                            <div className={`w-9 h-9 rounded-lg ${config.bg} border ${config.border} flex items-center justify-center shrink-0`}>
                              <Icon className={`w-4 h-4 ${config.color}`} />
                            </div>

                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2 mb-1">
                                <h4 className="text-sm font-medium text-white">
                                  {notification.title}
                                </h4>
                                {!notification.read && (
                                  <div className="w-2 h-2 rounded-full bg-emerald-400 shrink-0 mt-1" />
                                )}
                              </div>

                              <p className="text-sm text-[#a1a1a1] mb-2 leading-relaxed">
                                {notification.message}
                              </p>

                              <div className="flex items-center justify-between">
                                <span className="text-xs text-[#6b7280]">
                                  {format(new Date(notification.timestamp), 'MMM dd, HH:mm')}
                                </span>

                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    removeNotification(notification.id);
                                  }}
                                  className="text-xs text-[#6b7280] hover:text-red-400 transition-colors"
                                >
                                  Dismiss
                                </button>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
