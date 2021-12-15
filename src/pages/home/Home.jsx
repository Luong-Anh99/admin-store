import React, { useEffect, useState } from 'react'
import Chart from '../../components/chart/Chart'
import FeaturedInfo from '../../components/featuredInfo/FeaturedInfo'
import './home.css';

import {userData} from '../../dummyData';
import WidgetSm from '../../components/widgetSm/WidgetSm';
import WidgetLg from '../../components/widgetLg/WidgetLg';
import chartApi from '../../api/chartAPI';


export default function Home() {
    const [chart, setChart] =  useState()

    useEffect(() => {
        const fetchTotoList = async () => {
          try {
            const res = await chartApi.getAll();
            if (res ) {
                console.log("data chart", res?.orderChart)
                setChart(res?.orderChart)
            }
          } catch (error) {
            console.log("error:", error);
          }
        };
    
        fetchTotoList();
      }, []);

    return (
        <div className='home'>
            <FeaturedInfo/>
            <Chart data={chart} title="Order Analytics" grid dataKey ="orderNumber" />
            <div className="homeWidgets">
                <WidgetSm/>
                <WidgetLg/>
            </div>
        </div>
    )
}
