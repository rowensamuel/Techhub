const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./techhub.db');

console.log('=== TECHHUB DATABASE CONTENTS ===\n');

// View all tables
db.all("SELECT name FROM sqlite_master WHERE type='table'", [], (err, tables) => {
  if (err) {
    console.error('Error getting tables:', err);
    return;
  }

  tables.forEach(table => {
    console.log(`\n--- TABLE: ${table.name.toUpperCase()} ---`);

    db.all(`SELECT * FROM ${table.name}`, [], (err, rows) => {
      if (err) {
        console.error(`Error querying ${table.name}:`, err);
        return;
      }

      if (rows.length === 0) {
        console.log('(No data in this table)');
      } else {
        console.log(`Found ${rows.length} records:`);
        rows.forEach((row, index) => {
          console.log(`${index + 1}.`, JSON.stringify(row, null, 2));
        });
      }

      // Close database after all tables are processed
      if (table === tables[tables.length - 1]) {
        db.close((err) => {
          if (err) {
            console.error('Error closing database:', err);
          } else {
            console.log('\n=== DATABASE VIEW COMPLETE ===');
          }
        });
      }
    });
  });
});
