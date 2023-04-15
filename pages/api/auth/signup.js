import { hashedPassword } from "@/helper/auth";

const { connectToDatabase } = require("@/helper/db");

async function handler(req, res) {
    if (req.method !== 'POST') {
        return
    }
    const { email, password } = req.body;
    if (!email || !email.includes('@') || !password || password.trim().length < 6) {
        res.status(422).json({ message: "Invalid input-password should also be at least 6 characters long " });
        return;
    }
    const client = await connectToDatabase()
    const db = client.db();
    const existingUser = await db.collection('users').findOne({ email: email })
    if (existingUser) {
        res.status(400).json({ message: 'User exist already!' });
       
        client.close();
        return
    }
    const hashPassword = await hashedPassword(password)
    await db.collection('users').insertOne({ email, password: hashPassword })
    res.status(201).json({ message: "Created User" })
    client.close()
}

export default handler;