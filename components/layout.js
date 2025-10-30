import Alert from '../components/alert';
import Footer from '../components/footer';
import Meta from '../components/meta';
import SearchModal from '../components/SearchModal';
import { useSearch } from '../lib/SearchContext';

export default function Layout({ children, noFooter, customOGImage, title }) {
  const { searchModalOpen, closeSearch } = useSearch();

  return (
    <>
      <Meta customOGImage={customOGImage} title={title} />
      <main>{children}</main>
      {!noFooter && <Footer />}
      <SearchModal isOpen={searchModalOpen} onClose={closeSearch} />
    </>
  );
}
