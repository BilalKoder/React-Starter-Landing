import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header
      id="header"
      class="position-absolute w-100 header-jumbotron color-fg"
      style={{ zIndex: 9 }}
    >
      <nav class="nav" data-url="/home/">
        <div class="container">
          <div class="nav-row row align-items-start align-items-sm-center">
            <div class="col-6 col-sm nav-symbol-wrap">
              <Link href="/" class="nav-symbol">
                {/* <!-- contact comms-team@openai.com for official logo asset; below is hinted version --> */}
                <img
                  src="https://i.ibb.co/4SbKQdh/imageedit-21-6725720690.png"
                  type="image/png"
                />
              </Link>
            </div>
            <div class="col-6 col-sm-auto small-caps">
              <ul class="d-flex d-sm-flex flex-row align-items-center justify-content-between mt-0">
                <li class="ml-sm-1.5 ml-md-1.75" style={{ marginTop: "0.5px" }}>
                  <Link class="nav-link " to="/api" data-slug="api">
                    API
                  </Link>
                </li>

                <li class="ml-sm-1.5 ml-md-1.75" style={{ marginTop: "0.5px" }}>
                  <a class="nav-link " href="/blog/" data-slug="blog">
                    Blog
                  </a>
                </li>
                <li class="ml-sm-1.5 ml-md-1.75" style={{ marginTop: "0.5px" }}>
                  <a class="nav-link " href="/about/" data-slug="about">
                    About
                  </a>
                </li>
              </ul>
              {/* <ul class="d-sm-none" style="margin-top:-1px">
                <li class="mb-0.25" style="margin-top:0.5px">
                  <a class="nav-link " href="/api/" data-slug="api">
                    API
                  </a>
                </li>

                <li class="mb-0.25" style="margin-top:0.5px">
                  <a class="nav-link " href="/research/" data-slug="research">
                    Research
                  </a>
                </li>

                <li class="mb-0.25" style="margin-top:0.5px">
                  <a class="nav-link " href="/blog/" data-slug="blog">
                    Blog
                  </a>
                </li>

                <li class="mb-0.25" style="margin-top:0.5px">
                  <a class="nav-link " href="/about/" data-slug="about">
                    About
                  </a>
                </li>
              </ul> */}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
