-- Add indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_model_featured_active ON Model(featured, active);
CREATE INDEX IF NOT EXISTS idx_model_slug ON Model(slug);
CREATE INDEX IF NOT EXISTS idx_model_created_at ON Model(createdAt);
CREATE INDEX IF NOT EXISTS idx_image_model_id ON Image(modelId);
CREATE INDEX IF NOT EXISTS idx_image_featured ON Image(featured);
CREATE INDEX IF NOT EXISTS idx_sitetext_key ON SiteText(key);
CREATE INDEX IF NOT EXISTS idx_category_slug ON Category(slug);

-- Optimize SQLite settings
PRAGMA journal_mode = WAL;
PRAGMA synchronous = NORMAL;
PRAGMA cache_size = 1000;
PRAGMA temp_store = memory;
