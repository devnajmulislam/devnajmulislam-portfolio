import { site } from "@/data/site";

const WHATSAPP_DIGITS = (site.whatsapp ?? site.phone).replace(/\D/g, "");

export const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
  site.email,
)}`;

export const whatsappChatUrl = `https://wa.me/${WHATSAPP_DIGITS}?text=${encodeURIComponent(
  "Hi Najmul, I found your portfolio and wanted to reach out.",
)}`;

export const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  site.location,
)}`;
