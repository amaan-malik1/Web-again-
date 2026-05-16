import express from "express";
import cors from "cors";
import authRouter from "./router/auth.route.js";
import { connectDB } from "./lib/db.js";
const app = express();
const PORT = process.env.PORT || 5001;
app.use(cors());
app.use(express.json());
app.use("/api/v1/auth", authRouter);
try {
    app.listen(PORT, () => {
        console.log(`Server running sucess at http://localhost:${PORT} `);
    });
    connectDB();
}
catch (error) {
    console.log(`Error while connecting to server: `, error);
}
//# sourceMappingURL=index.js.map