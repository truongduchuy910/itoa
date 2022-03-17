import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
} from "@chakra-ui/react";

export default function FAQListUI({ allFAQS = [], _allFAQSMeta, clickMore }) {
  const all = allFAQS?.slice().sort((a, b) => {
    return a.prioritize > b.prioritize ? 1 : -1;
  });
  return (
    <Accordion allowToggle>
      {all.map((FAQ) => {
        return <Item id={FAQ.id} FAQ={FAQ} />;
      })}
    </Accordion>
  );
}
function Item({ FAQ }) {
  const { id, title, body, prioritize } = FAQ;
  return (
    <AccordionItem>
      <h2>
        <AccordionButton>
          <Box flex="1" textAlign="left">
            {title}
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>{body}</AccordionPanel>
    </AccordionItem>
  );
}
