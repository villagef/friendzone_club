import { useTranslations } from "next-intl"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function FAQSection() {
  const questionKeys = ["question1", "question2", "question3", "question4"]
  const t = useTranslations("page.home.faq")

  return (
    <div className="container flex max-w-screen-2xl flex-col items-center justify-center px-6">
      <h1 className="mb-6 text-4xl font-bold text-primary lg:text-5xl">
        {t("title")}
      </h1>
      <Accordion
        type="single"
        collapsible
        className="w-full text-primary sm:px-4 md:px-24"
      >
        {questionKeys.map((question) => (
          <AccordionItem key={question} value={question}>
            <AccordionTrigger>{t(`${question}.question`)}</AccordionTrigger>
            <AccordionContent>{t(`${question}.answer`)}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}
