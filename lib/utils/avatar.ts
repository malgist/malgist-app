import { createAvatar } from '@dicebear/core';
import { adventurer, avataaars, bottts, lorelei, personas, pixelArt } from '@dicebear/collection';

export type AvatarStyle = 'adventurer' | 'avataaars' | 'bottts' | 'lorelei' | 'personas' | 'pixelArt';

const styleMap = {
  adventurer,
  avataaars,
  bottts,
  lorelei,
  personas,
  pixelArt,
};

/**
 * Generate a consistent avatar based on a seed (wallet address or identifier)
 * @param seed - Unique identifier (wallet address)
 * @param style - Avatar style to use
 * @returns SVG string of the avatar
 */
export function generateAvatar(seed: string, style: AvatarStyle = 'adventurer'): string {
  const avatar = createAvatar(styleMap[style], {
    seed,
    size: 128,
  });

  return avatar.toDataUri();
}

/**
 * Get all available avatar styles
 */
export const avatarStyles: { name: AvatarStyle; label: string }[] = [
  { name: 'adventurer', label: 'Adventurer' },
  { name: 'avataaars', label: 'Avataaars' },
  { name: 'bottts', label: 'Bottts' },
  { name: 'lorelei', label: 'Lorelei' },
  { name: 'personas', label: 'Personas' },
  { name: 'pixelArt', label: 'Pixel Art' },
];

/**
 * Generate multiple avatar variations for a seed
 * @param seed - Unique identifier
 * @param count - Number of variations to generate
 * @returns Array of avatar data URIs
 */
export function generateAvatarVariations(seed: string, style: AvatarStyle = 'adventurer', count: number = 6): string[] {
  const variations: string[] = [];

  for (let i = 0; i < count; i++) {
    const avatar = createAvatar(styleMap[style], {
      seed: `${seed}-${i}`,
      size: 128,
    });
    variations.push(avatar.toDataUri());
  }

  return variations;
}
