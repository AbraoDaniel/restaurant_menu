export interface IProduct {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  category_id: string;
};

export interface ICategory {
  id: string
  name: string
}

export interface IMenuProps {
  categories: (ICategory & { products: IProduct[] })[];
}

export interface IMenuCategory {
  category: string,
  items: IProduct[]
}

export interface IMenuItem {
  item: IProduct
}

export interface ICategoriesList {
  categories: ICategory[]
  productsMap: {
    [key: string]: IProduct[];
  }
  fetchCategories: () => void
  fetchProducts: (id: string) => void
  setShowAddCategoryModal: (value: boolean) => void
  onEditCategory: (category: ICategory) => void
}

export interface INewProductModal {
  handleCancel: () => void
  category: ICategory
  fetchProducts: (id: string) => void
  product?: IProduct;
  loadingOperation: boolean
  setLoadingOperation: (value: boolean) => void
  showSuccessMessage: (value: string) => void
}

export interface INewCatalogModal {
  handleCancel: () => void
  fetchCategories: () => void
  setShowCatalogMessage: (value: boolean) => void
  category?: ICategory | null
}

export interface IProductPayload {
  id?: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  category_id: string;
}

export const ItemTypes = {
  CARD: "card",
};

export interface IDraggableCardProps {
  card: any;
  index: number;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
  children: React.ReactNode;
  onDrop: () => void
}

export interface IDragItem {
  index: number;
  id: string;
  type: string;
}