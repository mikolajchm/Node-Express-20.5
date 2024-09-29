import React, { useEffect, useState } from 'react';
import { Alert, Container } from 'reactstrap';
import { API_URL } from '../../../config';

const Prices = () => {
  const [dayOne, setDayOne] = useState([]); 
  const [dayTwo, setDayTwo] = useState([]); 
  const [dayThree, setDayThree] = useState([]); 

  useEffect(() => {
    const fetchConcerts = async () => {
      try {
        const response = await fetch(`${API_URL}/concerts`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Concerts data:', data);

    
        setDayOne(data.filter(concert => concert.day === 1));
        setDayTwo(data.filter(concert => concert.day === 2));
        setDayThree(data.filter(concert => concert.day === 3));
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

      <h2>Day One</h2>
      {dayOne.length > 0 ? (
        dayOne.map(concert => (
          <div key={concert._id}>
            <p>Performer: {concert.performer}</p>
            <p>Genre: {concert.genre}</p>
            <p>Price: {concert.price}$</p>
          </div>
        ))
      ) : (
        <p>No concerts available for Day One.</p>
      )}

      <h2>Day Two</h2>
      {dayTwo.length > 0 ? (
        dayTwo.map(concert => (
          <div key={concert._id}>
            <p>Performer: {concert.performer}</p>
            <p>Genre: {concert.genre}</p>
            <p>Price: {concert.price}$</p>
          </div>
        ))
      ) : (
        <p>No concerts available for Day Two.</p>
      )}

      <h2>Day Three</h2>
      {dayThree.length > 0 ? (
        dayThree.map(concert => (
          <div key={concert._id}>
            <p>Performer: {concert.performer}</p>
            <p>Genre: {concert.genre}</p>
            <p>Price: {concert.price}$</p>
          </div>
        ))
      ) : (
        <p>No concerts available for Day Three.</p>
      )}
    </Container>
  );
};

export default Prices;