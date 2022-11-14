import "./home.css";

import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import ReportMonthlySalesByYear from '../reports/reportMonthlySalesByYear/ReportMonthlySalesByYear';

import { useMatchMedia } from "../../hooks/useMatchMedia";

export default function Home() {
  
  const isDesktopResolution = useMatchMedia("(min-width:53.75em)", true);
  
  return (
    <div className="home">
        {
        isDesktopResolution && (
          <>
            <FeaturedInfo />
            <ReportMonthlySalesByYear />
          </>
          )
        }

    </div>
  );
}
