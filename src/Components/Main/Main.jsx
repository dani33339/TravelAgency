import React, {useEffect} from 'react'
import './main.css'
import {HiOutlineLocationMarker} from 'react-icons/hi'
import {HiClipboardList} from 'react-icons/hi'
import barcelona from '../../Assets/barcelona.jpg'
import berlin from '../../Assets/berlin.jpg'
import toronto from '../../Assets/toronto.jpg'
import craimea from '../../Assets/craimea.jpg'
import moscow from '../../Assets/moscow.jpg'
import paris from '../../Assets/paris.jpg'
import prague from '../../Assets/prague.jpg'
import tokyo from '../../Assets/tokyo.jpg'
import newyork from '../../Assets/newyork.jpg'
import Aos from 'aos'
import 'aos/dist/aos.css'



const Data = [
  {
  id:1,
  imgSrc: barcelona,
  destTitle: 'Barcelona',
  location: 'Spain',
  grade: 'CULTURAL RELAX ',
  fees: 'From $700',
  description: 'Perfect beaches, world-famous tapas, and Gaudí—the Catalan capital is a Mediterranean dream.' 
  },


  {
  id:2,
  imgSrc: berlin,
  destTitle: 'Berlin',
  location: 'Germany',
  grade: 'HISTORY GRAFFITI ',
  fees: 'From $700',
  description: 'Berlin is an edgy city, from its fashion to its architecture to its charged political history. The Berlin Wall is a sobering reminder of the hyper-charged postwar atmosphere, and yet the graffiti art.' 
  },


  {
  id:3,
  imgSrc: toronto,
  destTitle: 'Toronto',
  location: 'Canda',
  grade: 'SHOPING THEATER ',
  fees: 'From $700',
  description: "We've heard Toronto described as New York City run by the Swiss, and it's true—you can find world-class theater, shopping and restaurants here, but the sidewalks are clean and the people are friendly. The best place to start is literally at the top—the CN Tower, the tallest freestanding structure in the Western Hemisphere."  
  },


  {
  id:4,
  imgSrc: craimea,
  destTitle: 'Cappadocia',
  location: 'Turkey ',
  grade: 'CULTURAL RELAX ',
  fees: '$800',
  description: '  According to the World Tourism Ranking, 45 Million people visit Turkey each year, and from that about 2 Million come to visit Cappadocia. This place is known for its luxurious stays and adventurous activities '  
  },


  {
  id:5,
  imgSrc: moscow,
  destTitle: 'Guanajuato',
  location: 'Mexico',
  grade: 'CULTURAL RELAX ',
  fees: '$1100',
  description: 'A city in central Mexico, Guanajuato is known for its history of silver mining and colonial architecture. The houses in the city are very attractively painted with the most bright colors available. Always welcome.'  
  },


  {
  id:6,
  imgSrc: paris,
  destTitle: 'Cinque Terre',
  location: 'Italy ',
  grade: 'CULTURAL RELAX ',
  fees: '$840',
  description: 'The vibrant hues of the houses are its benchmark and explain the beauty of this place. Also, if you are a foodie and love seafood, you will be exhilarated with the choice you are about to get here. Happy exploring great food! '  
  },


  {
  id:7,
  imgSrc: prague,
  destTitle: 'Angkor Wat',
  location: 'Cambodia',
  grade: 'CULTURAL RELAX ',
  fees: '$790',
  description: 'Angkot wat represents the entire range of Khmer art from the 9th to the 15th century. This temple is considered the heart and soul of Cambodia. This place is known for its luxurious stays and adventurous activities'  
  },


  {
  id:8,
  imgSrc: tokyo,
  destTitle: 'Taj Mahal',
  location: 'India',
  grade: 'CULTURAL RELAX ',
  fees: '$900',
  description: 'An immense mausoleum of white marble, built-in Agra by Mughal emperor Shah Jahan in memory of his wife Mumtaz, the monument is breathtakingly beautiful. This place is known for its luxurious stays and adventurous activities' 
  },


  {
  id:9,
  imgSrc: newyork,
  destTitle: 'Bali Island',
  location: 'Indonesia',
  grade: 'CULTURAL RELAX ',
  fees: '$500',
  description: 'Bali is an Indonesian Island and one of the best holiday destinations in the Indonesian archipelago. Bali is known for its volcanic mountains, history, art & culture, food, temples and beautiful sandy beaches.' 
  },
]

const Main = () => {
  useEffect(()=>{
    Aos.init({duration: 4000})
 }, [])
  return (
    <section id='main' className='main section container'>
      <div className="secTitle">
        <h3 className="title">
          Most visited destinations
        </h3>
      </div>

      <div className="secContent grid">
        {
          Data.map(({id, imgSrc, destTitle, location, grade, fees, description})=>{
            return (
              
              <div key={id} data-aos="fade-up" className="singleDestination">
      
                 <div className="imageDiv">
                 <img src={imgSrc} alt="" />
                 </div>
      
                <div className="cardInfo">
                 <h4 className="destTitle">{destTitle}</h4>
                 <span className="continent flex">
                    <HiOutlineLocationMarker className="icon"/>
                    <span className="name">{location}</span>
                 </span>
      
                 <div className="fees flex">
                    <div className="grade">
                      <span>{grade}<small> </small> </span>
                    </div>
                    <div className="price">
                      <h5>{fees}</h5>
                    </div>
                 </div>
      
                 <div className="desc">
                  <p>{description}</p>
                 </div>
      
                 <button className='btn flex'>DETAILS <HiClipboardList className="icon"/> </button>
                </div>
              </div>
      
            )
          }) 
        }
      </div>
     
    </section>
  )
}

export default Main