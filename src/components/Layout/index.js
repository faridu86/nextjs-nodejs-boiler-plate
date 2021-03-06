import Head from 'next/head';
import Link from 'next/link';

import '../../styles/layout.scss';
import styles from './Layout.scss';

const Layout = (props) => {
  const { children } = props;
  return (
    <div>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" key="viewport" />
      </Head>
      <ul className={styles.nav_container}>
        <li>
          <a href="/" title="Home">Home</a>
        </li>
        <li>
          <Link href="/about">
            <a>About</a>
          </Link>
        </li>
      </ul>
      <section className="page_container">
        {children}
      </section>
    </div>
  );
};

export default Layout;
