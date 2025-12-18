#!/usr/bin/env python3
"""
Script to update component files with Glider.fi color scheme
"""

import os
import re
from pathlib import Path

# Color replacements mapping
COLOR_REPLACEMENTS = [
    # Backgrounds
    ('bg-zinc-900/50', 'bg-[#1a1a1a]/50'),
    ('bg-zinc-950', 'bg-[#0a0a0a]'),
    ('bg-zinc-900', 'bg-[#1a1a1a]'),
    ('bg-zinc-800/50', 'bg-[#262626]/50'),
    ('bg-zinc-800', 'bg-[#262626]'),

    # Borders
    ('border-zinc-800', 'border-[#262626]'),
    ('border-zinc-700', 'border-[#262626]'),
    ('border-zinc-600', 'border-[#2a2a2a]'),

    # Text colors
    ('text-zinc-400', 'text-[#a1a1a1]'),
    ('text-zinc-500', 'text-[#6b7280]'),
    ('text-zinc-600', 'text-[#52525b]'),

    # Hover states
    ('hover:bg-zinc-800', 'hover:bg-[#262626]'),
    ('hover:bg-zinc-700', 'hover:bg-[#2a2a2a]'),
    ('hover:border-zinc-700', 'hover:border-[#2a2a2a]'),
    ('hover:border-zinc-600', 'hover:border-[#333333]'),

    # Accent colors (Indigo/Purple → Emerald)
    ('from-indigo-500', 'from-emerald-500'),
    ('to-purple-600', 'to-emerald-600'),
    ('to-purple-500', 'to-emerald-500'),
    ('text-indigo-400', 'text-emerald-400'),
    ('text-indigo-300', 'text-emerald-300'),
    ('text-purple-400', 'text-emerald-400'),
    ('bg-indigo-500/30', 'bg-emerald-500/30'),
    ('bg-indigo-500/20', 'bg-emerald-500/20'),
    ('bg-indigo-500/10', 'bg-emerald-500/10'),
    ('bg-purple-500/20', 'bg-emerald-500/20'),
    ('bg-purple-500/10', 'bg-emerald-500/10'),
    ('border-indigo-500/30', 'border-emerald-500/30'),
    ('border-indigo-500/20', 'border-emerald-500/20'),
    ('border-indigo-500', 'border-emerald-500'),
    ('hover:bg-indigo-500/30', 'hover:bg-emerald-500/30'),
    ('hover:bg-indigo-500/20', 'hover:bg-emerald-500/20'),
    ('hover:from-indigo-600', 'hover:from-emerald-600'),
    ('hover:to-purple-700', 'hover:to-emerald-700'),
    ('focus:border-indigo-500', 'focus:border-emerald-500'),
    ('hover:border-indigo-500', 'hover:border-emerald-500'),
    ('hover:text-indigo-300', 'hover:text-emerald-300'),

    # Border radius (more rounded like Glider.fi)
    ('rounded-lg', 'rounded-xl'),
    ('rounded-md', 'rounded-lg'),
]

def update_file(filepath):
    """Update a single file with color replacements."""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        original_content = content
        replacements_made = 0

        # Apply all color replacements
        for old, new in COLOR_REPLACEMENTS:
            if old in content:
                count = content.count(old)
                content = content.replace(old, new)
                replacements_made += count

        # Only write if changes were made
        if content != original_content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            return replacements_made
        return 0

    except Exception as e:
        print(f"Error updating {filepath}: {e}")
        return 0

def main():
    # Define directories to update
    base_dir = Path(__file__).parent
    directories = [
        base_dir / 'components' / 'portfolio',
        base_dir / 'components' / 'strategy',
        base_dir / 'components' / 'leaderboard',
        base_dir / 'components' / 'reports',
    ]

    total_files = 0
    total_replacements = 0
    updated_files = []

    for directory in directories:
        if not directory.exists():
            print(f"Directory not found: {directory}")
            continue

        for filepath in directory.glob('*.tsx'):
            replacements = update_file(filepath)
            if replacements > 0:
                total_files += 1
                total_replacements += replacements
                updated_files.append((filepath.name, replacements))
                print(f"✓ {filepath.name}: {replacements} replacements")

    print(f"\n{'='*60}")
    print(f"Summary:")
    print(f"  Files updated: {total_files}")
    print(f"  Total replacements: {total_replacements}")
    print(f"{'='*60}")

    if updated_files:
        print("\nDetailed breakdown:")
        for filename, count in updated_files:
            print(f"  {filename}: {count} changes")

if __name__ == '__main__':
    main()
