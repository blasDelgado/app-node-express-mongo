import app from "./app.js";
import db from "./database.js"

const port = process.env.port

app.listen(port || 3000, () => {
   console.log(`Server on port ${port}`);
});
