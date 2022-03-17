import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
} from '@chakra-ui/accordion';
import { Box } from '@chakra-ui/layout';

const Simple = ({ allFAQS }) => {
  return (
    <Accordion allowToggle>
      {allFAQS?.map(FAQ => {
        return (
          <AccordionItem key={FAQ.id}>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  {FAQ.title}
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <Box dangerouslySetInnerHTML={{ __html: FAQ.body }} />
            </AccordionPanel>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
};
export default Simple;
