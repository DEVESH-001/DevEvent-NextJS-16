import { Event } from "@/database";
import connectDB from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "dkfv0r0y9",
  api_key: process.env.CLOUDINARY_API_KEY || "974719142245354",
  api_secret: process.env.CLOUDINARY_API_SECRET || "l8cQrKG9XHytUrTAJdecEXZmi9U",
});

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const formData = await req.formData();

    let event; // Define event variable
    try {
      event = Object.fromEntries(formData.entries());
    } catch (error) {
      console.log(error);
      return NextResponse.json(
        { message: "Invalid form data" },
        { status: 400 }
      );
    }
    //get the uploaded file
    const file = formData.get("image") as File;
    if (!file)
      return NextResponse.json(
        { message: "Image file is required" },
        { status: 400 }
      );
    
    let tags, agenda;
    
    try {
      const tagsData = formData.get('tags') as string;
      tags = tagsData ? JSON.parse(tagsData) : [];
    } catch (error) {
      console.log('Tags parsing error:', error);
      tags = [];
    }
    
    try {
      const agendaData = formData.get('agenda') as string;
      agenda = agendaData ? JSON.parse(agendaData) : [];
    } catch (error) {
      console.log('Agenda parsing error:', error);
      // If JSON parsing fails, treat as plain text and split by lines or commas
      const agendaText = formData.get('agenda') as string;
      agenda = agendaText ? agendaText.split('\n').filter(item => item.trim()) : [];
    }
    //if file is there -> convert the file to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    //upload
    const uploadedResult = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            resource_type: "image",
            folder: "DevEvents",
          },
          (error, results) => {
            if (error) return reject(error);
            resolve(results);
          }
        )
        .end(buffer);
    });
    //set the image url to event object
    event.image = (uploadedResult as { secure_url: string }).secure_url;

    // Create new event document
    const createdEvent = await Event.create({
      ...event,
      tags: tags,
      agenda: agenda,
    });

    return NextResponse.json(
      { message: "Event Created Successfully", event: createdEvent },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Event Creation Failed",
        error: error instanceof Error ? error.message : "Unknown Error",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectDB();
    const events = await Event.find().sort({ createdAt: -1 }); //-1 will show latest first

    return NextResponse.json(
      { message: "Events fetched successfully", events },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Failed to fetch events" },
      { status: 500 }
    );
  }
}


// a route that accept a slug as a input -> return the event details for that slug
