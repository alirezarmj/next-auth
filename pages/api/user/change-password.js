import { hashedPassword, verifyPassword } from "@/helper/auth";
import { connectToDatabase } from "@/helper/db";

const { getSession } = require("next-auth/react");

async function handler(req, res) {

    if (req.method !== 'PATCH') {         //STEP 1
        return;
    }

    const session = await getSession({ req })     //STEP 2 (PROTECT API of another request)

    if (!session) {
        res.status(401).json({ message: 'Not Authenticated !' })
        return
    }

    const userEmail = session.user.email;
    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;
    const client = await connectToDatabase();
    const userCollection = client.db().collection('users')
    const user = await userCollection.findOne({ email: userEmail });
    if (!user) {
        res.status(404).json({ message: 'user not found' })
        client.close()
        return
    }
    const currentPassword = user.password;
    const passwordsAreEqual = await verifyPassword(oldPassword, currentPassword);
    if (!passwordsAreEqual) {
        res.status(403).json({ message: 'Invalid password !' })
        client.close()
        return
    }
const hashPassword=await hashedPassword(newPassword)
const result=await userCollection.updateOne({email:userEmail},{$set:{password:hashPassword}})
client.close()
res.status(200).json({message:'password updated !'})
}

export default handler;