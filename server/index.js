const express = require('express');
const admin = require('firebase-admin');
const fs = require('fs');
const csv = require('csv-parser');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const cors = require('cors')


let serviceAccount = require("./student-dash-3841e-firebase-adminsdk-p1oir-d0f95191bb.json"); 
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://student-dash-3841e-default-rtdb.firebaseio.com/', 
});

const app = express();
app.use(cors())
const port = 8080; 

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
