'use server'

import { Event, IEventData } from "@/database";
import connectDB from "../mongodb";

export const getAllEvents = async(): Promise<IEventData[]> => {
    try {
        await connectDB();
        const events = await Event.find().sort({ createdAt: -1 }).lean().exec(); 
        
        return events.map(event => ({
            ...event,
            _id: String(event._id),
        })) as unknown as IEventData[];
        
    } catch {
        return [];
    }
}

export const getEventBySlug = async(slug: string): Promise<IEventData | null> => {
    try {
        await connectDB();
        const event = await Event.findOne({ slug }).lean().exec();
        
        if (!event) return null;
        
        const eventData = event as unknown as IEventData;
        return {
            ...eventData,
            _id: String(eventData._id),
        };
        
    } catch {
        return null;
    }
}

export const getSimilartEventsBySlug = async(slug:string): Promise<IEventData[]>=>{
    try {
        await connectDB();
        const event = await Event.findOne({slug}).lean().exec();
        if (!event) return [];

        const eventData = event as unknown as IEventData;
        const similarEvents = await Event.find({_id:{$ne:eventData._id},tags:{$in:eventData.tags}}).select({
            title: 1,
            slug: 1,
            image: 1,
            location: 1,
            date: 1,
            time: 1,
            _id: 1
        }).lean().exec(); 
        
        return similarEvents.map(event => ({
            ...event,
            _id: String(event._id),
        })) as unknown as IEventData[];
        
    } catch {
        return[];
    }
}