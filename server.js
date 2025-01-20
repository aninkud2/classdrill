const express = require('express');

const cors = require('cors');
const userRoutes = require('./router/router');


const app = express();
const PORT = 6754;

// Middleware
app.use(cors());
app.use(express.json());
const fileUpload = require('express-fileupload');




app.use(fileUpload({ useTempFiles: true, tempFileDir: '/tmp/' })); 
// Routes
app.use('/api/v1/', userRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
