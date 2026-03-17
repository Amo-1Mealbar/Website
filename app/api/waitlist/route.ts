import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    const apiKey = process.env.LOOPS_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { success: false, error: "Waitlist is temporarily unavailable." },
        { status: 500 }
      );
    }

    const res = await fetch("https://app.loops.so/api/v1/contacts/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({ email, source: "waitlist" }),
    });

    const data = await res.json();

    // Treat duplicate as success
    if (res.ok || data.message?.includes("already")) {
      return NextResponse.json({ success: true });
    }

    return NextResponse.json(
      { success: false, error: "Could not join the waitlist. Please try again." },
      { status: 500 }
    );
  } catch {
    return NextResponse.json(
      { success: false, error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
