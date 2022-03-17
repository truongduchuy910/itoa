import { useToast } from '@chakra-ui/react';
import { makeVar } from '@apollo/client';
import { useEffect } from 'react';

export const onToast = makeVar(() => {});
function Simple() {
  const toast = useToast();
  useEffect(() => {
    onToast(content =>
      toast({
        render: () => {
          return (
            <div
              style={{
                backgroundColor: `rgba(0,0,0,0.8)`,
                padding: 13,
                color: `#fff`,
                borderRadius: 5,
                textAlign: 'center',
              }}
            >
              {content}
            </div>
          );
        },
      })
    );
  });

  return <div />;
}
export default Simple;
