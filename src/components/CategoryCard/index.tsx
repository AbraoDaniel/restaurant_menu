import Image from "next/image";
import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({
  weight: "300",
  subsets: ["latin"],
  display: "swap",
});

interface ICategoryCard {
  path: string;
  label: string
}
export default function CategoryCard({path, label}: ICategoryCard) {
  return (
    <div className="category-card" style={{ position: "relative", width: "100%", height: "100%" }}>
      <Link href={`/${path}`}>
        <Image 
          src="/assets/videoframe.png"
          alt="Categoria"
          fill
          style={{ objectFit: "cover" }}
        />
        <div className="background-gradient">
        </div>
        <div className="category-name">
          <p className={`name ${inter.className}`}>
            {label}
          </p>
        </div>
      </Link>
    </div>
  );
}
