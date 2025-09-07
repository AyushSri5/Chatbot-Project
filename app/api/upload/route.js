import { connectDB } from "../../utils/connectDB"; 
import { SRTLoader } from "@langchain/community/document_loaders/fs/srt";
import { OpenAIEmbeddings } from "@langchain/openai";
import { QdrantVectorStore } from "@langchain/qdrant";
import { NextResponse } from "next/server";
import path from "node:path";
import fs from "node:fs";
import { Video } from "../../models/Video.model";
import { v4 as uuidv4 } from 'uuid';

export async function POST(req) {
  const { url } = await req.json();
  await connectDB();
  // console.log("Docs ",docs);
  const folderPath = "./app/api/genai-cohort/nodejs/02 Subtitles - Auth&Sec"; // change to your folder path

  fs.readdir(folderPath, async (err, files) => {
    if (err) {
      console.error("Error reading directory:", err);
      return;
    }

    for (const file of files) {
      const filePath = path.join(folderPath, file);
      console.log("File path", filePath);

      // console.log("Docs ",docs);
      // break;

      if (fs.lstatSync(filePath).isFile()) {
        // full filename
        const loader = new SRTLoader(filePath);

        const docs = await loader.load();
        const embeddings = new OpenAIEmbeddings({
          model: "text-embedding-3-large",
        });

        const vectorStore = await QdrantVectorStore.fromDocuments(
          docs,
          embeddings,
          {
             url: process.env.VECTORDB_URI,
            apiKey: process.env.VECTORDB_API_KEY,
            collectionName: "chatbot-project",
          }
        );
        console.log("Indexing of documents completed");
        
        console.log("Loaded documents:", docs);
        const fileName = path.basename(file);

        // filename without extension
        const fileNameWithoutExt = path.parse(file).name;
        await Video.create({
            id: uuidv4(),
            name:  fileNameWithoutExt,
            course: "Nodejs"
        });
        console.log("Full Name:", fileName);
        console.log("Without Extension:", fileNameWithoutExt);
        console.log("---------");
      }
    }
  });

  return NextResponse.json({
    message: "SRT file processed successfully",
  });
}
