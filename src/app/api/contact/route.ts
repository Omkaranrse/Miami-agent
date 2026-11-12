import { NextResponse } from "next/server";
import { contactFormSchema, processInquiryPayload } from "@/lib/validations";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const res = await processInquiryPayload(body, contactFormSchema);
    return NextResponse.json(res.payload, { status: res.status });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request payload." },
      { status: 400 }
    );
  }
}

