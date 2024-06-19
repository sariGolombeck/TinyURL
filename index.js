
import express from 'express';
import cors from 'cors';
import userRouter  from './routes/userRoutes.js'; // נניח ש-userRoutes.js מייבא את userController.js כראוי
import linkRouter from './routes/linkRoutes.js';
import { connectDB, accessCollection } from './database.js';

const app = express();

app.use(cors());
app.use(express.json()); // תמיכה בפרסר JSON

await connectDB();
await accessCollection(); // קריאה לפונקציה accessCollection

// שימוש בראוטים
app.use('/', userRouter);
app.use('/', linkRouter);
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`שרת פועל על פורט ${port}`);
});
