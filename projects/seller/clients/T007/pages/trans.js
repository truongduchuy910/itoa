export default function Trans({ locale }) {
  return locale;
}
export async function getServerSideProps(context) {
  const { locale } = context;

  return {
    props: { locale },
  };
}
