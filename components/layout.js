import Alert from '../components/alert';
import Footer from '../components/footer';
import Meta from '../components/meta';

export default function Layout({ children, noFooter, customOGImage, title }) {
  return (
    <>
      <Meta customOGImage={customOGImage} title={title} />
      <main>{children}</main>
      {!noFooter && <Footer />}
    </>
  );
}
