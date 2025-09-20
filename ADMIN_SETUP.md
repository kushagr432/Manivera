# 🔥 Manivra Jewels Admin Panel Setup Guide

## 🚀 Quick Start

Your admin panel is now ready! Here's how to get started:

### 1. **Access the Admin Panel**
- Go to: `http://localhost:5173/admin`
- Or click the "Admin" link in the website header

### 2. **First Time Setup**
You'll need to create an admin account in Firebase:

#### Option A: Firebase Console (Recommended)
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `manvira-75a85`
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
- **Project ID**: `manvira-75a85`
- **Storage**: Images stored in Firebase Storage
- **Database**: Firestore for product data
- **Authentication**: Secure admin login

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

## 🔄 Updates

The admin panel will automatically:
- Sync changes to your website
- Update product listings in real-time
- Maintain data consistency
- Handle image optimization

---

**🎉 Congratulations!** Your luxury jewelry website with admin panel is ready to go live!

