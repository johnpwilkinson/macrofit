"use server";

// Import Prisma client
import { prisma } from "@/lib/prisma"; // Make sure the path is correct based on your project structure

// Server action to add a new user to Supabase using Prisma
export async function addNewUser(eventData) {
  console.log("webhook init");
  try {
    // Extract relevant user data from the event payload (e.g., user.created event)
    const { id, email, first_name, last_name } = eventData.user;
    console.log("EVENT_DATA", id, email, first_name, last_name);
    // Insert the new user into the MacroFitUser table using Prisma
    const newUser = await prisma.macroFitUser.create({
      data: {
        id: id, // Assuming you receive the user ID from Kinde or generate a new one
        email: email,
        first_name: first_name,
        last_name: last_name,
        createdAt: new Date(), // Set the createdAt timestamp
        updatedAt: new Date(), // Set the updatedAt timestamp
      },
    });

    console.log("New user created successfully:", newUser);
    return newUser;
  } catch (err) {
    console.error("Error adding new user:", err.message);
    throw new Error(`Failed to add new user: ${err.message}`);
  }
}
