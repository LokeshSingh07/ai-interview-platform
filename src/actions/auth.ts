"use server"

import { errorResponse, successResponse } from "@/lib/response";
import prisma from "../lib/prisma"
import bcrypt from "bcryptjs";



interface SignInIf{
    email: string;
    password: string
}



export async function signIn({email, password}: SignInIf){
    try{
        const user = await prisma.user.findUnique({
            where: { email }
        })

        if (!user) {
            return errorResponse("User not found. Please sign up first.");
        }

        // Verify password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return errorResponse("Invalid credentials. Please try again.");
        }


        return successResponse({ id: user.id, email: user.email }, "Signed in successfully."
        );
    }
    catch(err){
        return errorResponse();
    }
}








