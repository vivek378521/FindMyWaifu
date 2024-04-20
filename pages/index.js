// HomePage.js
import Link from 'next/link';

const HomePage = () => {
    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1 style={{ fontSize: '3rem', marginBottom: '30px', fontFamily: 'Arial, sans-serif' }}>Find My Waifu</h1>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '50px' }}>
                <img src="https://i.postimg.cc/Pxjxhb1P/ok1.jpg" alt="Waifu 1" style={{ width: '200px', height: '300px', marginRight: '20px', borderRadius: '10px' }} />
                <img src="https://i.postimg.cc/VLB2HqkK/ok2.jpg" alt="Waifu 2" style={{ width: '200px', height: '300px', marginRight: '20px', borderRadius: '10px' }} />
                <img src="https://i.postimg.cc/kXpWCZGG/ok3.png" alt="Waifu 3" style={{ width: '200px', height: '300px', borderRadius: '10px' }} />
            </div>
            <Link href="/search">
                <button style={{
                    padding: '15px 30px',
                    fontSize: '1.5rem',
                    backgroundColor: '#ff6b6b',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '30px',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s ease, transform 0.3s ease', // Added transform transition
                    position: 'relative',
                    overflow: 'hidden', // Added overflow hidden to prevent the button from resizing during hover
                    zIndex: '1', // Added zIndex to ensure the button stays on top of the SVG
                }}
                    onMouseEnter={(e) => { e.target.style.transform = 'scale(1.1)'; }} // Increase size on hover
                    onMouseLeave={(e) => { e.target.style.transform = 'scale(1)'; }} // Reset size on hover out
                >
                    Start
                </button>
            </Link>
        </div>
    );
};

export default HomePage;
