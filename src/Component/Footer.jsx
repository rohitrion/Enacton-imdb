import React from "react";
import { Footerconfig } from "../Config/Footerconfig";

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-200 mt-7 py-6">
      <div className="container mx-auto text-center py-2">
        <div>
          {Footerconfig.map((link, index) => (
            <span key={index}>
              <a href={link.href}>{link.text}</a>
              {index < Footerconfig.length - 1 && (
                <span className="mx-2">|</span>
              )}
            </span>
          ))}
        </div>
        <div className="mb-4">
          <p>&copy; 1990-2023 by IMDb.com, Inc.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
