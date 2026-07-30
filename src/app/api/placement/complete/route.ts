import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { savePlacementResult } from "@/lib/access/save-placement-result";

type PlacementPayload = {
  level?: string;
};

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const body = (await request.json()) as PlacementPayload;
    const result = await savePlacementResult({
      supabase,
      userId: user.id,
      level: body.level ?? "",
    });

    if (!result.ok) {
      const status = result.error === "Invalid level" ? 400 : 500;
      return NextResponse.json({ success: false, error: result.error }, { status });
    }

    return NextResponse.json({ success: true, level: result.level });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || "Internal error" },
      { status: 500 }
    );
  }
}
