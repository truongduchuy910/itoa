import './App.css';
import { ApolloProvider } from '@apollo/client';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import Title from './Title';
import Post from './Post';
import Img from './Img';
import Download from './Download';
import Prices from './Prices';
import { FacebookProvider, Page, CustomChat } from 'react-facebook';

function App({ Component, pageProps, host }) {
  const client = new ApolloClient({
    uri: 'https://seller.itoa.vn/admin/api',
    cache: new InMemoryCache(),
  });
  return (
    <ApolloProvider client={client}>
      <FacebookProvider appId="145518257438217">
        <CustomChat pageId="108418741306883" minimized={true} />
        <img
          id="home"
          className="bg"
          src="/assets/img/1201.jpg?h=de65ea04a90d05ae27704aea9b88c2e5"
          alt="background"
        />
        <div id="how"></div>
        {/* Start: Navigation with Search */}
        <nav className="navbar navbar-light navbar-expand-md sticky-top shadow navigation-clean-search">
          <div className="container-fluid">
            <a className="navbar-brand" href="/">
              <img
                className="logo"
                src="/assets/img/kim-tu-thap.jpg?h=16729fdfa91e6bfa1424d93039e6c64b"
                alt="logo"
              />
            </a>
            <button data-bs-toggle="collapse" className="navbar-toggler" data-bs-target="#navcol-1">
              <span className="visually-hidden">Toggle navigation</span>
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navcol-1">
              <form className="me-auto search-form" target="_self" />
              <ul className="navbar-nav">
                <li className="nav-item">
                  <a className="nav-link" href="#how">
                    How it works
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#buy">
                    Buy
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#contact">
                    Contact
                  </a>
                </li>
              </ul>
              <Download
                className="btn btn-light action-button file-upload"
                id="6043d3729b86b3040e0839ff"
              />
            </div>
          </div>
        </nav>
        {/* End: Navigation with Search */}
        <header>
          <div
            className="banner"
            style={{
              background: `url("/assets/img/v2-1dd01f260f09191248604b7df51f94df_1440w.jpg?h=8e30e224227fa910826d6fc7b6984cad")
      center / cover no-repeat`,
              textAlign: 'center',
            }}
          >
            <img
              data-aos="fade-up"
              className="currency"
              src="/assets/img/eurusd.png?h=49d167f9217f58d61e337ce08b82f54d"
              alt="currency"
            />
          </div>
        </header>
        <main>
          <section className="pb-0" id="buy">
            <div className="container d-flex justify-content-center align-items-center video-box">
              <Post className="video" id="6043c6529b86b3040e0839f9" />
            </div>
          </section>
          <section>
            <Prices />
          </section>
          <section>
            <div className="container text-center py-4">
              <h2 className="text-center mb-5 content">
                <Title id="6043c5c49b86b3040e0839f6" />
              </h2>
              <Post className="text-center" id="6043c5c49b86b3040e0839f6" />

              <Img className="image" id="6043c5c49b86b3040e0839f6" alt="banner" />
            </div>
          </section>
          <section className="trans" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
            <div className="container d-flex justify-content-center align-items-center py-4">
              <h2 className="text-center text-light content">
                <Title id="6043c60f9b86b3040e0839f7" />
                <br />
              </h2>
            </div>
          </section>
          <section>
            <div className="container py-4">
              <div className="content">
                <h4 className="text-center content">
                  <Title id="6043c6259b86b3040e0839f8" />
                </h4>
              </div>
              <div className="row">
                <div className="col-12 col-sm-5 col-lg-5 col-xl-5 col-xxl-6 d-flex justify-content-center align-items-center align-items-sm-start p-5">
                  <Img className="img-fluid image" id="6043c6259b86b3040e0839f8" />
                </div>
                <div className="col d-flex justify-content-center">
                  <Post
                    className="d-flex justify-content-center align-items-center content"
                    id="6043c6259b86b3040e0839f8"
                  />
                </div>
              </div>
            </div>
          </section>
        </main>
        {/* Start: Footer Dark */}
        <footer className="footer-dark">
          <div className="container">
            <div className="row">
              {/* Start: Footer Text */}
              <div className="col-md-6 col-lg-4 item text">
                <h3>
                  <Title id="6043cb729b86b3040e0839fa" />
                </h3>
                <Post className="content" id="6043cb729b86b3040e0839fa" />
              </div>
              {/* End: Footer Text */}
              {/* Start: Footer Text */}
              <div className="col-md-6 col-lg-4 item text">
                <h3>
                  <Title id="6043cb9f9b86b3040e0839fb" />
                </h3>
                <Post className="content" id="6043cb9f9b86b3040e0839fb" />
              </div>
              {/* End: Footer Text */}
              <div className="col-lg-4">
                <Page href="https://www.facebook.com/eurusdea" tabs="timeline" />

                {/* <div
                className="fb-page"
                data-href="https://www.facebook.com/eurusdea"
                data-tabs="timeline"
                data-width
                data-height="300px"
                data-small-header="false"
                data-adapt-container-width="true"
                data-hide-cover="false"
                data-show-facepile="true"
              >
                <blockquote
                  cite="https://www.facebook.com/eurusdea"
                  className="fb-xfbml-parse-ignore"
                >
                  <a href="https://www.facebook.com/eurusdea">Miner EA</a>
                </blockquote>
              </div> */}
              </div>
            </div>
            {/* Start: Copyright */}
            <p className="copyright" id="contact">
              miner-ea.com © 2021
            </p>
            {/* End: Copyright */}
          </div>
        </footer>
      </FacebookProvider>
    </ApolloProvider>
  );
}

export default App;
