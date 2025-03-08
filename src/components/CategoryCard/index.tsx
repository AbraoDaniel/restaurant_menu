import Image from "next/image";
import { Inter, Forum } from "next/font/google";
import Link from "next/link";

const inter = Inter({
  weight: "300",
  subsets: ["latin"],
  display: "swap",
});

const forum = Forum({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});
interface ICategoryCard {
  path: string;
  label: string
  image: string
}
export default function CategoryCard({ path, label, image }: ICategoryCard) {
  return (
    <div className="category-card" style={{ position: "relative", width: "100%", height: "100%" }}>
      <Link href={`/${path}`}>
        <Image
          src={image}
          alt="Categoria"
          fill
          style={{ objectFit: "cover" }}
        />
        <div className="background-gradient">
        </div>
        <div className="category-name">
          <p className={`name ${forum.className}`}>
            {label}
          </p>
        </div>
      </Link>
    </div>
  );
}
