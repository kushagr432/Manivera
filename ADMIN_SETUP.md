# 🔥 Manivra Jewels Admin Panel Setup Guide

## 🚀 Quick Start

Your admin panel is now ready! Here's how to get started:

### 0. **Configure the environment**
All credentials and URLs come from environment variables. Before the first run:

```bash
cp .env.example .env   # then fill in the values
```

`.env` is gitignored and must never be committed. `.env.example` is the
committed, documented list of every variable the app reads.

### 1. **Access the Admin Panel**
The admin panel is mounted at whatever `VITE_ADMIN_BASE_PATH` is set to
(default `/admin`) on whatever origin the app is served from:

| Environment | URL |
| --- | --- |
| Local dev | `http://localhost:5173/admin` |
| Production | `https://<your-domain>/<VITE_ADMIN_BASE_PATH>` |

There is no hardcoded hostname anywhere in the code — the dev URL above is just
the Vite dev server. To move the panel to a less obvious path, set
`VITE_ADMIN_BASE_PATH=/manage` and it becomes `/manage` everywhere: routes,
sidebar links, redirects and the header link all derive from that one value.

You can also click the "Admin" link in the website header, though you should
set `VITE_SHOW_ADMIN_LINK=false` in production to keep the panel out of the
public navigation.

### 2. **First Time Setup**
You'll need to create an admin account in Firebase:

#### Option A: Firebase Console (Recommended)
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select the project named in `VITE_FIREBASE_PROJECT_ID` in your `.env`
3. Go to **Authentication** → **Users**
4. Click **Add User**
5. Enter email and password
6. Save the credentials

#### Option B: Enable Email/Password Authentication
1. Go to Firebase Console
2. **Authentication** → **Sign-in method**
3. Enable **Email/Password**
4. Create your first admin user

### 3. **Login to Admin Panel**
- Use the email and password you created
- You'll be redirected to the dashboard

> **Where are the admin credentials stored?** Nowhere in this repo. Admin login
> is Firebase Auth email/password, so the accounts live in the Firebase project
> and are managed entirely from the Firebase Console (Authentication → Users).
> Nothing is baked into the build, and there is no admin password in `.env`.

## 📱 Admin Panel Features

### 🏠 **Dashboard**
- Overview of your jewelry business
- Total products, categories, orders
- Recent products and orders
- Quick action buttons

### 💎 **Product Management**
- **Add Products**: Upload images, set prices, descriptions
- **Edit Products**: Modify existing product details
- **Delete Products**: Remove products with confirmation
- **Categories**: Organize products by type
- **Featured Products**: Mark special items
- **Stock Management**: Track availability

### 📊 **Real-time Updates**
- Changes appear instantly on your website
- No need to restart the server
- Automatic synchronization

## 🛠️ How to Use

### Adding Your First Product
1. Go to **Products** in the admin panel
2. Click **+ Add Product**
3. Fill in the details:
   - **Name**: Product title
   - **Price**: In ₹ (Indian Rupees)
   - **Category**: Select from dropdown
   - **Description**: Detailed product info
   - **Image**: Upload product photo
   - **Material**: e.g., "18K Gold", "Platinum"
   - **Weight**: e.g., "2.5g", "1.2 carats"
   - **Tags**: Comma-separated keywords
4. Click **Add Product**

### Managing Categories
- Products are automatically organized by category
- Categories: Rings, Necklaces, Earrings, Bracelets, Watches, etc.
- You can add custom categories in the future

### Featured Products
- Mark products as "Featured" to highlight them
- Featured products appear in the "Featured Collections" section
- Great for showcasing your best pieces

## 🔧 Technical Details

### **Firebase Configuration**
- **Project ID**: from `VITE_FIREBASE_PROJECT_ID`
- **Storage**: Images stored in Cloudinary (see `src/services/cloudinaryService.ts`)
- **Database**: Firestore for product data
- **Authentication**: Firebase Auth email/password

All Firebase settings are read from `VITE_FIREBASE_*` variables in `.env` and
assembled in `src/config/env.ts`. Nothing is hardcoded in `src/firebase/config.ts`.

