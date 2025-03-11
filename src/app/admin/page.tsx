"use client"

import { onAuthStateChanged } from "firebase/auth"
import { auth } from "@/util/firebase"
import { useEffect, useState } from "react"
import { Row, Layout, Menu, Spin, Skeleton, } from "antd"
import { MdAddCircleOutline, MdAdminPanelSettings, MdFormatListBulleted, MdMenu } from "react-icons/md"
import type { MenuProps } from 'antd'
import NewCatalogModal from "@/components/NewCatalogModal"
import CategoriesList from "@/components/CategoriesList"
import Link from "next/link"
import { useMessageFunctions } from "@/components/Message"
import HeaderDrawer from "@/components/HeaderDrawer"
import { adminItems } from "@/util/generalFields"
import { forum, inter } from "@/util/fonts"
import { ICategory, IProduct } from "@/util/types"

const { Header, Content, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number]

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem
}

const items: MenuItem[] = [
  getItem('Gestão de produtos', 'product_manage', <MdFormatListBulleted />),
]

export default function AdminPage() {
  const { messageSuccess, contextHolder } = useMessageFunctions()
  const [loading, setLoading] = useState(true)
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false)
  const [showHeaderDrawer, setShowHeaderDrawer] = useState(false)
  const [collapsedMenu, setCollapsedMenu] = useState(false)
  const [categories, setCategories] = useState<ICategory[]>([])
  const [productsMap, setProductsMap] = useState<{ [key: string]: IProduct[] }>({})
  const [currentCategory, setCurrentCategory] = useState<ICategory | undefined>({ id: '0', name: '' })
  const [successMessage, setSuccessMessage] = useState(false)

  useEffect(() => {
    if (successMessage) {
      if (currentCategory?.id) {
        messageSuccess("Categoria atualizada com sucesso!")
      } else {
        messageSuccess("Categoria criada com sucesso!")
      }
      setSuccessMessage(false)
    }
  }, [successMessage])

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        window.location.href = "/login"
      } else {
        setLoading(true)
        fetchCategories()
      }
    })
    return () => unsubscribe()
  }, [])

  async function fetchCategories() {
    try {
      const res = await fetch("/api/categories")
      if (!res.ok) throw new Error("Falha ao buscar categorias")
      const data = await res.json()
      setCategories(data)
      data.forEach((cat: ICategory) => {
        fetchProducts(cat.id)
      })

      setLoading(false)
    } catch (error) {
      console.error(error)
    }
  }

  async function fetchProducts(categoryId: string) {
    try {
      const res = await fetch(`/api/products?category_id=${categoryId}`)
      if (!res.ok) throw new Error("Falha ao buscar produtos")
      const data = await res.json()
      setProductsMap((prev) => ({ ...prev, [categoryId]: data }))
    } catch (error) {
      console.error(error)
    }
  }

  function handleEditCategory(category: ICategory) {
    setCurrentCategory(category);
    setShowAddCategoryModal(true);
  }

  function handleNewCategory() {
    setCurrentCategory(undefined)
    setShowAddCategoryModal(true);
  }


  return (
    <Layout className="admin-control">
      {contextHolder}
      {showAddCategoryModal && <NewCatalogModal category={currentCategory} setShowCatalogMessage={setSuccessMessage} fetchCategories={fetchCategories} handleCancel={() => setShowAddCategoryModal(false)} />}
      {showHeaderDrawer && <HeaderDrawer setOpenHeaderDrawer={setShowHeaderDrawer} items={adminItems} />}
      <Sider width={230} collapsible collapsed={collapsedMenu} onCollapse={(value) => setCollapsedMenu(value)} className="admin-sider">
        <div className="panel-title">
          <Link href="/" style={{ cursor: 'pointer' }}>
            <p className={`admin-panel ${forum.className}`} >{
              collapsedMenu ? <MdAdminPanelSettings style={{ fontSize: 50 }} /> : (<><MdAdminPanelSettings style={{ fontSize: 40 }} />{'danti.'}</>)}</p>
          </Link>
        </div>
        <div className="demo-logo-vertical" />
        <Menu defaultSelectedKeys={['product_manage']} mode="inline" items={items} className={`menu-items ${inter.className}`} />
      </Sider>
      <div style={{ width: '100%', height: '100dvh' }}>
        <Header className="admin-header">
          <Row style={{ width: '100%' }} justify="center">
            <MdMenu className="menu-icon" onClick={() => setShowHeaderDrawer(true)} />
            <Link href="/" style={{ cursor: 'pointer' }}>
              <p className={`admin-panel ${forum.className}`} >
                <MdAdminPanelSettings style={{ fontSize: 40 }} />
                {'danti.'}
              </p>
            </Link>
          </Row>
        </Header>
        <div className="main-page">
          <Layout className="main-categories">
            <Content style={{ margin: '0 16px' }} className="main-content" >
              <Row className="category-title">
                <p className={`category-main-title ${forum.className}`}>Categorias</p>
                {!loading && <MdAddCircleOutline onClick={handleNewCategory} />}
              </Row>
              <Spin spinning={loading} className="spin-loading">
                <CategoriesList setShowAddCategoryModal={setShowAddCategoryModal} categories={categories} productsMap={productsMap} fetchCategories={fetchCategories} fetchProducts={fetchProducts} onEditCategory={handleEditCategory}
                />
              </Spin>
            </Content>
          </Layout>
        </div>
      </div>
    </Layout >
  )
}
