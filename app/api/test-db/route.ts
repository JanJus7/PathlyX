import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";

export async function GET() {
  try {
    await connectToDatabase();
    
    return NextResponse.json({ 
      status: "Sukces!", 
      message: "Połączono z MongoDB Atlas." 
    });
  } catch (error) {
    console.error("Błąd połączenia z bazą:", error);
    return NextResponse.json({ 
      status: "Błąd", 
      message: "Nie udało się połączyć." 
    }, { status: 500 });
  }
}