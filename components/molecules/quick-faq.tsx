import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

const faqItems = [
  {
    id: "item-1",
    question: "كيفية الإشتراك في المنصة؟",
    answer:
      "أدعمك لتزدادي وعيا وتمكنا وثقة وقدرة لخوض الرحلة بكامل صحتك وعافيتك كإمرأة وأم أدعمك لتزدادي وعيا وتمكنا وثقة وقدرة لخوض الرحلة بكامل صحتك وعافيتك كإمرأة وأم أدعمك لتزدادي وعيا وتمكنا أدعمك لتزدادي وعيا وتمكنا وثقة وقدرة لخوض الرحلة بكامل صحتك وعافيتك كإمرأة وأم أدعمك لتزدادي وعيا وتمكنا وثقة وقدرة لخوض الرحلة بكامل صحتك وعافيتك كإمرأة وأم أدعمك لتزدادي وعيا وتمكنا",
  },
  {
    id: "item-2",
    question: "كيفية الإشتراك في المنصة؟",
    answer:
      "أدعمك لتزدادي وعيا وتمكنا وثقة وقدرة لخوض الرحلة بكامل صحتك وعافيتك كإمرأة وأم",
  },
  {
    id: "item-3",
    question: "كيفية الإشتراك في المنصة؟",
    answer:
      "أدعمك لتزدادي وعيا وتمكنا وثقة وقدرة لخوض الرحلة بكامل صحتك وعافيتك كإمرأة وأم",
  },
  {
    id: "item-4",
    question: "كيفية الإشتراك في المنصة؟",
    answer:
      "أدعمك لتزدادي وعيا وتمكنا وثقة وقدرة لخوض الرحلة بكامل صحتك وعافيتك كإمرأة وأم",
  },
];

export default function QuickFaq() {
  return (
    <Accordion type="single" collapsible className="w-full space-y-3">
      {faqItems.map((item) => (
        <AccordionItem key={item.id} value={item.id}>
          <AccordionTrigger>{item.question}</AccordionTrigger>
          <AccordionContent>{item.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
