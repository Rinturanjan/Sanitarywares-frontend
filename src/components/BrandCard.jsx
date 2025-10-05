// components/BrandCard.jsx
import React from 'react';

const BrandCard = ({ brandImage, altText, extraContent, hasScallops = true }) => {
  return (
    <div className="relative w-32 h-32 bg-white flex flex-col items-center justify-center p-1 border-2 border-yellow-400 rounded-lg overflow-hidden">
      {/*
        SVG Definitions for Clip Paths
        It's more efficient to define these once, e.g., in a global SVG sprite or
        at a higher level component if many BrandCards are used. For simplicity,
        I'm placing it inside each BrandCard, but be aware of potential DOM bloat
        if you have hundreds of these on one page.
      */}
      {hasScallops && (
        <svg width="0" height="0" className="absolute">
          <defs>
            {/* Top Scalloped Border Clip Path */}
            <clipPath id="scallop-top" clipPathUnits="objectBoundingBox">
              <path
                d="M0,1 C0.05,0.9 0.1,0.9 0.15,1 S0.25,1.1 0.3,1 S0.4,0.9 0.45,1 S0.55,1.1 0.6,1 S0.7,0.9 0.75,1 S0.85,1.1 0.9,1 S1,0.9 1,1 L1,0 L0,0 Z"
              />
            </clipPath>

            {/* Bottom Scalloped Border Clip Path (similar but inverted) */}
            <clipPath id="scallop-bottom" clipPathUnits="objectBoundingBox">
              <path
                d="M0,0 C0.05,0.1 0.1,0.1 0.15,0 S0.25,-0.1 0.3,0 S0.4,0.1 0.45,0 S0.55,-0.1 0.6,0 S0.7,0.1 0.75,0 S0.85,-0.1 0.9,0 S1,0.1 1,0 L1,1 L0,1 Z"
              />
            </clipPath>
          </defs>
        </svg>
      )}

      {/* Outer yellow border, adjusted for scallops */}
      {hasScallops && (
        <>
          <div
            className="absolute top-0 left-0 right-0 h-2 bg-yellow-400"
            style={{ clipPath: 'url(#scallop-top)' }}
          ></div>
          <div
            className="absolute bottom-0 left-0 right-0 h-2 bg-yellow-400"
            style={{ clipPath: 'url(#scallop-bottom)' }}
          ></div>
        </>
      )}

      {/* Inner white background for the content, which will be clipped if hasScallops is true */}
      <div
        className="w-full h-full bg-white flex flex-col items-center justify-center"
        // Applying the clip-path to the inner content div if scallops are desired
        // This will clip the white background AND its content
        style={
          hasScallops
            ? {
                clipPath: 'url(#scallop-top)',
                paddingTop: '0.5rem', // Adjust padding to clear the yellow border
                clipPath: 'url(#scallop-bottom)', // Re-apply for bottom scallop
                paddingBottom: '0.5rem', // Adjust padding to clear the yellow border
              }
            : {}
        }
      >
        {/* Main Brand Image */}
        <img src={brandImage} alt={altText} className="h-12 w-24 object-contain" />

        {/* Any extra content, like the product image for Astral */}
        {extraContent && <div className="mt-1">{extraContent}</div>}
      </div>
    </div>
  );
};

export default BrandCard;