import app from "./app.js";
import db from "./database.js"

const port = process.env.PORT || 3000;

app.listen(port, () => {
   console.log(`Server on port ${port}`);
});
