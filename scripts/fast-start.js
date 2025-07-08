#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Divine Models - Fast Startup Script');
console.log('=====================================');

function runCommand(command, description) {
    console.log(`🔧 ${description}...`);
    try {
        execSync(command, { stdio: 'inherit' });
        console.log(`✅ ${description} completed\n`);
    } catch (error) {
        console.error(`❌ ${description} failed:`, error.message);
        process.exit(1);
    }
}

// Check if we're in the right directory
if (!fs.existsSync('package.json')) {
    console.error('❌ Please run this script from the project root directory');
    process.exit(1);
}

// Install dependencies if node_modules doesn't exist
if (!fs.existsSync('node_modules')) {
    runCommand('npm install', 'Installing dependencies');
}

// Generate Prisma client
runCommand('npx prisma generate', 'Generating Prisma client');

// Apply database optimizations
if (fs.existsSync('scripts/optimize-db.sql')) {
    runCommand('sqlite3 prisma/dev.db < scripts/optimize-db.sql', 'Optimizing database indexes');
}

// Clear Next.js cache
runCommand('rm -rf .next', 'Clearing Next.js cache');

console.log('🎉 Optimization complete!');
console.log('💡 You can now run "npm run dev" for faster startup');
console.log('🔥 Use "npm run dev --turbo" for maximum performance');
