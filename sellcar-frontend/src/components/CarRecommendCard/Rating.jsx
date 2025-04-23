import React from 'react';

const ReadOnlyRating = ({ value = 0, max = 5, size = 24 }) => {
  const stars = [];

  for (let i = 1; i <= max; i++) {
    const fill =
      value >= i ? 100 :
      value + 1 > i ? (value - (i - 1)) * 100 :
      0;

    stars.push(
      <div
        key={i}
        className="relative inline-block"
        style={{ width: size, height: size }}
      >
        {/* Star background (empty) */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          stroke="white"
          strokeWidth="2"
          viewBox="0 0 24 24"
          width={size}
          height={size}
        >
          <path d="M12 .587l3.668 7.568L24 9.75l-6 5.847L19.336 24 12 19.771 4.664 24 6 15.597 0 9.75l8.332-1.595z" />
        </svg>

        {/* Star overlay (filled part) */}
        <div
          style={{
            width: `${fill}%`,
            height: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
            overflow: 'hidden',
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="white"
            viewBox="0 0 24 24"
            width={size}
            height={size}
          >
            <path d="M12 .587l3.668 7.568L24 9.75l-6 5.847L19.336 24 12 19.771 4.664 24 6 15.597 0 9.75l8.332-1.595z" />
          </svg>
        </div>
      </div>
    );
  }

  return <div className="flex gap-1">{stars}</div>;
};

export default ReadOnlyRating;
