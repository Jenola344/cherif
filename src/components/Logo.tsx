import type { FC } from 'react';

const Logo: FC<{ className?: string }> = ({ className = 'h-10' }) => {
  return (
    <svg
      viewBox="0 0 220 40"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Cherif's Gallery Logo"
    >
      <text
        x="0"
        y="30"
        fontFamily="Playfair Display, serif"
        fontSize="32"
        fontWeight="700"
        className="fill-foreground"
      >
        Cherif's
      </text>
      <text
        x="125"
        y="30"
        fontFamily="Playfair Display, serif"
        fontSize="32"
        fontWeight="400"
        className="fill-muted-foreground"
      >
        Gallery
      </text>
    </svg>
  );
};

export default Logo;
