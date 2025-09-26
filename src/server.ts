import app from "./app";
import connectDb from "./config/mongoose";

const PORT = process.env.PORT;

const startServer = async (): Promise<void> => {
  try {
    await connectDb();

    app.listen(PORT, () => {
      console.log(`Server started successfully on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error(" Failed to start server:", err);
  }
};

startServer();
