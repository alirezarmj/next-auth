import { MongoClient } from "mongodb";

export async function connectToDatabase() {
    const client = await MongoClient.connect('mongodb+srv://javid:DjtztDJzNVrswGmF@cluster0.ctkodcc.mongodb.net/?retryWrites=true&w=majority');
    return client
}