import { forum } from "@/util/fonts";
import { Drawer, Menu } from "antd"
interface IHeaderDrawer {
  setOpenHeaderDrawer: (value: boolean) => void
  items: {
    key: string;
    label: string;
  }[]
}
const HeaderDrawer: React.FC<IHeaderDrawer> = ({ setOpenHeaderDrawer, items }) => {
  // function handleClickToRedirect(value: string) {
  //   if (value !== 'github') {
  //     navigate(value)
  //     setOpenHeaderDrawer(false)
  //     return
  //   }

  //   window.open('https://github.com/AbraoDaniel', '_blank')
  // }

  return (
    <Drawer
      open
      onClose={() => setOpenHeaderDrawer(false)}
      placement="left"
      width={700}
      className="header-drawer"
      title={
        <div style={{ textAlign: 'center' }}>
          <div className={`header-logo ${forum.className}`} style={{ marginTop: 0 }} onClick={() => {
            setOpenHeaderDrawer(false)
          }}>
            {'danti.'}
          </div>
        </div>
      }
    >
      <Menu
        className='header-menu'
        mode="vertical"
        // onClick={(value) => {
        //   handleClickToRedirect(value?.key)
        // }}
        items={items}
      />
    </Drawer>
  )
}

export default HeaderDrawer