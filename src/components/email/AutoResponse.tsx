import React from 'react';

export const AutoResponseEmail = ({ userName, subject, date }: { userName: string, subject: string, date: string }) => {
  return (
    <div style={{
      fontFamily: "'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif",
      backgroundColor: "#0F0F0F",
      color: "#FFFFFF",
      padding: "40px 20px",
      minHeight: "100%",
    }}>
      <table width="100%" border={0} cellSpacing={0} cellPadding={0}>
        <tr>
          <td align="center">
            <div style={{
              maxWidth: "600px",
              backgroundColor: "rgba(255, 255, 255, 0.03)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              borderRadius: "24px",
              padding: "40px",
              textAlign: "left",
              boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
            }}>
              {/* Header */}
              <div style={{ marginBottom: "32px", textAlign: "center" }}>
                <h1 style={{ 
                  margin: 0, 
                  fontSize: "24px", 
                  fontWeight: "bold",
                  background: "linear-gradient(135deg, #7F00FF 0%, #E100FF 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  color: "#7F00FF", // Fallback
                }}>
                  ADSGRIND
                </h1>
              </div>

              {/* Message */}
              <h2 style={{ fontSize: "20px", fontWeight: "600", marginBottom: "16px" }}>
                Hi {userName},
              </h2>
              <p style={{ color: "rgba(255, 255, 255, 0.6)", lineHeight: "1.6", marginBottom: "24px" }}>
                Thank you for contacting us. We've received your message and our team of experts is already reviewing your request. We will respond within 24 hours with a strategic perspective for your project.
              </p>

              {/* Submission Card */}
              <div style={{
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.05)",
                borderRadius: "16px",
                padding: "20px",
                marginBottom: "32px",
              }}>
                <div style={{ fontSize: "12px", fontWeight: "bold", color: "rgba(255, 255, 255, 0.3)", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "12px" }}>
                  Submission Summary
                </div>
                <div style={{ marginBottom: "8px" }}>
                  <span style={{ color: "rgba(255, 255, 255, 0.5)", fontSize: "14px" }}>Subject:</span>
                  <div style={{ fontWeight: "500", marginTop: "4px" }}>{subject}</div>
                </div>
                <div>
                  <span style={{ color: "rgba(255, 255, 255, 0.5)", fontSize: "14px" }}>Date:</span>
                  <div style={{ fontWeight: "500", marginTop: "4px" }}>{date}</div>
                </div>
              </div>

              <div style={{ textAlign: "center", marginBottom: "32px" }}>
                <a href="https://adsgrind.com" style={{
                  display: "inline-block",
                  background: "linear-gradient(135deg, #7F00FF 0%, #E100FF 100%)",
                  color: "#FFFFFF",
                  padding: "16px 32px",
                  borderRadius: "12px",
                  textDecoration: "none",
                  fontWeight: "bold",
                  fontSize: "16px",
                }}>
                  Visit Our Website
                </a>
              </div>

              {/* Footer */}
              <div style={{ 
                borderTop: "1px solid rgba(255, 255, 255, 0.05)", 
                paddingTop: "24px", 
                textAlign: "center" 
              }}>
                <div style={{ marginBottom: "16px" }}>
                  <a href="#" style={{ color: "rgba(255, 255, 255, 0.4)", textDecoration: "none", fontSize: "12px", margin: "0 8px" }}>Twitter</a>
                  <a href="#" style={{ color: "rgba(255, 255, 255, 0.4)", textDecoration: "none", fontSize: "12px", margin: "0 8px" }}>LinkedIn</a>
                  <a href="#" style={{ color: "rgba(255, 255, 255, 0.4)", textDecoration: "none", fontSize: "12px", margin: "0 8px" }}>Instagram</a>
                </div>
                <p style={{ color: "rgba(255, 255, 255, 0.3)", fontSize: "10px", margin: 0 }}>
                  © 2026 ADSGRIND. All rights reserved.<br />
                  123 Growth Ave, Tech City
                </p>
              </div>
            </div>
          </td>
        </tr>
      </table>
    </div>
  );
};
