import React from "react";

const Navbar = () => {
  return (
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
  );
};

export default Navbar;