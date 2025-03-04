import { Request, Response } from "express";
import Interview from "../models/Interviews";


export const addInterview = async (req: Request, res: Response) => {
    try {
        const { username, role, alumniRole, userId, interviewDate, numberOfSlots, slots, interviewLink } = req.body;
        const newInterview = new Interview({
            username,
            role,
            alumniRole,
            userId,
            interviewDate,
            numberOfSlots,
            slots:slots.map((time: string) => ({ startTime: time })),
            interviewLink
        });

        await newInterview.save();
        res.status(201).json({ message: "Interview added successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to add interview" });
    }
};

export const getInterviews = async (req: Request, res: Response) => {
    try {
        const interviews = await Interview.find();
        res.json(interviews);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch interviews" });
    }
}

export const bookInterview = async (req: Request, res: Response) => {
    try {
        const { interviewId, slotIndex, userId } = req.body;

        const interview = await Interview.findById(interviewId);
        if (!interview){
            throw new Error("Interview not found")
        }

        if (interview.slots[slotIndex].bookedBy) {
            throw new Error("Slot already booked");
        }

        interview.slots[slotIndex].bookedBy = userId;
        await interview.save();

        res.json({ message: "Slot booked successfully" });
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: "An unknown error occurred" });
        }
    }
}