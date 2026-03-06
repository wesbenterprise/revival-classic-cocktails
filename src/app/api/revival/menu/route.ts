import { NextRequest, NextResponse } from 'next/server';
import { createServerClient, createServiceClient } from '@/lib/supabase';

const TABLE = 'revival_menu_items';

export async function GET() {
  const sb = createServerClient();
  const { data, error } = await sb.from(TABLE).select('*').order('category').order('sort_order');
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const sb = createServiceClient();
  const body = await req.json();
  const { data, error } = await sb.from(TABLE).insert(body).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data, { status: 201 });
}

export async function PUT(req: NextRequest) {
  const sb = createServiceClient();
  const body = await req.json();
  const { id, ...rest } = body;
  if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 });
  rest.updated_at = new Date().toISOString();
  const { data, error } = await sb.from(TABLE).update(rest).eq('id', id).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function DELETE(req: NextRequest) {
  const sb = createServiceClient();
  const { id } = await req.json();
  if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 });
  const { error } = await sb.from(TABLE).delete().eq('id', id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