These `VITE_FIREBASE_*` values are publishable client identifiers, not secrets —
Firebase is designed to expose them in the browser. Your actual protection is
Firebase Auth plus your Firestore/Storage security rules.

### **Image Upload**
- Images are automatically optimized
- Stored in Firebase Storage
- CDN delivery for fast loading
- Maximum file size: 10MB

### **Data Security**
- Admin-only access with authentication
- Secure Firebase rules
- Data validation and error handling
- Automatic backups

## 🚨 Troubleshooting

### **Can't Login?**
- Check if authentication is enabled in Firebase
- Verify email/password are correct
- Check browser console for errors

### **Images Not Uploading?**
- Check Firebase Storage rules
- Ensure file size is under 10MB
- Verify internet connection

### **Products Not Showing?**
- Check if products are marked as "In Stock"
- Verify category names match exactly
- Check browser console for errors

## 📞 Support

If you need help:
1. Check the browser console for error messages
2. Verify Firebase configuration
3. Ensure all dependencies are installed
4. Check network connectivity

## 🎯 Next Steps

1. **Add Your Products**: Start with 5-10 key pieces
2. **Upload High-Quality Images**: Use good lighting and angles
3. **Write Compelling Descriptions**: Highlight unique features
4. **Set Competitive Prices**: Research market rates
5. **Test the Website**: Check how products look to customers

## 🚀 Deploying to Production

### 1. Set the environment variables on your host
Do **not** ship a `.env` file. Set the same variables in your host's dashboard so
they are baked into the build:

| Host | Where |
| --- | --- |
| Netlify | Site settings → Environment variables |
| Vercel | Project → Settings → Environment Variables |
| Firebase Hosting / CI | Repository or pipeline secrets, exported before `npm run build` |
| Docker | `--build-arg` / `env_file` at **build** time, not run time |

Vite inlines `VITE_*` variables at **build** time, so they must be present when
`npm run build` runs. Changing them later requires a rebuild, not a restart.

Production values that should differ from local:

```
VITE_SITE_URL=https://your-domain.com
VITE_ADMIN_BASE_PATH=/admin        # or something less guessable
VITE_SHOW_ADMIN_LINK=false         # hide the panel from public navigation
```

### 2. Add an SPA rewrite
The admin panel is a client-side route. Without a catch-all rewrite, loading or
refreshing the admin URL directly returns a 404 because no file exists at that
path.

```
# Netlify — public/_redirects
/*  /index.html  200
```
```json
// Vercel — vercel.json
{ "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }
```
```nginx
# nginx
location / { try_files $uri $uri/ /index.html; }
```

Firebase Hosting: `"rewrites": [{ "source": "**", "destination": "/index.html" }]`.
S3 + CloudFront: map 403/404 error responses to `/index.html` with status 200.

### 3. Authorize the production domain in Firebase
Firebase Console → **Authentication** → **Settings** → **Authorized domains**
→ add your production domain. Without this, login fails with
`auth/unauthorized-domain`.

### 4. Known gaps before going live
These are deliberately unchanged for now and still need attention:

- **`/admin/setup` is public and unauthenticated.** Anyone who finds it can
  create an account, and any authenticated Firebase user is treated as an admin.
  Remove the route or gate it behind an admin claim before launch.
- **The old Cloudinary API secret was committed to git history** and must be
  rotated in the Cloudinary dashboard. Moving it to `.env` does not undo the
  exposure. The client bundle no longer contains it.
- **No Firestore/Storage security rules are in the repo.** Client-side auth
  checks are cosmetic; rules are the only real access control.
- **Debug routes** (`/test`, `/cloudinary-test`, `/preset-test`) are still
  registered under the admin panel.

## 🔄 Updates

The admin panel will automatically:
- Sync changes to your website
- Update product listings in real-time
- Maintain data consistency
- Handle image optimization

---

**🎉 Congratulations!** Your luxury jewelry website with admin panel is ready to go live!

