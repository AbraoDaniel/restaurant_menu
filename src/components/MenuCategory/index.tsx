import { Col, Row } from "antd";
import MenuItem from "./MenuItem";
import { forum } from "@/util/fonts";
import { IMenuCategory } from "@/util/types";

export default function MenuCategory({ category, items }: IMenuCategory) {
  return (
    <Row style={{ width: '100%' }} justify="center" id={`${category?.toLowerCase()}`}>
      <div className="foods-categories">
        <div className="food">
          <div className={`category-name ${forum.className}`} >
            <div className="teste" />
            <p>{category}</p>
            <div className="teste" />
          </div>

          {items?.map((item, index) => {
            return (
              <MenuItem key={`${item?.name}_${index}`} item={item} />
            )
          })}
        </div>
      </div>
    </Row>
  )
}
