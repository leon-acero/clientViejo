import "./featuredInfo.css";
import ArrowDownward from "@mui/icons-material/ArrowDownward";
import ArrowUpward from "@mui/icons-material/ArrowUpward";
import { NumericFormat } from 'react-number-format';

export default function FeaturedInfo() {
  return (
    <div className="featured">

      <div className="featuredItem">
        <span className="featuredTitle">Ganancias</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney"><NumericFormat value={3000} displayType={'text'} thousandSeparator={true} prefix={'$'} /></span>
          <span className="featuredMoneyRate">
            -11.4 <ArrowDownward  className="featuredIcon negative"/>
          </span>
        </div>
        <span className="featuredSub">Comparados con el mes anterior</span>
      </div>

      <div className="featuredItem">
        <span className="featuredTitle">Ventas</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">$4,415</span>
          <span className="featuredMoneyRate">
            -1.4 <ArrowDownward className="featuredIcon negative"/>
          </span>
        </div>
        <span className="featuredSub">Comparados con el mes anterior</span>
      </div>
      
      <div className="featuredItem">
        <span className="featuredTitle">Compras</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">$2,225</span>
          <span className="featuredMoneyRate">
            +2.4 <ArrowUpward className="featuredIcon"/>
          </span>
        </div>
        <span className="featuredSub">Comparados con el mes anterior</span>
      </div>
      
    </div>
  );
}
