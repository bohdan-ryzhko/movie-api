import mongoose from 'mongoose';

const { DB_URL } = process.env;

export const clearDatabase = async () => {
  try {
    await mongoose.connect(`${DB_URL}`);

    await mongoose.connection.collection('users').deleteMany({});
    await mongoose.connection.collection('movies').deleteMany({});
  } catch (error) {
  } finally {
    mongoose.connection.close();
  }
};
