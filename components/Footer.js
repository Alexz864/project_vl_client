import React from "react";
import Center from "./Center";

const Footer = () => {
  return (
    <footer style={footerStyle}>
      <Center>
        <div style={containerStyle}>
          <div style={columnStyle}>
            <h3>About Us</h3>
            <p>Very short description of the website</p>
          </div>
          <div style={columnStyle}>
            <h3>Contact Us</h3>
            <p>Email: info@example.com</p>
            <p>Phone: +123 456 7890</p>
          </div>
          <div style={columnStyle}>
            <h3>Follow Us</h3>
            <p>
              <a href="https://www.facebook.com" style={linkStyle}>
                Facebook
              </a>
            </p>
            <p>
              <a href="https://www.twitter.com" style={linkStyle}>
                Twitter
              </a>
            </p>
            <p>
              <a href="https://www.instagram.com" style={linkStyle}>
                Instagram
              </a>
            </p>
          </div>
        </div>
        <p style={copyrightStyle}>Copyright &copy; 2023</p>
      </Center>
    </footer>
  );
};

const footerStyle = {
  background: "#333",
  color: "#fff",
  textAlign: "center",
  paddingBottom: "1%",
  marginTop: "28.32em",
  height: "calc(100% - 1%)",
};

const containerStyle = {
  display: "flex",
  justifyContent: "space-around",
  marginBottom: "20px",
};

const columnStyle = {
  maxWidth: "21%",
};

const linkStyle = {
  color: "#fff",
  textDecoration: "none",
};

const copyrightStyle = {
  borderTop: "1px solid #fff",
  paddingTop: "10px",
};

export default Footer;
