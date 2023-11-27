import { DictionaryType } from "@/lib/types"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

interface FAQSectionProps {
  content: DictionaryType["page"]["home"]["faq"]
}

export default function FAQSection({ content }: FAQSectionProps) {
  return (
    <div className="container flex max-w-screen-2xl flex-col items-center justify-center px-6">
      <h1 className="mb-6 text-4xl font-bold text-primary lg:text-5xl">
        {content.title}
      </h1>
      <Accordion
        type="single"
        collapsible
        className="w-full text-primary sm:px-4 md:px-24"
      >
        {content.questions.map(({ question, answer }) => (
          <AccordionItem key={question} value={question}>
            <AccordionTrigger>{question}</AccordionTrigger>
            <AccordionContent>{answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}
