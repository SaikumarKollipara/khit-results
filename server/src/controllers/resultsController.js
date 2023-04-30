export async function uploadResults (req, res, next) {
  try {
    res.send('upload results')
  } catch (err) {
    next(err);
  }
}