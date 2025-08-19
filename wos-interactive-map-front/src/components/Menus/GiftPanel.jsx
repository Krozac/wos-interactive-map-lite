import React from 'react';

export default function GiftPanel() {
  return (
    <div className="gift-panel">
      <p style={{ color: 'red', fontWeight: 'bold' }}>
        Gift code redemption is only available in the full version.
      </p>

      <style jsx>{`
        .gift-panel {
          padding: 20px;
          border: 2px dashed #ccc;
          text-align: center;
          background-color: #f9f9f9;
          margin: 20px auto;
          border-radius: 8px;
          max-width: 400px;
        }
      `}</style>
    </div>
  );
}
