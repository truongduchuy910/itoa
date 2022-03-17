export default function TestimonialListUI({
  loading,
  error,
  allTestimonials,
  refetch,
}) {
  return (
    <pre>
      Incomplete component.
      <button
        onClick={(e) => {
          // goi lai du lieu
          refetch();
        }}
      >
        refetch
      </button>
    </pre>
  );
}
