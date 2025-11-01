-- Migration: Add visible column to Image table
-- This migration adds the visible column to allow hiding images from public view

-- Add the visible column with default value true
ALTER TABLE "Image" ADD COLUMN IF NOT EXISTS "visible" BOOLEAN NOT NULL DEFAULT true;

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS "Image_modelId_visible_idx" ON "Image"("modelId", "visible");

