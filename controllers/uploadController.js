export const uploadFile = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  res.status(201).json({
    success: true,
    fileUrl: req.file.path
  });
};
