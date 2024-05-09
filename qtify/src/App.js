import React from 'react'
import Navbar from './components/Navbar/Navbar.jsx'
import Hero from './components/Hero/Hero.jsx'
import styles from './App.module.css'
import { useEffect, useState } from 'react'
import { fetchTopAlbums, fetchNewAlbums, fetchSongs } from './api/api'
import Section from './components/Section/Section.jsx'
import FilterSection from './components/FilterSection/FilterSection.jsx'

function App() {

  const [topAlbumSongs, setTopAlbumSongs] = useState([]);
  const [newAlbumSongs, setNewAlbumSongs] = useState([]);
  
  //state to store  original array of songs(unfiltered)
  const[songsData, setSongsData]=useState([]);

  //to store the index selected inn filters, can be ignored
  const[value,setValue]= useState(0);
 
  //to store the finally filtered songs
  const[filteredData, setFilteredData]=useState([]);

  const generateTopAlbumSongs = async () => {
    try {
      const topAlbumSongs = await fetchTopAlbums()
      setTopAlbumSongs(topAlbumSongs)
    }
    catch (error) {
      console.log(error)
      return null
    }

  }
  const generateNewAlbumSongs = async () => {
    try {
      const newAlbumSongs = await fetchNewAlbums()
      setNewAlbumSongs(newAlbumSongs);
    }
    catch (error) {
      console.log(error)
      return null
    }
  }

  const generateSongs = async() => {
    try {
      console.log("generateSongs");
      const res=await fetchSongs();
      setSongsData(res);
      setFilteredData(res);
    }
    catch(error) {
      return null;
    }
  }

  //function to generate filtered songs after selecting one tab
  const generateNewSongs=(index)=>{

    let key="";
    if(index===0){
      // suppose someOne select 0th tab after 2nd tab 
      //set the default songsData as the final filtered data, bcz we need to show all of songs now
      generateSongs();
      return;
    }
    else if(index===1){
      key="rock";
    }
    else if(index===2){
      key="pop";
    }

    else if(index===3){
      key="jazz";
    }
    else if(index===4){
      key="blues";
    }

    let newSongsArray=songsData.filter((song)=>{
      console.log("key: ",key)
      return(song.genre.key===key);
    })

    console.log("generateNewSongs triggered and filtered this Data: ", newSongsArray)
    setFilteredData(newSongsArray);
  }
  //rock pop jazz blues
  //to handle any change in the selected tab of the songs section and call the generateNewSongs
  const handleChangeIndex= async(newValue)=>{
    console.log("handleChangeIndex triggered with newValue: ",newValue)
    setValue(newValue);
    generateNewSongs(newValue);
  }

    useEffect(() => {
      
      generateTopAlbumSongs();
      generateNewAlbumSongs();
      generateSongs();
    }, [])
    
  
  return (
    <>
      <Navbar />
      <Hero />
      <div className={styles.sectionWrapper}>
        <Section type='album' title='Top Albums' data={topAlbumSongs} />
        <Section type='album' title='New Albums' data={newAlbumSongs} />
        <FilterSection  type='song' title='Songs' value={value} filteredData={filteredData} handleChangeIndex={handleChangeIndex}/>

      </div>
    </>
  )
}

export default App