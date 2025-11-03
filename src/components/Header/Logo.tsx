import Link from "next/link";
import Image from "next/image";
import { memo } from "react";

interface LogoProps {
  onLogoClick?: () => void;
}

/**
 * Header Logo Component
 * Displays the Lyyli.ai logo with proper accessibility attributes
 */
const Logo = memo(({ onLogoClick }: LogoProps) => {
  return (
    <Link
      href="/"
      className="flex items-center gap-3"
      aria-label="Lyyli.ai homepage"
      onClick={onLogoClick}
    >
      <Image
        src="/images/logos/Lyyli.ai_no_BG.png"
        alt="Lyyli.ai logo - AI Communication Assistant for Professional Service Organizations"
        width={120}
        height={40}
        priority
        sizes="(max-width: 640px) 120px, 120px"
        className="h-10 w-auto"
      />
    </Link>
  );
});

export default Logo;

