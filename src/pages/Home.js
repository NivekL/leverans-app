import React from 'react'
import styled from 'styled-components'; 

import Img from '../images/josh-miller-83DnGfaWV24-unsplash.jpg';
import L1 from '../images/London_Classic/2371_85dae26011-fast119-me021212-1.png';
import L2 from '../images/London_Classic/3067_17f2e62f2f.png';
import L3 from '../images/London_Classic/3074_98030549cb-nes.png';
import L4 from '../images/London_Classic/3082_1f48525a62-fast.png';
import D1 from '../images/Dubai_Luxury/Audemars_Piguet-Royal_Oak_Concept.jpg'
import D2 from '../images/Dubai_Luxury/jaeger-lecoultre-4122520.jpeg'
import D3 from '../images/Dubai_Luxury/omega-de-ville-tresor-43553402109001-l.jpg'
import D4 from '../images/Dubai_Luxury/Parmigiani-PFC128-1001400-HA1441.jpg'
import S1 from '../images/St_Moritz_Sport/42apple_watch_series_3_gps_42mm_space_gray_aluminum_black_sport_band_pure_front_vertical_us-en_screen.jpg';
import S2 from '../images/St_Moritz_Sport/apple_watch_se_gps_40mm_gold_aluminum_pink_sand_sport_band_pure_front_screen__usen.jpg';
import S3 from '../images/St_Moritz_Sport/citizen_satellite.jpg';
import S4 from '../images/St_Moritz_Sport/garmin_vivoactive_010-02172-22_2.jpg';

function home() {
    return (
        <div>
            <Hero>
                <h1>Nice Watch</h1>
            </Hero>
            <div>
                <div>
                <TextLondon>London Classic</TextLondon>
                    <London>
                    <img src={L1} alt=""/>
                    <img src={L2} alt=""/>
                    <img src={L3} alt=""/>
                    <img src={L4} alt=""/>
                    </London>
                </div>
                <div>
                    <TextDubai>Dubai Luxury</TextDubai>
                    <Dubai>
                    <img src={D1} alt=""/>
                    <img src={D2} alt=""/>
                    <img src={D3} alt=""/>
                    <img src={D4} alt=""/>
                    </Dubai> 
                </div>
                <div>
                    <TextSt>St Moritz Sport</TextSt>
                    <Moritz>
                    <img src={S1} alt=""/>
                    <img src={S2} alt=""/>
                    <img src={S3} alt=""/>
                    <img src={S4} alt=""/>
                    </Moritz>
                </div>
            </div>
        </div>
    )
}

const London = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    img {
        height: auto;
        width: 180px;
    }
`
const Dubai = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    img {
        height: 220px;
        width: auto;
    }
`
const Moritz = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    img {
        height: auto;
        width: 180px;
    }
`
const TextLondon = styled.div`
   margin: 10px 0 0 10px;
   font-size: 22px;
`
const TextDubai = styled.div`
   margin: 10px 0 0 10px;
   font-size: 22px;
`
const TextSt = styled.div`
   margin: 10px 0 0 10px;
   font-size: 22px;
`
const Hero = styled.div`
    background-image: url('${Img}');
    height: 30.8vh;
    width: 100%;
    background-size: contain;
    h1{
        margin: 0;
        padding: 0;
    }
`

export default home
