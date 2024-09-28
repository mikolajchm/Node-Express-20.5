import React, { useEffect } from 'react';
import { Alert, Container } from 'reactstrap';
import { API_URL } from '../../../config';

const Prices = () => {

  useEffect(() => {

    const fetchConcerts = async () => {
      try {
        const response = await fetch(`${API_URL}/concerts`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json(); 
        console.log('data',data);
      } catch (error) {
        console.error('Error fetching concerts:', error);
      }
    };

    fetchConcerts();
  }, []);

  
  return (
    <Container>
    <h1>Prices</h1>
    <p>Prices may differ according the day of the festival. Remember that ticket includes not only the star performance, but also 10+ workshops. We gathered several genre teachers to help you increase your vocal skills, as well as self confidence.</p>
    
    <Alert color="info">
        Attention! <strong>Children under 4 can go freely with you without any other fee!</strong>
    </Alert>

    <h2>Day one</h2>
    <p>Price: 25$</p>
    <p>Workshops: "Rock Music Style", "How to make you voice grooowl", "Make your voice stronger", "History of Rock"</p>
    <h2>Day Two</h2>
    <p>Price: 25$</p>
    <p>Workshops: "Find your real tune", "Find your real YOU", "Fell the music", "Jam session"</p>
    <h2>Day three</h2>
    <p>Price: 50$</p>
    <p>Workshops: "Increase your vocal range", "How to properly warmup before singing", "It's time for YOU!"</p>
  </Container>
  );
};

export default Prices;