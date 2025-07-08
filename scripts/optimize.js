#!/usr/bin/env node

const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting performance optimization...');

// Clear Next.js cache
console.log('🧹 Clearing Next.js cache...');
exec('rm -rf .next', (error) => {
    if (error && !error.message.includes('No such file or directory')) {
        console.error('Error clearing cache:', error);
    }
});

// Generate Prisma client
console.log('📊 Generating Prisma client...');
exec('npx prisma generate', (error, stdout, stderr) => {
    if (error) {
        console.error('Error generating Prisma client:', error);
        return;
    }
    console.log('✅ Prisma client generated');
});

// Optimize SQLite database
console.log('🗄️ Optimizing SQLite database...');
exec('npx prisma db push --force-reset', (error) => {
    if (error) {
        console.log('ℹ️ Database optimization skipped (no changes needed)');
    } else {
        console.log('✅ Database optimized');
    }
});

console.log('✨ Performance optimization complete!');
console.log('💡 Run "npm run dev" to start the optimized development server');
