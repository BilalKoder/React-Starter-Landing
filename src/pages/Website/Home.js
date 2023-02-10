import React from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";

const Home = () => {
  return (
    <div style={{ backgroundColor: "black" }}>
      <Header />
      <section
        className="jumbotron color-fg bg-bg d-flex align-items-end overflow-hidden"
        id="recruitment-video"
      >
        <div
          id="recruiting-cover"
          className="position-absolute d-flex overflow-hidden trbl-center"
          style={{
            opacity: "0.54",
            height: "100%",
            width: "100vw",
            paddingTop: "56.25%",
          }}
        >
          <iframe
            id="recruiting-video-cover"
            className="transition-opacity"
            // src="https://player.vimeo.com/video/333809672?h=f851b0f2b2&amp;autopause=0&amp;autoplay=1&amp;background=1&amp;loop=1&amp;muted=1&amp;playsinline=1&amp;transparent=1&amp;texttrack=false"
            src="https://player.vimeo.com/video/333809672?h=f851b0f2b2&autopause=0&autoplay=1&background=1&loop=1&muted=1&playsinline=1&transparent=1&texttrack=false"
            width="100%"
            height="100%"
            frameBorder="0"
            allow="autoplay"
            allowFullScreen
            style={{ position: "absolute", top: "0", left: "0" }}
            title="Bloomai A large language model like non other"
          />
        </div>

        <div className="container" style={{ zIndex: 0 }}>
          <div className="max-width-xnarrow pt-8 pb-2.25">
            <h1 className="mb-1">
              Bloomai A large language model like non other.
            </h1>
          </div>
        </div>
      </section>

      <div className="video-modal js-video-modal d-flex align-items-center justify-content-center">
        <div className="video-modal-body container">
          <div className="video-modal-body-inner mx-auto">
            <div className="video-modal-video">
              <div className="no-fluidvids">
                <iframe
                  id="recruiting-video"
                  src="https://player.vimeo.com/video/777147453?h=d4f76f0bd7&amp;autopause=0&amp;transparent=1"
                  width="640"
                  height="360"
                  frameborder="0"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowfullscreen=""
                  title="Bloomai A large language model like non other"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
