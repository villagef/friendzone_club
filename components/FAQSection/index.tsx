import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { faqSection } from "@/config/home"

export default function FAQSection() {
  return (
    <div className="container flex max-w-screen-2xl flex-col items-center justify-center px-6">
      <h1 className="mb-6 text-4xl font-bold text-primary lg:text-5xl">
        {faqSection.title}
      </h1>
      <Accordion
        type="single"
        collapsible
        className="w-full text-primary sm:px-4 md:px-24">
        {faqSection.items.map(item => (
          <AccordionItem key={item.title} value={item.title}>
            <AccordionTrigger>{item.title}</AccordionTrigger>
            <AccordionContent>{item.description}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}
