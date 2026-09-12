// Notfound middleware
const notFound = (req, res) => {
  res.status(404).json({
    error: "ma jiro Route-kaan",
  });
};

export default notFound;
