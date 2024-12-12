import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [quotes, setQuotes] = useState([]);
  const [currentQuote, setCurrentQuote] = useState(null);

  // Fetch quotes on component mount
  useEffect(() => {
    fetch('https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json')
      .then(response => response.json())
      .then(data => {
        setQuotes(data.quotes);
        setCurrentQuote(data.quotes[Math.floor(Math.random() * data.quotes.length)]); // Set a random quote initially
      })
      .catch(error => {
        console.error('Error fetching quotes:', error);
      });
  }, []);

  // Function to fetch a new random quote
  const getNewQuote = () => {
    if (quotes.length > 0) {
      const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
      setCurrentQuote(randomQuote);
    }
  };

  return (
    <div className="App">
      <div id="quote-box">
        {currentQuote && (
          <>
            <p id="text">{`"${currentQuote.quote}"`}</p>
            <p id="author">- {currentQuote.author}</p>
          </>
        )}
        <button id="new-quote" onClick={getNewQuote} >
          New Quote
        </button>
        <a
          id="tweet-quote"
          href={`https://twitter.com/intent/tweet?text="${currentQuote?.quote}" - ${currentQuote?.author}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: 'block', marginTop: '15px', color: '#1DA1F2', textDecoration: 'none', fontSize: '1rem' }}
        >
          Tweet this Quote
        </a>
      </div>
    </div>
  );
}

export default App;
