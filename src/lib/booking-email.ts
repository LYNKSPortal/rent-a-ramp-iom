import { CONTACT, SITE } from "@/lib/site-config";

interface BookingEmailDetails {
  name: string;
  email: string;
  phone: string;
  notes: string;
  ramp: string;
  date: string;
  time: string;
  duration: string;
  price: string;
}

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  })[character]!);
}

export function renderBookingEmail(details: BookingEmailDetails, audience: "customer" | "owner"): string {
  const customer = audience === "customer";
  const heading = customer ? "Thank you for your submission" : "New booking request";
  const intro = customer
    ? `Hi ${escapeHtml(details.name)}, a member of our team will be in touch within <strong>24 hours</strong>.`
    : "A customer has requested a workshop bay. Please check availability and reply within <strong>24 hours</strong>.";
  const notice = customer
    ? "This email confirms receipt of your request only. Please wait for a member of our team to contact you and confirm availability before coming to the workshop. No payment has been taken."
    : "This request has not been confirmed. The customer has received an acknowledgement only. Reply to this email to contact the customer and confirm availability.";
  const rows = [
    ["Ramp", details.ramp], ["Date", details.date], ["Time", `${details.time} (Isle of Man local time)`],
    ["Duration", details.duration], ["Total including VAT", details.price],
    ["Customer", details.name], ["Email", details.email], ["Phone", details.phone],
  ].map(([label, value]) => `<tr><th scope="row" align="left" valign="top" style="padding:13px 16px;border-bottom:1px solid #e2e2e2;font-size:14px;font-weight:400;color:#6b6b6b;width:38%;">${escapeHtml(label)}</th><td valign="top" style="padding:13px 16px;border-bottom:1px solid #e2e2e2;font-size:14px;font-weight:600;color:#000000;overflow-wrap:anywhere;">${escapeHtml(value)}</td></tr>`).join("");
  const actionUrl = customer ? SITE.url : `mailto:${details.email}`;
  const actionText = customer ? "Visit our website" : "Reply to customer";
  const logoUrl = `${SITE.url}/logo-dark.png`;
  const contactEmail = escapeHtml(CONTACT.email);
  return `<!DOCTYPE html>
<html lang="en-GB">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="color-scheme" content="light"><title>${heading} | Rent a Ramp</title></head>
<body style="margin:0;padding:0;background-color:#f7f7f7;color:#000000;font-family:Arial,Helvetica,sans-serif;-webkit-text-size-adjust:100%;">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;mso-hide:all;">${customer ? "We received your request. Our team will respond within 24 hours. Your booking is not yet confirmed." : "New ramp hire request. Check availability and reply to the customer within 24 hours."}</div>
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" bgcolor="#f7f7f7"><tr><td align="center">
<table role="presentation" width="640" cellspacing="0" cellpadding="0" border="0" style="width:100%;max-width:640px;">
<tr><td bgcolor="#ffffff" style="padding:28px 24px;"><a href="${escapeHtml(SITE.url)}" style="text-decoration:none;"><img src="${escapeHtml(logoUrl)}" width="300" height="44" alt="Rent a Ramp" style="display:block;width:300px;max-width:100%;height:auto;border:0;"></a></td></tr>
<tr><td bgcolor="#000000" style="padding:13px 24px;color:#ffffff;font-size:11px;line-height:18px;letter-spacing:2px;text-transform:uppercase;">Self-service vehicle workshop &bull; Douglas, Isle of Man</td></tr>
<tr><td style="padding:40px 24px 32px;">
<p style="margin:0 0 12px;color:#e10205;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;">Booking request received</p>
<h1 style="margin:0 0 20px;color:#000000;font-family:'Arial Narrow',Arial,Helvetica,sans-serif;font-size:30px;line-height:36px;font-weight:800;text-transform:uppercase;">${heading}</h1>
<p style="margin:0 0 24px;font-size:16px;line-height:26px;">${intro}</p>
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" bgcolor="#ffffff"><tr><td style="border-left:3px solid #e10205;padding:22px;">
<h2 style="margin:0 0 10px;font-size:18px;line-height:24px;text-transform:uppercase;">${customer ? "Your booking is not yet confirmed" : "Confirmation required"}</h2>
<p style="margin:0;color:#6b6b6b;font-size:14px;line-height:23px;">${notice}</p></td></tr></table>
<h2 style="margin:30px 0 12px;font-size:18px;line-height:24px;text-transform:uppercase;">Requested booking details</h2>
<table width="100%" cellspacing="0" cellpadding="0" border="0" bgcolor="#ffffff" style="border-collapse:collapse;table-layout:fixed;">${rows}</table>
<p style="margin:20px 0 6px;font-size:14px;font-weight:700;">Notes</p>
<p style="margin:0 0 26px;font-size:14px;line-height:23px;color:#6b6b6b;overflow-wrap:anywhere;">${escapeHtml(details.notes || "None").replace(/\r?\n/g, "<br>")}</p>
<table role="presentation" cellspacing="0" cellpadding="0" border="0"><tr><td bgcolor="#e10205" style="mso-padding-alt:14px 22px;"><a href="${escapeHtml(actionUrl)}" style="display:inline-block;padding:14px 22px;color:#ffffff;font-size:12px;font-weight:700;text-decoration:none;text-transform:uppercase;">${actionText}</a></td></tr></table>
<p style="margin:24px 0 0;color:#6b6b6b;font-size:13px;line-height:22px;">${customer ? "If you have any issues in the meantime, please get in touch with Tomasz by email at" : "For workshop enquiries, contact"} <a href="mailto:${contactEmail}" style="color:#000000;text-decoration:underline;">${contactEmail}</a>${customer ? ` or on <a href="https://wa.me/${CONTACT.whatsapp.replace(/\D/g, "")}" style="color:#000000;text-decoration:underline;">WhatsApp: ${escapeHtml(CONTACT.whatsapp)}</a>` : ""}.</p>
</td></tr>
<tr><td bgcolor="#000000" style="padding:28px 24px;color:#ffffff;">
<p style="margin:0 0 12px;font-size:18px;font-weight:700;text-transform:uppercase;">Rent a Ramp</p>
<p style="margin:0 0 12px;color:#a3a3a3;font-size:13px;line-height:22px;">You do the work. We provide the workshop.<br>${escapeHtml(CONTACT.addressLines.join(", "))}</p>
<p style="margin:0;font-size:13px;line-height:22px;"><a href="mailto:${contactEmail}" style="color:#ffffff;">${contactEmail}</a><br><a href="https://wa.me/${CONTACT.whatsapp.replace(/\D/g, "")}" style="color:#ffffff;">WhatsApp: ${escapeHtml(CONTACT.whatsapp)}</a></p>
</td></tr>
</table></td></tr></table></body></html>`;
}
