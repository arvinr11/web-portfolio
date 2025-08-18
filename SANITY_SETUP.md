# 🚀 Sanity CMS Setup Guide

## **Apa yang Sudah Dibuat:**
✅ Schema untuk Projects, Certificates, dan Skills  
✅ Sanity client configuration  
✅ Image URL builder  
✅ Query templates  
✅ Package.json scripts  

## **Langkah Selanjutnya:**

### **1. Install Sanity CLI**
```bash
npm install -g @sanity/cli
```

### **2. Login ke Sanity**
```bash
sanity login
```

### **3. Initialize Sanity Project**
```bash
cd sanity
sanity init
```

**Pilih options:**
- **Project name**: web-portfolio
- **Use the default dataset configuration?**: Yes
- **Project output path**: ./ (current directory)
- **Select project template**: Clean project with no predefined schemas

### **4. Update Project ID**
Setelah project dibuat, copy Project ID dari Sanity dashboard dan update:
- `sanity/sanity.config.ts` - ganti `YOUR_PROJECT_ID`
- Buat file `.env.local` dengan:
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=YOUR_ACTUAL_PROJECT_ID
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=YOUR_API_TOKEN
```

### **5. Start Sanity Studio**
```bash
npm run sanity:dev
```

### **6. Add Sample Data**
1. Buka Sanity Studio di browser
2. Add beberapa sample projects
3. Add beberapa sample certificates
4. Add beberapa sample skills

### **7. Test Integration**
```bash
npm run dev
```

## **Struktur Data yang Tersedia:**

### **Projects:**
- Title, Description, Technologies
- Multiple images dengan carousel support
- Featured boolean untuk highlight
- Category dan order

### **Certificates:**
- Title, Issuer, Date
- Image dan Credential ID
- Order untuk display

### **Skills:**
- Name, Category, Level
- Icon URL (link ke SVG di public folder)
- Order untuk display

## **Next Steps:**
1. Setup Sanity project
2. Add sample data
3. Integrate dengan Next.js components
4. Test popup modal + carousel
5. Deploy ke Vercel

## **Troubleshooting:**
- Pastikan Project ID sudah benar
- Check environment variables
- Restart dev server setelah update env vars
- Check Sanity Studio console untuk errors

## **Support:**
- [Sanity Documentation](https://www.sanity.io/docs)
- [Next.js + Sanity Guide](https://www.sanity.io/guides/nextjs-app-router-sanity)
- [Sanity Discord](https://discord.gg/sanity)

