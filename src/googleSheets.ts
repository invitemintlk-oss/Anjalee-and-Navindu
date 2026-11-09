type SheetName = 'rsvp' | 'wishes';

type SheetPayload = Record<string, string | number>;

// Apps Script Web App for the Anjalee & Navindu RSVP + Wishes sheet.
const GOOGLE_SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbx0ODX8kPE6_EwPOyyx979iF-TA9JU5XZDjaJ3nRbuGiNzs-6Xo1Pziy1Va_al4tGKD/exec';

export async function submitToGoogleSheet(sheet: SheetName, payload: SheetPayload): Promise<void> {
  if (!GOOGLE_SCRIPT_URL || !GOOGLE_SCRIPT_URL.startsWith('https://script.google.com/')) {
    throw new Error('Google Apps Script URL is not configured');
  }

  const body = new URLSearchParams();
  body.append('sheet', sheet);
  body.append('payload', JSON.stringify(payload));

  // Apps Script web apps don't send CORS headers; no-cors still delivers the request.
  await fetch(GOOGLE_SCRIPT_URL, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
    body: body.toString(),
  });
}
