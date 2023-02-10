import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer
      className="footer container medium-xsmall-copy line-height-1.6"
      style={{ backgroundColor: "black" }}
    >
      <Link to="/" className="nav-symbol">
        {/* <!-- contact comms-team@openai.com for official logo asset; below is hinted version --> */}
        <img
          src="https://i.ibb.co/4SbKQdh/imageedit-21-6725720690.png"
          type="image/png"
        />
      </Link>
      <div className="row mb-1">
        <div className="col-6 col-lg">
          <ul className="mb-2">
            <div className="small-caps mb-1/3">Featured</div>
          </ul>
        </div>

        <div className="col-6 col-lg">
          <ul className="mb-2" style={{ color: "#fff", textAlign: "left" }}>
            <li>
              <div className="small-caps mb-1/3">API</div>
            </li>

            <li>
              <a className="fade" href="api/index.html">
                Overview
              </a>
            </li>

            <li>
              <Link className="fade" to="/pricing/">
                Pricing
              </Link>
            </li>

            {/* <!--<li><a className="fade" href="/api/examples/">Examples</a></li>--!> */}

            <li>
              <a className="fade" href="/api/docs/">
                Docs
              </a>
            </li>

            <li>
              <a className="fade" href="/api/policies/">
                Terms & Policies
              </a>
            </li>

            <li>
              <a className="fade" href="https://status.openai.com/">
                Status
              </a>
            </li>

            <li>
              <Link className="fade" to="/sigin/">
                Log in
              </Link>
            </li>
          </ul>
        </div>

        <div className="col-6 col-lg">
          <ul className="mb-2" style={{ color: "#fff", textAlign: "left" }}>
            <li>
              <div className="small-caps mb-1/3">Blog</div>
            </li>

            <li>
              <a className="fade" href="/blog/">
                Index
              </a>
            </li>

            {/* <!--<li><a className="fade" href="/blog/tags/research/">Research</a></li>--!>

<!--<li><a className="fade" href="/blog/tags/announcements/">Announcements</a></li>--!>

<!--<li><a className="fade" href="/blog/tags/events/">Events</a></li>--!>

<!--<li><a className="fade" href="/blog/tags/milestones/">Milestones</a></li>--!> */}
          </ul>
        </div>

        <div className="col-6 col-lg">
          <ul className="mb-2" style={{ color: "#fff", textAlign: "left" }}>
            <li>
              <div className="small-caps mb-1/3">Information</div>
            </li>

            <li>
              <a className="fade" href="/about/">
                About Us
              </a>
            </li>

            {/* <!--<li><a className="fade" href="/charter/">Our Charter</a></li>--!>

<!--<li><a className="fade" href="/research/">Our Research</a></li>--!>

<!--<li><a className="fade" href="/publications/">Publications</a></li>--!>

<!--<li><a className="fade" href="/newsroom/">Newsroom</a></li>--!>

<!--<li><a className="fade" href="/careers/">Careers</a></li>--!> */}
          </ul>
        </div>
      </div>
      <div className="row align-items-start" style={{ color: "#fff" }}>
        <div className="col-12 col-md mb-0.5" style={{ textAlign: "left" }}>
          <a className="fade" style={{ marginTop: "1px" }} href="/">
            Bloomai &copy; 2022–2023
          </a>
          &emsp;
          <a className="fade" style={{ marginTop: "1px" }} href="/privacy/">
            Privacy&nbsp;Policy
          </a>
          &emsp;
          <a className="fade" style={{ marginTop: "1px" }} href="/terms/">
            Terms&nbsp;of&nbsp;Use
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
