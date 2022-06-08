import Alert from '../components/alert';
import Footer from '../components/footer';
import Meta from '../components/meta';

export default function Layout({ preview, children, noFooter }) {
  return (
    <>
      <Meta />
      <main>{children}</main>
      {!noFooter && <Footer />}
    </>
  );
}
