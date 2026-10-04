import React, { useState } from 'react';
import { X, ShieldCheck, Lock, Key, Cookie, Bell, MapPin, Camera, Mic } from 'lucide-react';

interface CertificateModalProps {
  url: string;
  isOpen: boolean;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({ url, isOpen, onClose }) => {
  const [permissions, setPermissions] = useState({
    location: false,
    notifications: true,
    camera: false,
    microphone: false,
  });

  if (!isOpen) return null;

  let hostname = 'lemon.local';
  try {
    if (url.startsWith('http')) {
      hostname = new URL(url).hostname;
    } else {
      hostname = url.replace('lemon://', '').replace('aura://', '');
    }
  } catch {
    hostname = url;
  }

  const togglePermission = (key: keyof typeof permissions) => {
    setPermissions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl max-w-md w-full p-6 shadow-2xl text-neutral-100 text-xs">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-semibold text-sm text-white">Connection is Secure</h3>
              <p className="text-[11px] text-neutral-400">{hostname}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-neutral-400 hover:text-white p-1">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Certificate Details */}
        <div className="py-4 space-y-3">
          <div className="bg-neutral-950 p-3 rounded-xl border border-neutral-800 space-y-1.5 font-mono text-[11px]">
            <div className="flex justify-between">
              <span className="text-neutral-400">Security Protocol:</span>
              <span className="text-emerald-400 font-semibold">TLS 1.3</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-400">Cipher Suite:</span>
              <span className="text-neutral-200">TLS_AES_256_GCM</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-400">Key Exchange:</span>
              <span className="text-neutral-200">ECDHE_X25519 (256 bits)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-400">Certificate Issuer:</span>
              <span className="text-neutral-200">DigiCert Global Root CA</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-400">Valid Until:</span>
              <span className="text-neutral-200">2027-10-14</span>
            </div>
          </div>

          {/* Cookies in Use */}
          <div className="flex items-center justify-between p-3 bg-neutral-950/60 rounded-xl border border-neutral-800/80">
            <div className="flex items-center gap-2 text-neutral-300">
              <Cookie className="w-4 h-4 text-amber-400" />
              <span>Cookies in use</span>
            </div>
            <span className="text-neutral-400 font-mono">3 active</span>
          </div>

          {/* Permissions */}
          <div>
            <h4 className="text-neutral-400 font-medium mb-2 uppercase tracking-wider text-[10px]">
              Site Permissions
            </h4>
            <div className="space-y-1.5 bg-neutral-950/60 p-2 rounded-xl border border-neutral-800/80">
              <div className="flex items-center justify-between p-1.5">
                <div className="flex items-center gap-2 text-neutral-300">
                  <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                  <span>Location</span>
                </div>
                <button
                  onClick={() => togglePermission('location')}
                  className={`text-[11px] px-2 py-0.5 rounded font-medium ${
                    permissions.location ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-neutral-800 text-neutral-400'
                  }`}
                >
                  {permissions.location ? 'Allowed' : 'Blocked'}
                </button>
              </div>

              <div className="flex items-center justify-between p-1.5">
                <div className="flex items-center gap-2 text-neutral-300">
                  <Bell className="w-3.5 h-3.5 text-neutral-400" />
                  <span>Notifications</span>
                </div>
                <button
                  onClick={() => togglePermission('notifications')}
                  className={`text-[11px] px-2 py-0.5 rounded font-medium ${
                    permissions.notifications ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-neutral-800 text-neutral-400'
                  }`}
                >
                  {permissions.notifications ? 'Allowed' : 'Blocked'}
                </button>
              </div>

              <div className="flex items-center justify-between p-1.5">
                <div className="flex items-center gap-2 text-neutral-300">
                  <Camera className="w-3.5 h-3.5 text-neutral-400" />
                  <span>Camera</span>
                </div>
                <button
                  onClick={() => togglePermission('camera')}
                  className={`text-[11px] px-2 py-0.5 rounded font-medium ${
                    permissions.camera ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-neutral-800 text-neutral-400'
                  }`}
                >
                  {permissions.camera ? 'Allowed' : 'Blocked'}
                </button>
              </div>

              <div className="flex items-center justify-between p-1.5">
                <div className="flex items-center gap-2 text-neutral-300">
                  <Mic className="w-3.5 h-3.5 text-neutral-400" />
                  <span>Microphone</span>
                </div>
                <button
                  onClick={() => togglePermission('microphone')}
                  className={`text-[11px] px-2 py-0.5 rounded font-medium ${
                    permissions.microphone ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-neutral-800 text-neutral-400'
                  }`}
                >
                  {permissions.microphone ? 'Allowed' : 'Blocked'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-neutral-800 text-right">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-white rounded-xl font-medium transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
