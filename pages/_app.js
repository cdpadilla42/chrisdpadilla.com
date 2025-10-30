import '../styles/index.css';
import '../styles/prism.css';
// import "highlight.js/styles/nord.min.css";
import "highlight.js/styles/atom-one-dark.min.css";
import { SearchProvider } from '../lib/SearchContext';

export default function MyApp({ Component, pageProps }) {
  return (
    <SearchProvider>
      <Component {...pageProps} />
    </SearchProvider>
  );
}
