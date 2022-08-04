import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.min.css';
import 'owl.carousel/dist/assets/owl.theme.default.min.css';
import d1 from '../assets/images/d1.jpg';
import d2 from '../assets/images/d2.jpg';
import d3 from '../assets/images/d3.jpg';
import d4 from '../assets/images/d4.jpg';
import d5 from '../assets/images/d5.jpg';

const Home=() => {

    
    return (
    <div>
    <h1>Artgoblin</h1>
    <OwlCarousel 
    className='owl-theme'
    items="1"
    autoplay
    dots
    loop
    >
      <div className='item' >
        <img src={d1} style={{height:'100vh',width:'98vw'}}/>
      </div>
      <div className='item'>
        <img src={d2} style={{height:'100vh',width:'98vw'}}/>
      </div>
      <div className='item'>
        <img src={d3} style={{height:'100vh',width:'98vw'}}/>
      </div>
      <div className='item'>
        <img src={d4} style={{height:'100vh',width:'98vw'}}/>
      </div>
      <div className='item'>
        <img src={d5} style={{height:'100vh',width:'98vw'}}/>
      </div>

   


    </OwlCarousel>


  
</div> 
    
    )

  }

  export default Home;