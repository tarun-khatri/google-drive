const express = require("express")
const supabase = require("../conifg/supabase.config.js")
const router = express.Router()
const fileModel = require("../models/files.models.js")
const authMiddleware = require("../middleware/auth.middleware.js")

router.get("/home", authMiddleware, (req, res)=>{
    const message = req.query.message || ""; 
    res.render("home", { message })})

router.post('/upload-file', async (req, res) => {
    if (!req.files || !req.files.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
  
    const file = req.files.file;
    const fileName = `${Date.now()}_${file.name}`;
  
    try {
      const { data, error } = await supabase
        .storage
        .from('drive')
        .upload(`uploads/${fileName}`, file.data, {
          contentType: file.mimetype,
        });
  
      if (error) {
        console.error("Upload failed:", error);
        return res.status(500).json({ error: error.message });
      }
  
      res.redirect('/home?message=File uploaded successfully');
    } catch (error) {
        console.error("Error uploading file:", error);
        res.status(500).json({ error: 'Failed to upload file' });
    }
});

module.exports = router