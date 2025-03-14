import Image from "next/image";
import { Col, Row } from "antd"
import HeaderMenu from "@/components/HeaderMenu";
import MenuCategory from "@/components/MenuCategory";
import Link from "next/link";
import { forum } from "@/util/fonts";
import { ICategory, IProduct } from "@/util/types";



async function getCategoriesWithProducts() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  const categoriesRes = await fetch(`${baseUrl}/api/categories`, { cache: 'no-store' });
  if (!categoriesRes.ok) throw new Error("Falha ao buscar categorias");
  const categories: ICategory[] = await categoriesRes.json();

  const categoriesWithProducts = await Promise.all(
    categories.map(async (cat) => {
      const productsRes = await fetch(`${baseUrl}/api/products?category_id=${cat.id}`, { cache: 'no-store' });
      if (!productsRes.ok) throw new Error("Falha ao buscar produtos");
      const products: IProduct[] = await productsRes.json();
      return { ...cat, products };
    })
  );

  return categoriesWithProducts;
}
export default async function Menu() {
  const itemsOfMenu = await getCategoriesWithProducts();

  return (
    <Row className="menu-wrapper">

      <Col xs={24} xl={12} className="main-menu">
        <div className="content">
          <HeaderMenu />
          <Image
            src="/assets/default-menu.jpg"
            alt="imagem"
            width={1000}
            height={1200}
          />
          <div className="menu-name">
            <p className={`name ${forum.className}`}>
              {'MENU'}
            </p>
          </div>
        </div>
      </Col>
      <Col xs={24} xl={12} className="main-menu">
        <div className="menu-foods">
          <div className="items-wrapper">
            <div className="items">
              <Row style={{ width: '100%' }} justify="center">
                {itemsOfMenu?.map((category, index) => {
                  return (
                    <Link key={`#${category?.name}_${index}`} href={`#${category?.name?.toLowerCase()}`}>
                      <div key={`${category?.name}_${index}`} className="food-category-redirect-button">
                        {category?.name}
                      </div>
                    </Link>
                  )
                })}

              </Row>
              {itemsOfMenu?.map((category, index) => {
                return (
                  <MenuCategory key={`${category?.name}_${index}`} category={category?.name} items={category?.products} />
                )
              })}
            </div>
          </div>
        </div>
      </Col>
    </Row>
  )
}