# 🚀 Quick Migration Guide

## No SQL Needed! Just call this API endpoint once.

### ✅ Step 1: Deploy
Push your code to Vercel. The migration endpoint is already included.

### ✅ Step 2: Run Migration (Copy/Paste this in your browser console)

1. **Go to your admin page:** `https://www.divinemodels.ro/admin`
2. **Open browser console** (Press F12, then Console tab)
3. **Paste this code and press Enter:**

```javascript
fetch('/api/migrations/add-visible-column', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' }
})
.then(r => r.json())
.then(data => {
  if (data.success) {
    alert('✅ Migration successful! Visibility feature is now active.');
    console.log('Migration result:', data);
  } else {
    alert('Migration completed. Column may already exist.');
    console.log('Migration result:', data);
  }
})
.catch(err => {
  console.error('Migration error:', err);
  alert('❌ Migration failed. Check console for details.');
});
```

### ✅ Step 3: Verify
Run this to check if it worked:

```javascript
fetch('/api/migrations/add-visible-column')
  .then(r => r.json())
  .then(data => {
    if (data.columnExists) {
      alert('✅ Column exists! Visibility feature is active.');
    } else {
      alert('❌ Column not found. Try running migration again.');
    }
  });
```

## 🎉 Done!

After running the migration:
- Visibility toggle appears on all images in admin gallery
- You can hide/show images from public site
- Hidden images won't show on public pages

## 🔒 Security Note

Only admin users can run this migration. Make sure you're logged in as admin first!

