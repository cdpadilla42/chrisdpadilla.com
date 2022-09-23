import Alert from '../components/alert';
import Footer from '../components/footer';
import Meta from '../components/meta';

export default function Layout({ preview, children, noFooter, customOGImage }) {
  return (
    <>
      <Meta customOGImage={customOGImage} />
      <main>{children}</main>
      {!noFooter && <Footer />}
    </>
  );
}
