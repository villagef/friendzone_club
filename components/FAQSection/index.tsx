import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqSection } from "@/config/home";
import { Separator } from "../ui/separator";

export default function FAQSection() {
  return (
    <div className="container flex max-w-screen-2xl flex-col items-center justify-center">
      <h1 className="mb-6 text-4xl font-bold text-white lg:text-5xl">
        {faqSection.title}
      </h1>
      <Accordion
        type="single"
        collapsible
        className="w-full px-4 text-white md:px-24"
      >
        {faqSection.items.map(item => (
          <AccordionItem key={item.title} value={item.title}>
            <AccordionTrigger>{item.title}</AccordionTrigger>
            <AccordionContent>{item.description}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      <Separator className="mt-20" />
    </div>
  );
}
