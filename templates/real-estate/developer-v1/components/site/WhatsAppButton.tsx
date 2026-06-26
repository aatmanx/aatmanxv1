import { MessageCircle } from "lucide-react";
import { siteContent } from "../../constants/siteContent";

export function WhatsAppButton() {
  const number = siteContent.contact.whatsapp.replace(/[^0-9]/g, "");
  const text = encodeURIComponent(
    `Hi ${siteContent.businessName}, I'd like more information about your projects.`,
  );
  return (
    <a
      href={`https://wa.me/${number}?text=${text}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[oklch(0.7_0.18_150)] text-white shadow-[var(--shadow-elegant)] transition-transform hover:scale-105"
    >
      <MessageCircle className="h-7 w-7" />
    </a>
  );
}
