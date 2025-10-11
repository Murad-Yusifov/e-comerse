import express from "express"
import cors from "cors"
import computerRouter from "./routes/router.js"
import { connectDB } from "./config/config.js"
import userRoute from "./routes/userRouter.js"
import cataforyRoute from "./routes/catagoryRouter.js"
import productRoute from "./routes/productRouter.js"
import orderRoute from "./routes/orderRouter.js"
import imageRoute from "./routes/imageRoute.js"
import authRoutes from "./routes/auth.js"

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())

connectDB()

app.use("/", computerRouter)
app.use('/api/users', userRoute);
app.use("/api/images", imageRoute);
app.use('/api/categories', cataforyRoute);
app.use('/api/products', productRoute);
app.use('/api/orders', orderRoute);
app.use("/api/auth", authRoutes);
// app.use(express.urlencoded({extended:true})) 
// app.use(cors('*'))
// app.use('/', ProductRouter )
// app.use('/', BasketRouter )


app.listen(5000, ()=>{
    console.log("http://localhost:5000") 
})


// {"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4ZThlZmQ2YzFlYzY5NDkzYjJhY2FhYyIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc2MDA5NjIxNCwiZXhwIjoxNzYwMDk5ODE0fQ.DVBqi7byTL8d5LHcsQWuN2lE_ipGKcUU1AJPvKYzF6E","user":{"id":"68e8efd6c1ec69493b2acaac","name":"Admin Test","email":"admin2@example.com","role":"admin"}}
// {
//   "name": "Admin Test",
//   "email": "admin2@example.com",
//   "password": "adminpass",  // hash if needed
//   "role": "admin"
// }

// {
//     "_id": "68e8efd6c1ec69493b2acaac",
//     "name": "Admin Test",
//     "email": "admin2@example.com",
//     "password": "$2b$10$cup9wmvhTFueTJKC0rHg/u.ij.I.iH40xQXsJfhbVYnad2QtnUaxe",
//     "role": "admin",
//     "createdAt": "2025-10-10T11:36:54.336Z",
//     "__v": 0
//   }