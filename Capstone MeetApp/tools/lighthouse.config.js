const fs = require('fs');

// Load the Lighthouse report
const report = JSON.parse(fs.readFileSync('../lighthouse-report.json', 'utf8'));

// Extract performance and availability metrics
const performanceScore = report.categories.performance.score * 100; // Performance score as a percentage (0-100)
const availabilityScore = report.categories.accessibility.score * 100; // Availability score as a percentage (0-100)

console.log(`Performance Score: ${performanceScore}`);
console.log(`Availability Score: ${availabilityScore}`);

  