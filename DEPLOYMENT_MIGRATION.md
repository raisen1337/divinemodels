# Database Migration - Add Image Visibility Column

## ⚠️ IMPORTANT: Run this migration on Vercel before the visibility feature will work

The new `visible` column needs to be added to your production database. The site will work without it, but the visibility toggle feature won't function until this migration is run.

## Quick Fix - Run on Vercel

### Option 1: Via Vercel Dashboard (Recommended)
1. Go to your Vercel project dashboard
2. Navigate to Settings → Storage or Database
3. Find your PostgreSQL database
4. Open the SQL Editor or run a migration

### Option 2: Via Database Console
Run this SQL on your production database:

```sql
-- Add the visible column with default value true
ALTER TABLE "Image" ADD COLUMN IF NOT EXISTS "visible" BOOLEAN NOT NULL DEFAULT true;

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS "Image_modelId_visible_idx" ON "Image"("modelId", "visible");
```

### Option 3: Via Prisma Migrate (if you have direct DB access)
```bash
npx prisma migrate deploy
```

## Verification

After running the migration, verify it worked:
1. Go to any model's gallery in admin
2. You should see green/gray visibility badges on images
3. Toggling should work without errors

## Rollback (if needed)

If you need to rollback:

```sql
DROP INDEX IF EXISTS "Image_modelId_visible_idx";
ALTER TABLE "Image" DROP COLUMN IF EXISTS "visible";
```

## Current Status

- ✅ Site works without migration (backward compatible)
- ✅ Admin shows all images
- ⚠️ Visibility toggle won't work until migration is run
- ✅ Once migration is run, visibility feature will activate automatically

