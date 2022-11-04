import "./home.css";

import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import ReportMonthlySalesByYear from '../reports/reportMonthlySalesByYear/ReportMonthlySalesByYear';


export default function Home() {
  
  return (
    <div className="home">
      <FeaturedInfo />
      <ReportMonthlySalesByYear />
    </div>
  );
}
