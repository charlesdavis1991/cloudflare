import React, { useState } from "react";

const LastMinute = () => {
  const [selectedFormat, setSelectedFormat] = useState("980x240");
  const [includeLogo, setIncludeLogo] = useState(true);

  const handleFormatChange = (event) => {
    setSelectedFormat(event.target.value);
  };

  const handleLogoToggle = () => {
    setIncludeLogo(!includeLogo);
  };

  return (
    <div className="page">
      {/* Menu Section */}
      <div className="col-xs-12 col-md-2 menu">
        <div className="menu__title">Meny</div>
        <div className="menu__subtitle">Mallar för topplistor</div>
        <div>
          <a className="menu__active" href="toplist-example-charter">
            Charter
          </a>
        </div>
        <div className="menu__submenu">
          <div>
            <a href="toplist-example-charter-sun">Sol &amp; bad</a>
          </div>
          <div>
            <a href="toplist-example-charter-city">Weekend &amp; storstad</a>
          </div>
          <div>
            <a href="toplist-example-charter-snow">Skidresor</a>
          </div>
        </div>
        <div>
          <a href="toplist-example-last_minute">Sista minuten</a>
        </div>
        <div>
          <a href="toplist-example-air">Flyg</a>
        </div>
        <div className="menu__subtitle">Egen anpassning</div>
        <div>
          <a href="create-toplist">Skapa topplista</a>
        </div>
      </div>

      {/* Example Section */}
      <div className="col-xs-12 col-md-10 example">
        <div className="container">
          <div className="example__title">Charter - alla resmål</div>
          <p>Här finns topplist-länkar som passar för olika iframe-format.</p>

          <div className="example__subtitle">Välj format</div>
          <form>
            <div className="row">
              <div className="col-xs-12 col-sm-4">
                <select
                  className="form-control js-select-format"
                  name="format"
                  id="format"
                  value={selectedFormat}
                  onChange={handleFormatChange}
                >
                  <option disabled>Liggande (en eller två kolumner)</option>
                  <option value="300x250">300x250</option>
                  <option value="468x240">468x240</option>
                  <option value="480x120">480x120</option>
                  <option value="600x315">600x315</option>
                  <option value="980x120">980x120</option>
                  <option value="980x240">980x240 (bild)</option>
                  <option value="980x400">980x400</option>
                  <option value="980x600">980x600</option>
                  <option value="1000x600">1000x600</option>
                  <option value="1250x240">1250x240 (bild)</option>
                  <option disabled>Stående (en kolumn)</option>
                  <option value="160x600">160x600 (bild)</option>
                  <option value="250x360">250x360 (bild)</option>
                  <option value="250x600">250x600 (bild)</option>
                  <option value="320x320">320x320</option>
                  <option value="468x600">468x600 (bild)</option>
                </select>
              </div>
            </div>
            <br />
            <div className="row">
              <div className="col-xs-12 example__checkboxes">
                <label>
                  <input
                    name="rg_logo"
                    id="rg_logo"
                    type="checkbox"
                    checked={includeLogo}
                    onChange={handleLogoToggle}
                  />
                  <span className="js-checkbox-rg">Med Reseguiden-logga</span>
                </label>
              </div>
            </div>
            <br />
            <button
              type="button"
              className="btn btn-default btn-small js-button-show-format"
            >
              Visa
            </button>
          </form>

          {/* Default Section */}
          <div className="example__section js-example-div-default">
            <div className="example__section-title">Utan bakgrundsbild</div>
            <iframe
              className="js-example-iframe"
              scrolling="no"
              frameBorder="0"
              src={`https://www.reseguiden.se/widget/toplist/charter?limit=10&slim=1&partner_logo=${
                includeLogo ? "1" : "0"
              }`}
            ></iframe>
            <div className="example__section-subtitle">
              Länk att klistra in i en iframe
            </div>
            <div className="clearfix">
              <textarea
                className="example__code-block js-toplist-link js-code pull-left"
                readOnly
              >
                https://www.reseguiden.se/widget/toplist/charter?limit=10&slim=1&partner_logo=1
              </textarea>
              <button className="example__copy-btn js-copy-button pull-right">
                Kopiera
              </button>
            </div>
          </div>

          {/* With Background Image */}
          <div className="example__section js-example-div-background">
            <div className="example__section-title">Med bakgrundsbild</div>
            <iframe
              className="js-example-iframe"
              scrolling="no"
              frameBorder="0"
              src={`https://www.reseguiden.se/widget/toplist/charter?limit=10&slim=1&partner_logo=${
                includeLogo ? "1" : "0"
              }&background=sky`}
            ></iframe>
          </div>

          {/* With Image */}
          <div className="example__section js-example-div-image">
            <div className="example__section-title">Med bild</div>
            <iframe
              className="js-example-iframe"
              scrolling="no"
              frameBorder="0"
              src={`https://www.reseguiden.se/widget/toplist/charter?limit=10&slim=1&partner_logo=${
                includeLogo ? "1" : "0"
              }&image=1`}
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LastMinute;