const express = require("express")
const supabase = require("../conifg/supabase.config.js")
const router = express.Router()
const fileModel = require("../models/files.models.js")
const authMiddleware = require("../middleware/auth.middleware.js")

router.get("/home", authMiddleware, (req, res)=>{
    const message = req.query.message || ""; 
    res.render("home", { message })})

router.post('/upload-file', authMiddleware,  async (req, res) => {
    if (!req.files || !req.files.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
  
    const file = req.files.file;
    const fileName = `${Date.now()}_${file.name}`;
    const userId = req.user.userId

    try {
      const { data, error } = await supabase
        .storage
        .from('drive')
        .upload(`uploads/${userId}/${fileName}`, file.data, {
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

router.get("/my-files", authMiddleware, async (req, res) => {
  const { userId } = req.user;

  try {
    const { data: files, error } = await supabase
      .storage
      .from("drive")
      .list(`uploads/${userId}`, { limit: 100 });

    if (error) {
      console.error("Failed to fetch files:", error);
      return res.status(500).json({ message: "Failed to fetch files" });
    }

    const userFiles = files.map((file) => {
      const publicUrlResponse = supabase
        .storage
        .from("drive")
        .getPublicUrl(`uploads/${userId}/${file.name}`);
      
        const testUrl = supabase.storage.from('drive').getPublicUrl('uploads/672caf647d6744fff3e6845e/1731066515310_photon.png');
        console.log("Manual Test Public URL:", testUrl.publicURL);
        

      const publicURL = publicUrlResponse.publicURL;

      console.log("Generated Public URL:", publicURL);

      return { name: file.name, publicURL };
    });

    res.render("my-files", { userFiles });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router