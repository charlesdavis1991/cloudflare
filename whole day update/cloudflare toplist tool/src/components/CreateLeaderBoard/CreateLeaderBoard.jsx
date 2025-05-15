import React from "react";
const CreateLeaderBoard = () => {
  return (
    <div className="page">
      <header>
        <nav className="topnav">
          <a href="/" className="site-logo">
            {/* Add logo here */}
          </a>
          <a
            href="https://bit.ly/3uUt2Wo"
            target="_blank"
            className="newhope-promo"
            rel="nofollow noreferrer noopener"
          >
            <picture>
              <source
                srcSet="/static/images/rg/newhope-ukraine-se-2.webp"
                type="image/webp"
              />
              <img
                alt="Stöd Ukraina"
                width="50"
                height="44"
                fetchpriority="low"
                src="/static/images/rg/newhope-ukraine-se-2.png"
              />
            </picture>
          </a>
        </nav>
      </header>

      <main>
        <div className="container">
          <h2>Create leaderboard</h2>
          <p>
          Customize your leaderboard as you want it. The link that is created should then be inserted into an iframe. The menu on the left otherwise contains ready-made templates. For some formats, there is also the option to display an image with the leaderboard.
          </p>

          <form className="form-horizontal">
            <div className="form-group">
              <label htmlFor="toplist_type" className="col-sm-2 control-label">
              Content
              </label>
              <div className="col-sm-4">
                <select
                  className="form-control"
                  name="toplist_type"
                  id="toplist_type"
                >
                  <option value="charter" selected>
                  Trip type &amp; paket
                  </option>
                  <option value="air">Flyg</option>
                  <option value="last_minute">Sista minuten</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="limit" className="col-sm-2 control-label">
              Number of awards
              </label>
              <div className="col-sm-2">
                <select className="form-control" name="limit" id="limit">
                  {[...Array(30)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-group">
              <label
                htmlFor="city_code_dep"
                className="col-sm-2 control-label"
              >
                Avreseort
              </label>
              <div className="col-sm-4">
                <select
                  className="form-control"
                  name="city_code_dep"
                  id="city_code_dep"
                >
                  <option value="" selected>
                    Alla
                  </option>
                  <option value="GEV">Gällivare</option>
                  <option value="GOT">Göteborg</option>
                  {/* Add more options as needed */}
                </select>
              </div>
            </div>

            <div className="form-group">
              <label
                htmlFor="destination_theme_id"
                className="col-sm-2 control-label"
              >
                Tema
              </label>
              <div className="col-sm-2">
                <select
                  className="form-control"
                  name="destination_theme_id"
                  id="destination_theme_id"
                >
                  <option value="1" selected>
                    Sol &amp; bad
                  </option>
                  <option value="2">Weekend &amp; storstad</option>
                  <option value="3">Skidresor</option>
                  <option value="">Inget tema valt</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <div className="col-sm-offset-2 col-sm-10">
                <button
                  type="button"
                  className="btn btn-primary btn-small js-button-create-url"
                >
                  Uppdatera länk nedan
                </button>
              </div>
            </div>
          </form>

          <div>
            <div className="example__section-subtitle">
            Link to paste into an iframe
            </div>
            <textarea
              className="example__code-block js-url js-code pull-left"
              readOnly
            >
              https://www.reseguiden.se/widget/toplist/charter?destination_theme_id=1
            </textarea>
            <button className="example__copy-btn js-copy-button pull-right">
              Kopiera
            </button>
          </div>

          <div className="example__section-title">Förhandsgranskning</div>
          <iframe
            id="js-preview-iframe"
            className="js-preview-iframe"
            style={{ width: "980px", height: "600px" }}
            scrolling="no"
            frameBorder="0"
            src="https://www.reseguiden.se/widget/toplist/charter?destination_theme_id=1"
          ></iframe>
        </div>
      </main>
    </div>
  );
};

export default CreateLeaderBoard;