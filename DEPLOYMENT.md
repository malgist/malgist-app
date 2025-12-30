# Deployment Guide for Malgist App

## ✅ Pre-Deployment Checklist

### 1. Environment Variables
Before deploying, you **MUST** set up the following environment variable in your deployment platform (Vercel):

```bash
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_actual_project_id_here
```

**How to get your WalletConnect Project ID:**
1. Go to https://cloud.walletconnect.com/
2. Sign up or log in
3. Create a new project
4. Copy the Project ID
5. Add it to your Vercel project settings under "Environment Variables"

### 2. Package Manager
This project uses **pnpm**. Make sure your deployment platform is configured to use pnpm.

For Vercel:
- Vercel automatically detects `pnpm-lock.yaml` and uses pnpm
- No additional configuration needed

### 3. Build Configuration
The project is configured for Next.js 16 with Turbopack. Build command:
```bash
pnpm run build
```

## 🚀 Deploying to Vercel

### Quick Deploy
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add the `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` environment variable
4. Deploy!

### Manual Configuration (if needed)
- **Framework Preset:** Next.js
- **Build Command:** `pnpm run build`
- **Output Directory:** `.next`
- **Install Command:** `pnpm install`
- **Node Version:** 18.x or higher

## 📝 Known Issues & Solutions

### Issue: Test Files Being Bundled
**Solution:** The project now includes:
- `.vercelignore` file to exclude test directories
- Updated `tsconfig.json` with comprehensive exclusions
- Webpack configuration to handle test file exclusions

### Issue: indexedDB Warnings During Build
**Status:** Expected behavior
**Impact:** None - these warnings occur during static generation but don't affect runtime
**Reason:** WalletConnect tries to access browser APIs during SSR, but the configuration properly handles this

## 🛠️ Build Optimizations Applied

1. ✅ Test file exclusions in Webpack config
2. ✅ Server external packages configured (pino, thread-stream)
3. ✅ Browser API polyfills for SSR
4. ✅ Image optimization with remote patterns
5. ✅ TypeScript strict mode enabled
6. ✅ All linting issues resolved

## 📊 Build Output

Expected successful build output:
```
Route (app)
┌ ○ /                    (Static)
├ ○ /_not-found          (Static)
├ ○ /leaderboard         (Static)
├ ƒ /profile/[address]   (Dynamic)
├ ○ /reports             (Static)
└ ○ /strategy            (Static)
```

## 🔧 Troubleshooting

### Build Fails with "Module not found: Can't resolve 'tape'"
**Cause:** Test files from node_modules are being processed
**Solution:** Ensure `.vercelignore` is committed to the repository

### Build Fails with TypeScript Errors
**Cause:** Strict type checking
**Solution:** All TypeScript errors have been fixed. Pull latest changes.

### Wallet Connection Doesn't Work
**Cause:** Missing WalletConnect Project ID
**Solution:** Add `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` to environment variables

## 📁 Important Files

- `.env.local` - Local environment variables (DO NOT commit)
- `.vercelignore` - Excludes test files from deployment
- `.npmrc` - pnpm configuration
- `next.config.ts` - Next.js and Turbopack configuration
- `tsconfig.json` - TypeScript configuration with test exclusions

## ✨ Post-Deployment Verification

After deployment, verify:
1. ✅ Site loads correctly
2. ✅ Wallet Connect button appears
3. ✅ WalletConnect modal opens when clicked
4. ✅ All pages navigate correctly
5. ✅ No console errors related to missing modules

## 🎉 Success!

Your app should now be deployed and fully functional!

For issues or questions, refer to:
- Next.js 16 Documentation: https://nextjs.org/docs
- WalletConnect Documentation: https://docs.walletconnect.com/
- Vercel Documentation: https://vercel.com/docs
