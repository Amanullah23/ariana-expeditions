"use server";
import { query } from "@/lib/db";

export async function createInquiry(data) {
  await query(
    `insert into inquiries
       (fullname, email, phone, preferred_trip, travel_dates, travelers, message, passport_path)
     values ($1, $2, $3, $4, $5, $6, $7, $8)`,
    [
      data.fullname || null,
      data.email || null,
      data.phone || null,
      data.preferredTrip || null,
      data.travelDates || null,
      data.travelers ? Number(data.travelers) : null,
      data.message || null,
      data.passportPath || null,
    ],
  );
}
