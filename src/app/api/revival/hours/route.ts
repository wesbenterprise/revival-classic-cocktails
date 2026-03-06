import { NextRequest, NextResponse } from 'next/server';
import { createServerClient, createServiceClient } from '@/lib/supabase';

const TABLE = 'revival_hours';

export async function GET() {
  const sb = createServerClient();
  const { data, error } = await sb.from(TABLE).select('*').order('day');
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function PUT(req: NextRequest) {
  const sb = createServiceClient();
  const body = await req.json();

  // Accept either a single update or a batch (array)
  if (Array.isArray(body)) {
    const results = [];
    for (const row of body) {
      const { id, day, ...rest } = row;
      rest.updated_at = new Date().toISOString();
      // Use day as the identifier since it's unique
      const filter = id ? { id } : { day };
      const key = Object.keys(filter)[0] as string;
      const { data, error } = await sb.from(TABLE).update(rest).eq(key, filter[key as keyof typeof filter]).select().single();
      if (error) return NextResponse.json({ error: error.message }, { status: 500 });
      results.push(data);
    }
    return NextResponse.json(results);
  }

  const { id, day, ...rest } = body;
  rest.updated_at = new Date().toISOString();
  const key = id ? 'id' : 'day';
  const val = id || day;
  if (!val) return NextResponse.json({ error: 'id or day required' }, { status: 400 });
  const { data, error } = await sb.from(TABLE).update(rest).eq(key, val).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
