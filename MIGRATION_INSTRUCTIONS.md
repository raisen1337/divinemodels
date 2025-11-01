# 🚀 Easy Migration - Add Image Visibility Column

Since you can't run SQL directly on Vercel, I've created an **automatic migration endpoint** that you can call once.

## ✅ Simple 2-Step Process

### Step 1: Deploy the Code
The code is already set up. Just push to Vercel and it will deploy.

### Step 2: Run the Migration (One Time Only)

**Option A: Via Browser (Easiest)**
1. Go to your admin panel: `https://www.divinemodels.ro/admin`
2. Open browser console (F12)
3. Paste this and press Enter:

```javascript
fetch('/api/migrations/add-visible-column', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' }
}).then(r => r.json()).then(console.log)
```

**Option B: Via Terminal/curl**
```bash
curl -X POST https://www.divinemodels.ro/api/migrations/add-visible-column \
  -H "Cookie: next-auth.session-token=YOUR_SESSION_TOKEN"
```

**Option C: Via Postman/Insomnia**
- URL: `POST https://www.divinemodels.ro/api/migrations/add-visible-column`
- Headers: Include your session cookie from browser

## ✅ Verify It Worked

After running the migration, check the status:

```javascript
fetch('/api/migrations/add-visible-column')
  .then(r => r.json())
  .then(console.log)
```

You should see: `{ "columnExists": true, "message": "Visible column exists" }`

## 🔒 Security

- ✅ Only admins can run this migration
- ✅ Safe to run multiple times (checks if column exists first)
- ✅ Won't duplicate columns if already exists

## 📝 What This Does

1. Adds `visible` column to `Image` table (defaults to `true`)
2. Creates an index for better performance
3. All existing images will be marked as visible

## 🎉 After Migration

Once the migration runs:
- Visibility toggle will work in admin gallery
- You can hide/show images from public site
- All new images default to visible

## ⚠️ Troubleshooting

If you get "Unauthorized":
- Make sure you're logged in as admin
- Check that you're using the same session

If migration fails:
- Check your database connection
- Ensure your database user has ALTER TABLE permissions
- Check Vercel logs for details

---

**That's it!** Just call the endpoint once and the migration will run automatically. 🚀

