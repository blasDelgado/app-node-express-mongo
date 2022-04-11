import app from "./app"
import db from "./database"

const port = process.env.port

app.listen(port, () => {
   console.log(`Server on port ${port}`);
});
