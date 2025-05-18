import app from '../src/app';
import mongoose from 'mongoose';

const { PORT = 3000, DB_URL } = process.env;

mongoose
  .connect(`${DB_URL}`)
  .then(() => {
    app.listen(PORT, () => {
      console.log(
        `Database connection successful, listening: http://localhost:${PORT}`
      );
    });
  })
  .catch(error => {
    console.log(error);
    process.exit(1);
  });
