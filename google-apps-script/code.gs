/**
 * Anjalee & Navindu — Wedding RSVP + Wishes → Google Sheets
 *
 * Spreadsheet: https://docs.google.com/spreadsheets/d/19cFsbd5VMS51EDmvPXbyW24qdhHObyWmDB368o6M0a4/edit
 *
 * The "RSVP" and "Wishes" tabs are created automatically (with formatted
 * headers) the first time a response arrives, or when you run setup() once.
 */

const SPREADSHEET_ID = '19cFsbd5VMS51EDmvPXbyW24qdhHObyWmDB368o6M0a4';
const TIMEZONE = 'Asia/Colombo';

const SHEETS = {
  rsvp: {
    name: 'RSVP',
    headers: ['Timestamp', 'Name', 'Attending', 'Guest Count', 'Message', 'Invite Type', 'Submitted At (ISO)'],
    widths: [170, 200, 110, 110, 360, 120, 210],
    row: (p) => [
      now_(),
      clean_(p.name),
      clean_(p.status),
      Number(p.guestCount) || 0,
      clean_(p.message),
      clean_(p.inviteType),
      clean_(p.submittedAt),
    ],
  },
  wishes: {
    name: 'Wishes',
    headers: ['Timestamp', 'Name', 'Wish', 'Submitted At (ISO)'],
    widths: [170, 200, 480, 210],
    row: (p) => [
      now_(),
      clean_(p.name),
      clean_(p.wish),
      clean_(p.submittedAt),
    ],
  },
};

/** Run this once from the Apps Script editor to create both tabs up front (optional). */
function setup() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  Object.keys(SHEETS).forEach((key) => getOrCreateSheet_(ss, key));
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000);

    const key = String((e && e.parameter && e.parameter.sheet) || '').toLowerCase();
    if (!SHEETS[key]) {
      return json_({ ok: false, error: 'Invalid sheet. Use "rsvp" or "wishes".' });
    }

    const payload = JSON.parse((e && e.parameter && e.parameter.payload) || '{}');
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = getOrCreateSheet_(ss, key);

    sheet.appendRow(SHEETS[key].row(payload));

    return json_({ ok: true, sheet: SHEETS[key].name });
  } catch (err) {
    return json_({ ok: false, error: String(err && err.message ? err.message : err) });
  } finally {
    try { lock.releaseLock(); } catch (_) {}
  }
}

function doGet(e) {
  const action = String((e && e.parameter && e.parameter.action) || '').toLowerCase();
  if (action === 'health') {
    return json_({ ok: true, service: 'anjalee-navindu-wedding', timestamp: new Date().toISOString() });
  }
  return json_({ ok: true, message: 'POST with sheet=rsvp|wishes and payload=<json>' });
}

/* ---------------- helpers ---------------- */

function getOrCreateSheet_(ss, key) {
  const cfg = SHEETS[key];
  let sheet = ss.getSheetByName(cfg.name);
  if (!sheet) sheet = ss.insertSheet(cfg.name);
  ensureHeaders_(sheet, cfg);
  return sheet;
}

function ensureHeaders_(sheet, cfg) {
  const cols = cfg.headers.length;
  const firstRow = sheet.getLastRow() > 0
    ? sheet.getRange(1, 1, 1, cols).getValues()[0].map(String)
    : [];

  // Already has the correct headers — nothing to do.
  if (firstRow.join('|') === cfg.headers.join('|')) return;

  // Sheet has data but no header row — insert one on top.
  if (sheet.getLastRow() > 0) sheet.insertRowBefore(1);

  const header = sheet.getRange(1, 1, 1, cols);
  header
    .setValues([cfg.headers])
    .setFontWeight('bold')
    .setFontColor('#ffffff')
    .setBackground('#064e3b')
    .setHorizontalAlignment('center')
    .setVerticalAlignment('middle');

  sheet.setFrozenRows(1);
  sheet.setRowHeight(1, 32);
  cfg.widths.forEach((w, i) => sheet.setColumnWidth(i + 1, w));
  sheet.getRange(2, 1, sheet.getMaxRows() - 1, 1).setNumberFormat('yyyy-mm-dd hh:mm:ss');
  sheet.getRange(1, 1, sheet.getMaxRows(), cols).setWrap(true).setVerticalAlignment('top');
  header.setVerticalAlignment('middle');
}

function now_() {
  return Utilities.formatDate(new Date(), TIMEZONE, 'yyyy-MM-dd HH:mm:ss');
}

function clean_(v) {
  if (v === null || v === undefined) return '';
  let s = String(v).trim();
  // Prevent spreadsheet formula injection from user-entered text.
  if (/^[=+\-@]/.test(s)) s = "'" + s;
  return s;
}

function json_(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON);
}
