import "./src/config/env.js"
import { app } from "./src/app.js"
import { connectDB } from "./src/db/db.js"

connectDB()
    .then(() => {
        app.listen(process.env.PORT || 8000, () => {
            console.log(`server is running at port: ${process.env.PORT}`)
        })
    })
    .catch((err) => {
        console.log("MONGO db connection failed !!! ", err)
    })