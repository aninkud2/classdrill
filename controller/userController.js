const db = require('../db');
const { v4: uuidv4 } = require('uuid');
// Get all users
exports.getAllUsers = (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(200).json(results);
    }
  });
};

// Get a single user by ID
exports.getUserById = (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM users WHERE id = ?', [id], (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (results.length === 0) {
      res.status(404).json({ message: 'product not found' });
    } else {
      res.status(200).json(results[0]);
    }
  });
};

// Create a new user
// exports.createUser = async(req, res) => {
//  try {
//     const { name, email, phone } = req.body;
//     db.query(
//       'INSERT INTO users (name, email, phone) VALUES (?, ?, ?)',
//       [name, email, phone],
//       (err, results) => {
//         if (err) {
//           res.status(500).json({ error: err.message });
//         } else {
//           res.status(201).json({ id: results.insertId, name, email, phone });
//         }
//       }
//     );
//  } catch (error) {
//     res.status(500).json(error.message)
//  }
// // };

const cloudinary = require('cloudinary').v2;
const fileUpload = require('express-fileupload');

// Cloudinary configuration
cloudinary.config({
  cloud_name: 'dr1usj92l', // Replace with your Cloudinary cloud name
  api_key: '347961194117378',       // Replace with your Cloudinary API key
  api_secret: '4jUjGgDwCu6DjRiMD3cyIcBI1a4', // Replace with your Cloudinary API secret
});

exports.createUser = async (req, res) => {
  try {
    // Ensure file upload middleware is configured
    if (!req.files || !req.files.ProductImage) {
      return res.status(400).json({ error: 'ProductImage file is required.' });
    }

    const { productName, productQty, ProductPrice } = req.body;
    const { ProductImage } = req.files;
    const id = uuidv4();

    // Upload the image to Cloudinary
    const uploadResponse = await cloudinary.uploader.upload(ProductImage.tempFilePath, {
      folder: 'shoprite-products', // Optional folder name in Cloudinary
    });
 
    // Use the Cloudinary URL for the image
    const imageUrl = uploadResponse.secure_url;

    // Save the product to the database
    db.query(
      'INSERT INTO users (id, productName, productQty, ProductPrice, ProductImage) VALUES (?, ?, ?, ?, ?)',
      [id, productName, productQty, ProductPrice, imageUrl],
      (err, results) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: 'Failed to save product.' });
        }

        res.status(201).json({
          data: {
            id,
            productName,
            productQty,
            ProductPrice,
            ProductImage: imageUrl,
          },
        });
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

  
// Update an existing user
exports.updateUser = (req, res) => {
  const { id } = req.params;
  const {productName, productQty, ProductPrice,ProductImage } = req.body;
  db.query(
    'UPDATE users SET productName= ?, productQty = ?, productPrice = ? ,productImage = ?WHERE id = ?',
    [productName, productQty, ProductPrice,ProductImage, id],
    (err) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(200).json({ message: 'User updated successfully' });
      }
    }
  );
};

// Delete a user
exports.deleteUser = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM users WHERE id = ?', [id], (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(200).json({ message: 'product deleted successfully' });
    }
  });
};
// add a score to user

