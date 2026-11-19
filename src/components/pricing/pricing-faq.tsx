import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqConfig } from "@/config/faq";
import { siteConfig } from "@/config/site";
import { getServerT } from "@/i18n/server";

export async function PricingFaq() {
  const { t } = await getServerT();
  // FAQ answers in faq.ts stay in English; they are translated here
  // by item id so the config never needs to change.
  const faqById: Record<string, { q: string; a: string }> = {
    "item-1": { q: t("faq.q1"), a: t("faq.a1") },
    "item-2": { q: t("faq.q2"), a: t("faq.a2") },
    "item-3": { q: t("faq.q3"), a: t("faq.a3") },
    "item-4": {
      q: t("faq.q4"),
      a: t("faq.a4", { url: siteConfig.url, name: siteConfig.name }),
    },
  };
  return (
    <Accordion type="single" collapsible className="w-full">
      {faqConfig.items.map((faqItem) => (
        <AccordionItem key={faqItem.id} value={faqItem.id}>
          <AccordionTrigger className="text-base">
            <div className="text-left w-full">
              {faqById[faqItem.id]?.q ?? faqItem.question}
            </div>
          </AccordionTrigger>
          <AccordionContent className="text-base text-muted-foreground whitespace-pre-wrap">
            {/* {faqItem.answer} */}
            {/* biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation> */}
            <div
              dangerouslySetInnerHTML={{
                __html: faqById[faqItem.id]?.a ?? faqItem.answer,
              }}
            />
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
