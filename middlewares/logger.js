// Logger js middlareware

export const logger = (req, res, next) => {
  console.log(`${req.method}  ${new Date().toISOString()} ${req.url}`);
  next();
}