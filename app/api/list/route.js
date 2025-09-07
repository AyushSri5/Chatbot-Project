import { Video } from "../../models/Video.model";
import { NextResponse } from "next/server";

export async function GET(req){
    const searchParams = req.nextUrl.searchParams;
  const course = searchParams.get('course')
    const list = await Video.find({});

    // console.log("Docs",list);


    return NextResponse.json({
        message: "List of Documents",
        docs: list,
        course
    });
}