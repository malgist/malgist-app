'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, RefreshCw } from 'lucide-react';
import Image from 'next/image';
import { generateAvatar, generateAvatarVariations, avatarStyles, type AvatarStyle } from '@/lib/utils/avatar';

interface AvatarSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  currentAddress: string;
  onSave: (style: AvatarStyle, seed: string) => void;
}

export function AvatarSelector({ isOpen, onClose, currentAddress, onSave }: AvatarSelectorProps) {
  const [selectedStyle, setSelectedStyle] = useState<AvatarStyle>('adventurer');
  const [variations, setVariations] = useState<string[]>([]);
  const [selectedVariation, setSelectedVariation] = useState<number>(0);
  const [isGenerating, setIsGenerating] = useState(false);

  // Generate variations when style changes
  useEffect(() => {
    if (isOpen) {
      // Use microtask to avoid synchronous state updates
      Promise.resolve().then(() => {
        setIsGenerating(true);
        const newVariations = generateAvatarVariations(currentAddress, selectedStyle, 8);
        setVariations(newVariations);
        setSelectedVariation(0);
        setIsGenerating(false);
      });
    }
  }, [selectedStyle, currentAddress, isOpen]);

  const handleRegenerate = () => {
    setIsGenerating(true);
    // Generate with different seeds
    const timestamp = Date.now().toString();
    const newVariations = generateAvatarVariations(`${currentAddress}-${timestamp}`, selectedStyle, 8);
    setVariations(newVariations);
    setSelectedVariation(0);
    setIsGenerating(false);
  };

  const handleSave = () => {
    const seed = `${currentAddress}-${selectedVariation}`;
    onSave(selectedStyle, seed);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-[#1a1a1a] border border-[#262626] rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
              {/* Header */}
              <div className="p-6 border-b border-[#262626] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-emerald-500/10">
                    <Sparkles className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">Choose Your Avatar</h2>
                    <p className="text-sm text-[#a1a1a1]">Select a style and pick your favorite design</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-xl hover:bg-[#262626] transition-colors"
                >
                  <X className="w-6 h-6 text-[#a1a1a1]" />
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {/* Style Selection */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Avatar Style</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {avatarStyles.map((style) => (
                      <button
                        key={style.name}
                        onClick={() => setSelectedStyle(style.name)}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          selectedStyle === style.name
                            ? 'border-emerald-500 bg-emerald-500/10'
                            : 'border-[#262626] bg-[#0a0a0a] hover:border-[#3a3a3a]'
                        }`}
                      >
                        <div className="w-16 h-16 mx-auto mb-2 rounded-full overflow-hidden">
                          <Image
                            src={generateAvatar(currentAddress, style.name)}
                            alt={style.label}
                            width={64}
                            height={64}
                            className="w-full h-full"
                          />
                        </div>
                        <p className={`text-sm font-medium text-center ${
                          selectedStyle === style.name ? 'text-emerald-400' : 'text-white'
                        }`}>
                          {style.label}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Variations */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold text-white">Choose a Variation</h3>
                    <button
                      onClick={handleRegenerate}
                      disabled={isGenerating}
                      className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#262626] hover:bg-[#3a3a3a] text-white transition-colors disabled:opacity-50"
                    >
                      <RefreshCw className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
                      <span className="text-sm">Regenerate</span>
                    </button>
                  </div>
                  <div className="grid grid-cols-4 md:grid-cols-4 gap-3">
                    {variations.map((variation, index) => (
                      <motion.button
                        key={index}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedVariation(index)}
                        className={`aspect-square rounded-xl border-2 overflow-hidden transition-all ${
                          selectedVariation === index
                            ? 'border-emerald-500 ring-4 ring-emerald-500/20'
                            : 'border-[#262626] hover:border-[#3a3a3a]'
                        }`}
                      >
                        <Image
                          src={variation}
                          alt={`Variation ${index + 1}`}
                          width={128}
                          height={128}
                          className="w-full h-full"
                        />
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Preview */}
                <div className="p-6 rounded-xl bg-[#0a0a0a] border border-[#262626]">
                  <h3 className="text-lg font-semibold text-white mb-4 text-center">Preview</h3>
                  <div className="flex items-center justify-center gap-8">
                    <div>
                      <p className="text-sm text-[#a1a1a1] mb-2 text-center">Profile Avatar</p>
                      <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-emerald-500/20">
                        <Image
                          src={variations[selectedVariation] || generateAvatar(currentAddress, selectedStyle)}
                          alt="Preview"
                          width={96}
                          height={96}
                          className="w-full h-full"
                        />
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-[#a1a1a1] mb-2 text-center">Leaderboard Avatar</p>
                      <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/10">
                        <Image
                          src={variations[selectedVariation] || generateAvatar(currentAddress, selectedStyle)}
                          alt="Preview"
                          width={48}
                          height={48}
                          className="w-full h-full"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="p-6 border-t border-[#262626] flex gap-3">
                <button
                  onClick={onClose}
                  className="flex-1 px-6 py-3 rounded-xl bg-[#262626] hover:bg-[#3a3a3a] text-white font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="flex-1 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-medium transition-colors"
                >
                  Save Avatar
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
