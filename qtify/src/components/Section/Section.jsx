import React, { useState } from 'react'
import { CircularProgress } from '@mui/material';
import Card from "../Card/Card";
import styles from "./Section.module.css"
import Carousel from '../Carousel/Carousel';

const Section=({type,title,data,toggle=true})=> {

    const[carouselToggle,setCarouselToggle]=useState(true);

    const handleToggle=()=>{
        setCarouselToggle(!carouselToggle);
    }

  return (
    <div>
        <div className={styles.sectionTop}>
            <h3>{title}</h3>
            <h4 onClick={handleToggle} className={styles.toggleText}>

            {toggle?(
                 carouselToggle?"Show All":"Collapse All"
            ):(
                <></>
            )}
            </h4>
        </div>
        
        {data.length?(
            <div className={styles.sectionInnerWrapper}>
            {!carouselToggle?(
                <div className={styles.showAllWrapper}>
                {data.map((album)=>(
                    <Card data={album} type={type} key={album.id}/>
                ))}
                </div>
            ):(
              <div>
              <Carousel data={data} renderCardComponent={(data)=><Card data={data} type={type}/>}/>
              </div>  
            )}
            </div>
        ):(
            <div className={styles.progressBar}>
            <CircularProgress />
            </div>
        )}

    </div>
  )
}

export default Section;

