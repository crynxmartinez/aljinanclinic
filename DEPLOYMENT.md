# 🚀 Deployment Guide

## Pre-Deployment Checklist

### ✅ Code Quality
- [x] All HTML pages created
- [x] All JavaScript modules created
- [x] All CSS files created
- [x] GHL URLs replaced with local routing
- [x] Firebase configuration in place
- [x] No console errors
- [x] All features tested locally

### ✅ Configuration
- [x] package.json configured
- [x] vite.config.js configured
- [x] vercel.json configured
- [x] .gitignore configured
- [x] .env.example created

### ✅ Documentation
- [x] README.md comprehensive
- [x] Code comments added
- [x] Deployment guide created

## Deployment Steps

### 1. GitHub Repository
```bash
# Already connected to:
https://github.com/crynxmartinez/aljinanclinic.git

# To push updates:
git add .
git commit -m "Your message"
git push origin main
```

### 2. Vercel Deployment

**Automatic Deployment:**
- Already connected to Vercel
- Every push to `main` branch triggers automatic deployment
- Check Vercel dashboard for deployment status

**Manual Deployment (if needed):**
```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

### 3. Environment Variables (Vercel Dashboard)

Set these in Vercel project settings:

```
VITE_FIREBASE_API_KEY=AIzaSyCjJLE_Mgrv3HONhkkgApmUNVlGdnAIcvI
VITE_FIREBASE_AUTH_DOMAIN=clinic-a17bc.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=clinic-a17bc
VITE_FIREBASE_STORAGE_BUCKET=clinic-a17bc.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=5214960983
VITE_FIREBASE_APP_ID=1:5214960983:web:4da52f47c510a50b3cd212
VITE_FIREBASE_MEASUREMENT_ID=G-7YM2Z0BY98
```

## Post-Deployment Verification

### Test All Pages
- [ ] `/` - Index/Booking page loads
- [ ] `/login.html` - Login page loads
- [ ] `/doctor.html` - Doctor portal (after login)
- [ ] `/staff.html` - Staff portal (after login)
- [ ] `/superadmin.html` - Super admin portal (after login)

### Test All Features
- [ ] Language switching (EN/AR)
- [ ] Patient booking flow
- [ ] Doctor login
- [ ] Staff login
- [ ] Super admin login (admin/admin)
- [ ] Appointment creation
- [ ] Appointment viewing
- [ ] Firebase connection
- [ ] Toast notifications
- [ ] Form validation
- [ ] Responsive design (mobile/tablet/desktop)

### Performance Checks
- [ ] Page load time < 3 seconds
- [ ] No JavaScript errors in console
- [ ] All images load
- [ ] All fonts load
- [ ] CSS animations work
- [ ] Mobile menu works

## Troubleshooting

### Build Fails
1. Check Vercel build logs
2. Verify all dependencies in package.json
3. Check for syntax errors
4. Ensure all imports are correct

### Firebase Connection Issues
1. Verify Firebase config in js/config/firebase.js
2. Check Firestore rules
3. Verify API key is correct
4. Check browser console for errors

### Login Not Working
1. Clear browser cache
2. Clear localStorage
3. Check Firebase users collection
4. Verify authentication logic

### Pages Not Loading
1. Check Vercel deployment status
2. Verify vercel.json configuration
3. Check for 404 errors
4. Verify file paths are correct

## Rollback Procedure

If deployment fails:

```bash
# View commit history
git log --oneline

# Revert to previous commit
git revert HEAD

# Or reset to specific commit
git reset --hard <commit-hash>

# Force push
git push origin main --force
```

## Monitoring

### Vercel Dashboard
- Check deployment status
- View build logs
- Monitor analytics
- Check error logs

### Firebase Console
- Monitor Firestore usage
- Check authentication logs
- View database rules
- Monitor API usage

## Success Criteria

✅ All pages load without errors  
✅ All features work as expected  
✅ Mobile responsive  
✅ Fast load times  
✅ No console errors  
✅ Firebase connected  
✅ Authentication working  
✅ Booking system functional  

## Support

For issues:
1. Check Vercel build logs
2. Check browser console
3. Check Firebase console
4. Review this deployment guide

---

**Last Updated:** November 20, 2025  
**Version:** 2.0.0  
**Status:** Ready for Production 🚀
