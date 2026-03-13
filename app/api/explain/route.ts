import { NextRequest, NextResponse } from "next/server";
import { explainTopic } from "@/lib/aiClient";

export async function POST(req: NextRequest) {
  try {
    const { topic } = await req.json();

    if (!topic || topic.trim() === "") {
      return NextResponse.json(
        { error: "Please enter a topic to continue." },
        { status: 400 }
      );
    }

    const explanation = await explainTopic(topic);
    return NextResponse.json({ explanation });

  } catch (error: any) {
    console.error("API ERROR:", error?.message || error);
    return NextResponse.json(
      { error: error?.message || "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}