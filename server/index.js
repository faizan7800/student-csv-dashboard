const express = require('express');
const admin = require('firebase-admin');
const fs = require('fs');
const csv = require('csv-parser');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const cors = require('cors')



// Initialize Firebase with your service account credentials
let serviceAccount = require("./student-dash-3841e-firebase-adminsdk-p1oir-d0f95191bb.json"); // Replace with the path to your service account file
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://student-dash-3841e-default-rtdb.firebaseio.com/', // Replace with your Firebase Database URL
});

const app = express();
app.use(cors())
const port = 8080; // Replace with your desired port

app.post('/upload', upload.single('csv'), async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ message: 'CSV file is required.' });
    }

    const filePath = file.path;
    const csvData = await parseCSV(filePath);

    const db = admin.database();
    const ref = db.ref('users'); // Set the Firebase path where you want to store the data.

    // Insert the CSV data into the Firebase database
    await ref.set(csvData);

    res.status(200).json({ message: 'CSV data uploaded to Firebase successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Error uploading CSV to Firebase.' });
  }
});

async function parseCSV(filePath) {
  return new Promise((resolve, reject) => {
    const results = [];

    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (row) => {
        const firebaseData = {
            // Modify the keys to match your desired Firebase structure
            // For example, if your CSV has columns: Name, Age, Email, and Phone
            name: row['Name'],
            age: row['Age'],
            email: row['Email'],
            phone: row['Phone'],
          };
        results.push(row);
      })
      .on('end', () => {
        resolve(results);
      })
      .on('error', (error) => {
        reject(error);
      });
  });
}

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
