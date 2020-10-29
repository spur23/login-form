import mongoose from "mongoose";

const dbConnect = async (mongoConnection) => {
	try {
		// connect to MongoDB
		const conn = await mongoose.connect(mongoConnection, {
			useUnifiedTopology: true,
			useNewUrlParser: true,
			useCreateIndex: true,
		});

		console.log(`Connected to MongoDB ${conn.connection.host}`.green.bold);
	} catch (error) {
		console.error(`Error: ${error.message}`.red.underline.bold);
		process.exit(1);
	}
};

export default dbConnect;
