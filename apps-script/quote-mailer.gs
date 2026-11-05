/**
 * LNC website → quote request email (Google Apps Script web app).
 *
 * The Get a Quote form POSTs JSON here; this emails it to the shop with the
 * photos attached, sent from the Google account that deploys the script.
 *
 * Deploy (once, ~3 minutes):
 *   1. https://script.google.com → New project → paste this file → Save.
 *   2. Deploy → New deployment → type "Web app".
 *      Execute as: Me.  Who has access: Anyone.  → Deploy → Authorize.
 *   3. Copy the Web app URL (https://script.google.com/macros/s/…/exec) and
 *      put it in src/data/site.ts → quoteEndpoint.
 * After editing this file: Deploy → Manage deployments → Edit → New version
 * (the URL stays the same).
 */
const TO = 'ben@lnccollision.com';

function doPost(e) {
  try {
    const d = JSON.parse(e.postData.contents);
    if (d.honey) return reply({ ok: true }); // spam bot

    const fields = (d.fields || []).filter((f) => f[1]);
    const html =
      '<table style="font:15px/1.5 Arial,sans-serif;border-collapse:collapse">' +
      fields
        .map((f) =>
          '<tr><th align="left" style="padding:6px 16px 6px 0;vertical-align:top;color:#555">' + esc(f[0]) +
          '</th><td style="padding:6px 0">' + esc(f[1]).replace(/\n/g, '<br>') + '</td></tr>')
        .join('') +
      '</table>';
    const text = fields.map((f) => f[0] + ': ' + f[1]).join('\n');
    const attachments = (d.photos || []).map((p) =>
      Utilities.newBlob(Utilities.base64Decode(p.data), p.type || 'image/jpeg', p.name || 'photo.jpg'));

    const options = { to: TO, subject: String(d.subject || 'Quote request'), body: text, htmlBody: html, name: 'LNC website', attachments };
    if (d.replyTo && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(d.replyTo)) options.replyTo = d.replyTo;
    MailApp.sendEmail(options);
    return reply({ ok: true });
  } catch (err) {
    return reply({ ok: false, error: String(err) });
  }
}

function doGet() {
  return reply({ ok: true, service: 'LNC quote mailer' });
}

function reply(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

function esc(s) {
  return String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
}
