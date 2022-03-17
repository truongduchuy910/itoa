import { useToast } from '@chakra-ui/react';
const Success = ({ value }) => {
  const toast = useToast();
  toast({
    status: 'success',
    description: value,
    render: () => (
      <div
        style={{
          backgroundColor: `rgba(0,0,0,0.8)`,
          padding: 13,
          color: `#fff`,
          borderRadius: 5,
          textAlign: 'center',
        }}
      >
        🎉 {value}
      </div>
    ),
  });
  return <div />;
};
export default Success;
