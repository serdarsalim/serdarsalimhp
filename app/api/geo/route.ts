import { NextResponse } from 'next/server';
import { countryOptions } from '@/app/data/countries';

export async function GET(request: Request) {
  const headers = request.headers;
  const rawCode =
    headers.get('x-vercel-ip-country') ??
    headers.get('cf-ipcountry') ??
    headers.get('x-country-code') ??
    '';

  const normalizedCode = rawCode?.toUpperCase();
  let country = null;

  if (normalizedCode) {
    if (normalizedCode.length === 2) {
      country = countryOptions.find((option) => option.iso2 === normalizedCode) ?? null;
    } else if (normalizedCode.length === 3) {
      country = countryOptions.find((option) => option.code === normalizedCode) ?? null;
    }
  }

  return NextResponse.json({
    country: country ?? null,
  });
}
