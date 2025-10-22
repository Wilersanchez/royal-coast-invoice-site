
import Container from '@/components/Container';


const Footer = () => {
  return (
    <footer className="mt-12 mb-8">
      <Container className="flex justify-between gap-4 text-sm text-gray-500">
        <p>
          Royal Coast Services Inc. &copy; {new Date().getFullYear()}
        </p>
        <p>
          Created by Wiler Sanchez
        </p>
      </Container>
    </footer>
  );
};

export default Footer;