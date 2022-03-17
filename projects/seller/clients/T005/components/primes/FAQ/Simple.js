import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
} from "@chakra-ui/accordion";
import { Box } from "@chakra-ui/layout";
import Field from "../../Field";

const Simple = ({ allFAQS }) => {
  return (
    <Accordion allowToggle>
      {allFAQS?.map((FAQ) => {
        return (
          <AccordionItem key={FAQ.id}>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  <Field>{FAQ.title}</Field>
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <Field>{FAQ.body}</Field>
            </AccordionPanel>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
};
export default Simple;
