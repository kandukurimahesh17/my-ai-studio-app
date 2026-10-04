import React from 'react';
import { AllSitesScreen } from '../AllSitesScreen';

interface MoreAppsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (url: string) => void;
}

export const MoreAppsModal: React.FC<MoreAppsModalProps> = ({ isOpen, onClose, onNavigate }) => {
  return (
    <AllSitesScreen
      isOpen={isOpen}
      onClose={onClose}
      onNavigate={onNavigate}
      existingShortcutIds={[]}
      onAddShortcut={(shortcut) => {
        try {
          const saved = localStorage.getItem('lemon_home_shortcuts_v4');
          const current = saved ? JSON.parse(saved) : [];
          if (!current.some((s: any) => s.id === shortcut.id)) {
            const withoutMore = current.filter((s: any) => s.id !== 'more');
            const moreItem = current.find((s: any) => s.id === 'more') || { id: 'more', name: 'More', url: 'lemon://more', type: 'action' };
            localStorage.setItem('lemon_home_shortcuts_v4', JSON.stringify([...withoutMore, {
              id: shortcut.id,
              name: shortcut.name,
              url: shortcut.url,
              type: shortcut.type,
            }, moreItem]));
          }
        } catch {}
      }}
    />
  );
};
