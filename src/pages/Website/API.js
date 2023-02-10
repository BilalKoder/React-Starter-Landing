import React from "react";
import { Link } from "react-router-dom";
import "./website.css";
const APIPage = () => {
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
  const code = `
  import requests
  import json
  
  url = 'https://www.bloomai.eu/v1'
  
  data = {
      "operation": "call_bloom",
      "model_name" : "Bloom",
      "input": "Tell me a joke",
      "user_id": "you@email.com",
      "api_key": "your_api_key",
  }
  
  response = requests.post(url,  data=json.dumps(data))`;
  return (
    <div className="page-api">
      <nav className="nav" data-url="/api/">
        <div className="container">
          <div className="nav-row row align-items-start align-items-sm-center">
            <div className="col-6 col-sm nav-symbol-wrap">
              <Link href="/" className="nav-symbol">
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
                  right: "10px",
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
                  <a className="nav-link " href="/about/" data-slug="about"></a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
      <section className="bg-fg-3 mb-2 py-3">
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-6">
              <div style={{ maxWidth: "428px" }} className="text-left ">
                <h2 className="balance-text text-left mx-auto mb-1">
                  Build the next generation of applications with Bloom.{" "}
                </h2>
                <div className="max-width-xxnarrow text-left  mx-md-auto">
                  With a single API call you'll have access to our most powerful
                  model Bloom Large, with 176 Billion parameters, any natural
                  language processing task becomes within reach no matter the
                  complexity.
                </div>
                <br />
                <br />
                <Link
                  to="/signin"
                  className="btn btn-padded btn-dark btn-circle mr-0.5"
                >
                  Get started
                </Link>
                <a className="btn" href="https://beta.openai.com/docs/">
                  Read Documentation
                </a>
              </div>
            </div>
            <div className="col-12 col-md-6 content no-col">
              <div className="arrow-list-container medium-xsmall-copy">
                <pre className="page-api__pre-1 mx-auto mt-1 language-python">
                  <code
                    className="text-left language-python"
                    style={{ padding: "22px 25px" }}
                  >
                    <span className="token keyword">import</span>
                    <span> requests</span>
                    <br />
                    <span className="token keyword">import</span>
                    <span> json</span>
                    <br />
                    <br />
                    <span>url = </span>
                    <span className="token string">
                      'https://www.bloomai.eu/v1'
                    </span>
                    <br />
                    <br />
                    <span>data </span>
                    <span className="token operator">=</span>
                    <span> </span>
                    <span className="token punctuation">{`{`}</span>
                    <span></span>
                    <br />
                    <span className="token string">
                      &nbsp;&nbsp; &nbsp;&nbsp;"operation"
                    </span>
                    <span className="token punctuation">:</span>
                    <span> </span>
                    <span className="token string">"call_bloom"</span>

                    <span className="token punctuation">,</span>
                    <br />
                    <span></span>
                    <span className="token string">
                      &nbsp;&nbsp; &nbsp;&nbsp;"model_name"
                    </span>
                    <span> </span>
                    <span className="token punctuation">:</span>
                    <span> </span>
                    <span className="token string">"Bloom"</span>
                    <span className="token punctuation">,</span>
                    <br />
                    <span></span>
                    <span className="token string">
                      &nbsp;&nbsp; &nbsp;&nbsp;"input"
                    </span>
                    <span className="token punctuation">:</span>
                    <span> </span>
                    <span className="token string">"Tell me a joke"</span>
                    <span className="token punctuation">,</span>
                    <br />
                    <span></span>
                    <span className="token string">
                      &nbsp;&nbsp; &nbsp;&nbsp;"user_id"
                    </span>
                    <span className="token punctuation">:</span>
                    <span> </span>
                    <span className="token string">"you@email.com"</span>
                    <span className="token punctuation">,</span>
                    <br />
                    <span></span>
                    <span className="token string">
                      &nbsp;&nbsp; &nbsp;&nbsp;"api_key"
                    </span>
                    <span className="token punctuation">:</span>
                    <span> </span>
                    <span className="token string">"your_api_key"</span>
                    <span className="token punctuation">,</span>
                    <br />
                    <span></span>
                    <span className="token punctuation">{`}`}</span>
                    <br />
                    <br />
                    <span>response </span>
                    <span className="token operator">=</span>
                    <span> requests</span>
                    <span className="token punctuation">.</span>
                    <span>post</span>
                    <span className="token punctuation">(</span>
                    <span>url</span>
                    <span className="token punctuation">,</span>
                    <span> data</span>
                    <span className="token operator">=</span>
                    <span>json</span>
                    <span className="token punctuation">.</span>
                    <span>dumps</span>
                    <span className="token punctuation">(</span>
                    <span>data</span>
                    <span className="token punctuation">)</span>
                    <span className="token punctuation">)</span>
                  </code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="container mb-3"
        style={{ marginBottom: "4.2rem !important" }}
      >
        <div className="row">
          <div
            className="col-12 col-md-4 mb-1.5"
            // style={{ marginLeft: "2rem" }}
          >
            <h2 className="mb-1/3 d-flex">
              <span
                className="icon position-relative ml-n0.125 mr-0.25"
                style={{ marginTop: "-1px" }}
              >
                Lightning
              </span>
              Fast
            </h2>
            <div className="content no-col text-left medium-xsmall-copy line-height-1.5">
              Our highly optimized inference infrastructure provides short
              response times despite the size of our model.
            </div>
          </div>
          <div className="col-12 col-md-4 mb-1.5">
            <h2 className="mb-1/3 d-flex">
              <span
                className="icon position-relative ml-n0.125 mr-0.25"
                style={{ marginTop: "-1px" }}
              >
                Easily
              </span>
              Scalable
            </h2>
            <div className="content no-col text-left  medium-xsmall-copy line-height-1.5">
              Build and ship your next generation AI applications without
              worrying about demand with our auto scaling infrastrcuture.
            </div>
          </div>
          <div className="col-12 col-md-4 mb-1.5">
            <h2 className="mb-1/3 d-flex">
              <span
                className="icon position-relative ml-n0.125 mr-0.25"
                style={{ marginTop: "-1px" }}
              ></span>
              Flexible
            </h2>
            <div className="content no-col text-left  medium-xsmall-copy line-height-1.5">
              Say goodbye to infrastructure and deplyoment headaches with our
              easy to use and flexible API.
            </div>
          </div>
        </div>
      </section>
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
                <Link className="fade" to="/signin/">
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

export default APIPage;
