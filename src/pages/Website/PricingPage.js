import React from "react";
import { Link } from "react-router-dom";
import "./website.css";

const PricingPage = () => {
  function initTabs(tabsElt, contentElt) {
    // Select some elements
    var tabElts = tabsElt.querySelectorAll(".centering-tabs__tab");
    var contentElts = contentElt.querySelectorAll(
      ".centering-tabs__content__item"
    );
    // For each tab and content container ...
    for (var i = 0; i < tabElts.length; i++) {
      var currentTab = tabElts[i];
      var currentContent = contentElts[i];
      // Add a data-index attribute
      currentTab.setAttribute("data-index", i);
      currentContent.setAttribute("data-index", i);
      // If it is the first tab ...
      if (i === 0) {
        // Add isActive classes
        currentTab.classList.add("centering-tabs__tab--isActive");
        currentContent.classList.add("centering-tabs__content__item--isActive");
      }
      // Add a click handler to tabs
      currentTab.addEventListener("click", handleSelect);
    }

    function handleSelect(e) {
      var tabElt = e.target;
      var indexAsStr = tabElt.getAttribute("data-index");
      var isActive = !!tabElt.classList.contains(
        "centering-tabs__tab--isActive"
      );
      // If selected tab is active ...
      if (!isActive) {
        // For each tab and content container ...
        for (var i = 0; i < tabElts.length; i++) {
          var currentTabElt = tabElts[i];
          var currentTabContentElt = contentElts[i];
          // Deactivate all of them except for the one user just selected
          if (currentTabElt.getAttribute("data-index") !== indexAsStr) {
            currentTabElt.classList.remove("centering-tabs__tab--isActive");
            currentTabContentElt.classList.remove(
              "centering-tabs__content__item--isActive"
            );
          } else {
            // Activate selected tab
            currentTabElt.classList.add("centering-tabs__tab--isActive");
            currentTabContentElt.classList.add(
              "centering-tabs__content__item--isActive"
            );
            var isCodexElt = [
              "text-to-sql",
              "text-to-api",
              "code-continuation",
            ].includes(currentTabContentElt.id);
            // We (conditionally) are about to change this, and we need this orig value as a reference
            // var currentTabContentEltHeightProp = currentTabContentElt.style.height;
            // If it is a Codex code example ...
            if (isCodexElt) {
              // Hide the response
              var spans = getCodexResponse(currentTabContentElt.id);
              if (spans) {
                forEach(function (current) {
                  current.classList.add("typing");
                }, spans);
                // Fix the box height
                var rectHeight =
                  currentTabContentElt.getBoundingClientRect().height;
                currentTabContentElt.style.height = rectHeight + "px";
              }
            }
            var typingElts = currentTabContentElt.querySelectorAll(".typing");
            // If there are .typing elements ...
            if (typingElts && typingElts.length) {
              // Make them all invisible
              forEach(function (current) {
                current.classList.add("invisible");
              }, typingElts);
              // After 500ms...
              setTimeout(function () {
                // Type them in sequential order (not at the same time)
                sequence(function (current) {
                  current.classList.remove("invisible");
                  return typing(current, 6);
                }, typingElts).then(function () {
                  // All done typing. Restore the box height to what it was
                  // currentTabContentElt.style.height = currentTabContentEltHeightProp;
                  // We don't actually need to do this, because as soon as you enter the setTimeout callback, the height is empty. Shrug
                });
              }, 250);
            }
            // Shift the tab row so the selected one is centered.
            var tabsLeft = tabsElt.getBoundingClientRect().x;
            var tabsWidth = tabsElt.offsetWidth;
            var tabsCenter = tabsLeft + tabsWidth / 2;
            var tabLeft = tabElt.getBoundingClientRect().x;
            var tabWidth = tabElt.offsetWidth;
            var tabCenter = tabLeft + tabWidth / 2;
            var translateDelta = (tabCenter - tabsCenter) * -1;
            var tabsInnerElt = tabsElt.querySelector(".centering-tabs__inner");
            var currentTranslateVal = getTranslateX(tabsInnerElt);
            var nextTranslateVal = currentTranslateVal + translateDelta;
            var minTransformVal = (tabsInnerElt.scrollWidth - tabsWidth) * -1;
            if (nextTranslateVal > 0) {
              tabsInnerElt.style.transform = "translateX(0)";
            } else if (nextTranslateVal < minTransformVal) {
              tabsInnerElt.style.transform =
                "translateX(" + minTransformVal + "px)";
            } else {
              tabsInnerElt.style.transform =
                "translateX(" + nextTranslateVal + "px)";
            }
          }
        }
      }
    }

    function getTranslateX(elt) {
      var style = window.getComputedStyle(elt);
      var matrix = new DOMMatrix(style.transform);
      return matrix.m41;
    }
  }

  function initAllTabs() {
    var tabRows = document.querySelectorAll(".centering-tabs");
    var tabContentWrappers = document.querySelectorAll(
      ".centering-tabs__content"
    );
    for (var i = 0; i < tabRows.length; i++) {
      initTabs(tabRows[i], tabContentWrappers[i]);
    }
  }

  function typing(elt, speed) {
    return new Promise(function (resolve) {
      var text = elt.innerHTML.replace(/ < br > /g, "\n").split("");
      var heightProp = elt.style.height;
      var rectHeight = elt.getBoundingClientRect().height;
      elt.style.height = rectHeight + "px";
      elt.innerHTML = "";

      function addChar() {
        var char = text.shift();
        if (char === "\n") {
          char = " < br > ";
        }
        elt.innerHTML = elt.innerHTML + char;
        if (text.length) {
          setTimeout(function () {
            addChar();
          }, speed);
        } else {
          elt.style.height = heightProp;
          resolve();
        }
      }
      addChar();
    });
  }
  // We need to animate the part of the code example that is the Codex's response
  // This function gets those parts in a list
  function getCodexResponse(id) {
    var container = document.getElementById(id);
    switch (id) {
      case "text-to-sql":
        return container.querySelectorAll(
          "span.string:not(.triple-quoted-string)"
        );
      case "text-to-api":
        return container.querySelectorAll("span:not(.triple-quoted-string)");
      case "code-continuation":
        return container.querySelectorAll("span:not(.triple-quoted-string)");
    }
  }

  function initExpandableCodeBlocks() {
    function initExpandableCodeBlock(elt) {
      var toggleBtnElt = elt.querySelector(".code-block--expandable__toggle");
      toggleBtnElt.addEventListener("click", function () {
        var isExpanding = !elt.classList.contains(
          "code-block--expandable--expanded"
        );
        elt.classList.toggle("code-block--expandable--expanded");
        if (isExpanding) {
          // Get inner divs
          var divs = elt.querySelectorAll("div");
          // Make them all invisible
          forEach(function (current) {
            current.classList.add("invisible");
          }, divs);
          setTimeout(function () {
            // Show them in sequential order (not at the same time)
            sequence(function (current) {
              return new Promise(function (resolve) {
                setTimeout(function () {
                  current.classList.remove("invisible");
                  resolve();
                }, 50);
              });
            }, divs);
          }, 250);
        }
      });
    }
    setTimeout(function () {
      forEachElt(".code-block--expandable", initExpandableCodeBlock);
    }, 0);
  }
  // For the code examples on the API page and Microsoft for Startups page, wrap text nodes with spans
  function initAPIPageCodeExamples() {
    var isAPIPage =
      !!document.querySelector(".page-api") ||
      !!document.querySelector(".page-microsoft-for-startups");
    if (!isAPIPage) return;
    var codeElts = document.querySelectorAll("code");
    forEach(function (codeElt) {
      var textNodes = filterTextNodes(codeElt.childNodes);
      forEach(function (current) {
        wrapNodeWithElt(current, "span");
      }, textNodes);
    }, codeElts);
  }

  function initNavToggle() {
    var navToggleElt = document.querySelector(".api-secondary-nav__toggle");
    var navContainerElt = document.querySelector(".api-secondary-nav");
    if (!navToggleElt || !navContainerElt) {
      return;
    }
    navToggleElt.addEventListener("click", function () {
      navContainerElt.classList.toggle("api-secondary-nav--open");
    });
  }
  // Utility
  // Iterate over lists (not just arrays)
  function forEach(callback, data) {
    for (var i = 0; i < data.length; i++) {
      var current = data[i];
      callback(current, i);
    }
  }
  // For each element that matches `selector` ...
  function forEachElt(selector, callback, parent) {
    var elts = (parent || document).querySelectorAll(selector);
    forEach(callback, elts);
  }
  // Wrap a node with an element
  function wrapNodeWithElt(node, tagName) {
    var elt = document.createElement(tagName);
    node.after(elt);
    elt.appendChild(node);
    return elt;
  }
  // Given a list, return a list of only Text nodes
  function filterTextNodes(data) {
    var textNodes = [];
    forEach(function (current) {
      if (current.nodeName === "#text") {
        textNodes.push(current);
      }
    }, data);
    return textNodes;
  }
  // Perform a function on each item in a list sequentially. The function must be a promise.
  // Also, this function returns a promise that resolves when the whole sequence is done
  function sequence(asyncFn, data) {
    return new Promise(function (resolve) {
      var promise = Promise.resolve();
      forEach(function (current) {
        promise = promise.then(function () {
          return asyncFn(current);
        });
      }, data);
      promise.then(resolve);
    });
  }
  document.addEventListener("DOMContentLoaded", function () {
    initExpandableCodeBlocks();
    initNavToggle();
    initAPIPageCodeExamples();
    initAllTabs();
  });

  return (
    <div>
      <header className="bg-white">
        <nav className="nav" data-url="/api/">
          <div className="container">
            <div className="nav-row row align-items-start align-items-sm-center">
              <div className="col-6 col-sm nav-symbol-wrap">
                <Link to="/" className="nav-symbol">
                  <img
                    src="https://i.ibb.co/p2sgBJB/imageedit-16-4009463339.png"
                    type="image/png"
                  />
                </Link>
              </div>
              <div className="col-6 col-sm-auto small-caps">
                <div
                  className="position-absolute"
                  style={{
                    right: "10px;",
                    top: "50%;",
                    transform: "translateY(-50%)",
                  }}
                >
                  <li className="d-inline-block mr-0.5">
                    <Link className="small-caps" to="/signin">
                      Log in
                    </Link>
                  </li>
                  <li className="d-inline-block">
                    <Link
                      className="btn btn-padded btn-dark btn-circle m-0"
                      to="/signup"
                    >
                      Sign up
                    </Link>
                  </li>
                </div>
                <ul className="d-none d-sm-flex flex-row align-items-center justify-content-between">
                  <li
                    className="ml-sm-1.5 ml-md-1.75"
                    style={{ marginTop: "0.5px" }}
                  >
                    <a
                      className="nav-link active"
                      href="/api/"
                      data-slug="api"
                    ></a>
                  </li>
                  <li
                    className="ml-sm-1.5 ml-md-1.75"
                    style={{ marginTop: "0.5px" }}
                  >
                    <a className="nav-link " href="/blog/" data-slug="blog"></a>
                  </li>
                  <li
                    className="ml-sm-1.5 ml-md-1.75"
                    style={{ marginTop: "0.5px" }}
                  >
                    <a
                      className="nav-link "
                      href="/about/"
                      data-slug="about"
                    ></a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </header>

      <div className="api-secondary-nav sticky bg-bg-70 backdrop-filter-blur d-none">
        <div className="container nav-row" style={{ margin: "0 auto" }}>
          <ul className="d-flex justify-content-lg-center position-relative">
            <div className="d-flex align-items-center d-md-none">
              <button
                className="api-secondary-nav__toggle position-relative my-n1/6"
                style={{ top: "0.125rem" }}
              >
                <svg
                  className="api-secondary-nav__toggle__open"
                  fill="none"
                  width="24"
                  viewBox="0 0 28 24"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                >
                  <clipPath id="a">
                    <path d="m0 0h28v24h-28z" />
                  </clipPath>
                  <g clip-path="url(#a)">
                    <path
                      d="m0 15.5h28m-28-7h28z"
                      stroke="rgba(var(--fg),1)"
                      stroke-width="2"
                    />
                  </g>
                </svg>
                <svg
                  className="api-secondary-nav__toggle__close position-absolute"
                  style={{ left: "0" }}
                  width="24"
                  viewBox="0 0 28 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1.40871 3L19 20.819M1 21L18.5913 3.181L1 21Z"
                    stroke="rgba(var(--fg),1)"
                    stroke-width="2"
                  />
                </svg>
              </button>
            </div>
          </ul>
        </div>
      </div>
      <section id="prices" className="pricess text-left no-math mb-4 pt-2">
        <h2 className="mb-1 container">Endpoints</h2>

        <div className="row mb-1.5 narrow-gutters container">
          <div className="col-12 col-md-3 mb-thin-gutter">
            <div className="bg-fg-5 aspect-md-4/3 aspect-xl-8/5 h-100 bg-cover">
              <div className="h-100 d-flex flex-column justify-content-between p-2/3 p-xl-0.75  pb-md-7/12">
                <div className="mb-0.125">
                  Call Bloom&ensp;
                  <div className="xsmall-copy d-inline-block d-md-block d-xl-inline-block color-fg-50"></div>
                </div>
                <div>
                  <span className="large-copy font-tnum">€0.1440</span>
                  <span
                    className="xsmall-copy d-md-block d-lg-inline-block color-fg-50"
                    style={{ color: "#000" }}
                  >
                    &nbsp;/&#8202;1 Call
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-3 mb-thin-gutter">
            <div className="bg-fg-5 aspect-md-4/3 aspect-xl-8/5 h-100 bg-cover">
              <div className="h-100 d-flex flex-column justify-content-between p-2/3 p-xl-0.75  pb-md-7/12">
                <div className="mb-0.125">Fine Tune&ensp;</div>
                <div>
                  <span className="large-copy font-tnum">€0.192</span>
                  <span
                    className="xsmall-copy d-md-block text-black d-lg-inline-block color-fg-50"
                    style={{ color: "#000" }}
                  >
                    &nbsp;/&#8202;1 Object
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-3 mb-thin-gutter">
            <div className="bg-fg-5 aspect-md-4/3 aspect-xl-8/5 h-100 bg-cover">
              <div className="h-100 d-flex flex-column justify-content-between p-2/3 p-xl-0.75  pb-md-7/12">
                <div className="mb-0.125">Tokenize&ensp;</div>
                <div>
                  <span className="large-copy font-tnum">€0.0600</span>
                  <span
                    className="xsmall-copy d-md-block d-lg-inline-block color-fg-50"
                    style={{ color: "#000" }}
                  >
                    &nbsp;/&#8202;1 Call
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-3 mb-thin-gutter">
            <div className="bg-fg-5 aspect-md-4/3 aspect-xl-8/5 h-100 bg-cover">
              <div className="h-100 d-flex flex-column justify-content-between p-2/3 p-xl-0.75  pb-md-7/12">
                <div className="mb-0.125">
                  Usage Tracking&ensp;
                  <div className="xsmall-copy d-inline-block d-md-block d-xl-inline-block color-fg-50"></div>
                </div>
                <div>
                  <span className="large-copy font-tnum">€0.4000</span>
                  <span
                    className="xsmall-copy d-md-block d-lg-inline-block color-fg-50"
                    style={{ color: "#000" }}
                  >
                    &nbsp;/&#820;1 Call
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="max-width-xnarrow"></div>
      </section>

      <section id="faq" className="bg-fg-3 pt-4 pb-4 mb-2">
        <div className="container mb-0.5">
          <div className="row">
            <div className="content">
              <h2 className="font-xlarge mb-1.5" id="faq-title">
                Frequently Asked Questions
              </h2>

              <div className="medium-xsmall-copy line-height-1.5 text-left">
                {/* <hr className="my-0"> */}
                <div className="accordion" id="faq-token">
                  <input
                    type="checkbox"
                    className="accordion-input"
                    id="faq-token-input"
                    onclick="setCustomHash('faq-token')"
                  />
                  <label for="faq-token-input" className="accordion-label">
                    <div className="accordion-label-inner position-relative">
                      <div className="pr-2/3 py-2/3 font-bold">
                        What's a token?
                      </div>
                    </div>
                  </label>
                  <div className="accordion-content">
                    <div className="mt-1/3 mb-1.5">
                      <p>
                        You can think of tokens as pieces of words used for
                        natural language processing. For English text, 1 token
                        is approximately 4 characters or 0.75 words. As a point
                        of reference, the collected works of Shakespeare are
                        about 900,000 words or 1.2M tokens.
                      </p>

                      <p>
                        Our Tokenize endpoint is designed to help you better
                        understand how our model reads and understands your text
                        as well as help you take full advantage of our model's
                        2000 tokens memory while avoiding failed requests
                        especially when training
                      </p>
                    </div>
                  </div>
                </div>

                {/* <hr className="my-0"> */}
                <div className="accordion" id="faq-which-model">
                  <input
                    type="checkbox"
                    className="accordion-input"
                    id="faq-which-model-input"
                    onclick="setCustomHash('faq-which-model')"
                  />
                  <label
                    for="faq-which-model-input"
                    className="accordion-label"
                  >
                    <div className="accordion-label-inner position-relative">
                      <div className="pr-2/3 py-2/3 font-bold">
                        What type of models does Bloom have?
                      </div>
                    </div>
                  </label>
                  <div className="accordion-content">
                    <div className="mt-1/3 mb-1.5">
                      <p>
                        Bloom large is our biggest and most capable model, at
                        176 Billion parameters, it's been trained on over 5
                        trillion words at a cost of over €32 million. Bloom
                        large is currently the only one available for training
                        as well as inference, but we're about to launch our
                        latest model "Bloom extended" at 500 Billion parameters.
                      </p>
                    </div>
                  </div>
                </div>

                {/* <hr className="my-0"> */}
                <div className="accordion" id="faq-token-usage">
                  <input
                    type="checkbox"
                    className="accordion-input"
                    id="faq-token-usage-input"
                    onclick="setCustomHash('faq-token-usage')"
                  />
                  <label
                    for="faq-token-usage-input"
                    className="accordion-label"
                  >
                    <div className="accordion-label-inner position-relative">
                      <div className="pr-2/3 py-2/3 font-bold">
                        How can I know my usage?
                      </div>
                    </div>
                  </label>
                  <div className="accordion-content">
                    <div className="mt-1/3 mb-1.5">
                      <p>
                        Log in to your account to view your usage, or use our
                        API to get more details on your usage, including usage
                        over time and per user.
                      </p>
                    </div>
                  </div>
                </div>

                {/* <hr className="my-0"> */}
                <div className="accordion" id="faq-spending">
                  <input
                    type="checkbox"
                    className="accordion-input"
                    id="faq-spending-input"
                    onclick="setCustomHash('faq-spending')"
                  />
                  <label for="faq-spending-input" className="accordion-label">
                    <div className="accordion-label-inner position-relative">
                      <div className="pr-2/3 py-2/3 font-bold">
                        How am I billed for my usage of Bloom API?
                      </div>
                    </div>
                  </label>
                  <div className="accordion-content">
                    <div className="mt-1/3 mb-1.5">
                      <p>
                        Bloom API is designed with large scale usage in mind
                        with a weekly billing cycle, invoices are sent on a
                        weekly basis to the email used to register for Bloom
                        API, with a 1 week grace period (The service will be
                        terminated 1 week after issuing the invoice if not
                        paid), currently we only support paymanet through PayPal
                        (including Credit Card).
                      </p>
                    </div>
                  </div>
                </div>

                {/* <hr className="my-0"> */}
                <div className="accordion" id="faq-playground-usage">
                  <input
                    type="checkbox"
                    className="accordion-input"
                    id="faq-playground-usage-input"
                    onclick="setCustomHash('faq-playground-usage')"
                  />
                  <label
                    for="faq-playground-usage-input"
                    className="accordion-label"
                  >
                    <div className="accordion-label-inner position-relative">
                      <div className="pr-2/3 py-2/3 font-bold">
                        Does test usage count?
                      </div>
                    </div>
                  </label>
                  <div className="accordion-content">
                    <div className="mt-1/3 mb-1.5">
                      <p>
                        Yes, we consider test usage the same as regular API
                        usage.
                      </p>
                    </div>
                  </div>
                </div>

                {/* <hr className="my-0"> */}
                <div className="accordion" id="faq-completions-pricing">
                  <input
                    type="checkbox"
                    className="accordion-input"
                    id="faq-completions-pricing-input"
                    onclick="setCustomHash('faq-completions-pricing')"
                  />
                  <label
                    for="faq-completions-pricing-input"
                    className="accordion-label"
                  >
                    <div className="accordion-label-inner position-relative">
                      <div className="pr-2/3 py-2/3 font-bold">
                        How can I change my API key?
                      </div>
                    </div>
                  </label>
                  <div className="accordion-content">
                    <div className="mt-1/3 mb-1.5">
                      <p>
                        You can only have a single active API key at any time,
                        and if you would like to revoke it or change it, you can
                        request a new API key from your profile but keep in mind
                        that all applications or users using the previous key
                        will no longer have access to Bloom API.
                      </p>
                    </div>
                  </div>
                </div>

                {/* <hr className="my-0"> */}
                <div className="accordion" id="faq-sla">
                  <input
                    type="checkbox"
                    className="accordion-input"
                    id="faq-sla-input"
                    onclick="setCustomHash('faq-sla')"
                  />
                  <label for="faq-sla-input" className="accordion-label">
                    <div className="accordion-label-inner position-relative">
                      <div className="pr-2/3 py-2/3 font-bold">
                        Is there an SLA on the various models?
                      </div>
                    </div>
                  </label>
                  <div className="accordion-content">
                    <div className="mt-1/3 mb-1.5">
                      <p>
                        We will be publishing an SLA soon. In the meantime you
                        can visit our{" "}
                        <a href="https://status.openai.com/">Status page</a> to
                        monitor service availability and view historical uptime.
                        If your company or application has specific
                        requirements, please{" "}
                        <a href="/contact-sales">contact our sales team</a>.
                      </p>
                    </div>
                  </div>
                </div>
                {/* <hr className="my-0"> */}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* </article> */}
      <footer
        className="footer container medium-xsmall-copy line-height-1.6"
        style={{ marginTop: "0rem" }}
      >
        <a href="/" className="nav-symbol">
          <img
            src="https://i.ibb.co/p2sgBJB/imageedit-16-4009463339.png"
            type="image/png"
          />
        </a>
        <div className="row mb-1">
          <div className="col-6 col-lg">
            <ul className="mb-2 text-left">
              <div className="small-caps mb-1/3">Featured</div>
            </ul>
          </div>
          <div className="col-6 col-lg">
            <ul className="mb-2 text-left">
              <li>
                <div className="small-caps mb-1/3">API</div>
              </li>
              <li>
                <a className="fade" href="/api/">
                  Overview
                </a>
              </li>
              <li>
                <Link className="fade" to="/pricing/">
                  Pricing
                </Link>
              </li>
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
                <Link className="fade" to="/signin">
                  Log in
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-6 col-lg">
            <ul className="mb-2 text-left">
              <li>
                <div className="small-caps mb-1/3">Blog</div>
              </li>
              <li>
                <a className="fade" href="/blog/">
                  Index
                </a>
              </li>
            </ul>
          </div>
          <div className="col-6 col-lg">
            <ul className="mb-2 text-left">
              <li>
                <div className="small-caps mb-1/3">Information</div>
              </li>
              <li>
                <a className="fade" href="/about/">
                  About Us
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="row align-items-start mb-0.125">
          <div className="col-12 col-md mb-0.5 text-left">
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
    </div>
  );
};

export default PricingPage;
