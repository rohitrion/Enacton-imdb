import React from "react";
function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-200 mt-6 py-3">
      <div className="container mx-auto text-center py-2">
        <div className="mb-4 pb-2">
          <a href="/">Get TMDb App</a>
          <span className="mx-2">|</span>
          <a href="/">Help</a>
          <span className="mx-2">|</span>
          <a href="/">Site Index</a>
          <span className="mx-2">|</span>
          <a href="/">IMDb Pro</a>
          <span className="mx-2">|</span>
          <a href="/">Box Office Mojo</a>
        </div>
        <div className="mb-4">
          <a href="/">IMDb Developer</a>
          <span className="mx-2">|</span>
          <a href="/">Press Room</a>
          <span className="mx-2">|</span>
          <a href="/">Advertising</a>
          <span className="mx-2">|</span>
          <a href="/">Jobs</a>
        </div>
        <div className="mb-4">
          <a href="/">Conditions of Use</a>
          <span className="mx-2">|</span>
          <a href="/">Privacy Policy</a>
          <span className="mx-2">|</span>
          <a href="/">Your Ad Choices</a>
          <span className="mx-2">|</span>
          <a href="/">An Amazon Company</a>
        </div>
        <div className="mb-4">
          <p>&copy; 1990-2023 by IMDb.com, Inc.</p>
        </div>
        <div className="mb-4">
          <a href="/">Facebook</a>
          <span className="mx-2">|</span>
          <a href="/">Twitter</a>
          <span className="mx-2">|</span>
          <a href="/">Instagram</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
