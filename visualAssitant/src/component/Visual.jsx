import React, { useState, useEffect } from 'react';
import './Visual.css'; // Import your CSS styles here
import YouTube from 'react-youtube';

function Visual() {
  const [specialDivPosition, setSpecialDivPosition] = useState({ top: 0, left: 0 });
  const [specialVideoId, setSpecialVideoId] = useState('lztk0SWApAw'); // Set the initial default YouTube video ID
  const originalVideoId = 'lztk0SWApAw'; // Store the original video ID

  // Function to move the special div below the clicked div and set the video URL
  const handleDivClick = (divId) => {
    // Set the YouTube video ID based on the divId
    switch (divId) {
      case 'div1':
        setSpecialVideoId('dQw4w9WgXcQ');
        break;
      case 'div2':
        setSpecialVideoId('JGwWNGJdvx8');
        break;
      case 'div3':
        setSpecialVideoId('LFBZkWA4dTE');
        break;
      default:
        setSpecialVideoId(originalVideoId); // Set the default YouTube video ID if no div is clicked
        break;
    }

    // Move the special div below the clicked div
    const clickedDiv = document.querySelector(`.${divId}`);
    if (clickedDiv) {
      const clickedDivRect = clickedDiv.getBoundingClientRect();

      // Calculate the new position for the special div below the clicked div
      const newPosition = {
        top: clickedDivRect.bottom + 10, // Adjust the spacing as needed
        left: clickedDivRect.left,
      };

      setSpecialDivPosition(newPosition);
    }
  };

  // Function to handle clicks outside of "my div" elements
  const handleOutsideClick = (e) => {
    const isMyDivClick = Array.from(document.querySelectorAll('.my-div')).some((myDiv) =>
      myDiv.contains(e.target)
    );

    if (!isMyDivClick) {
      // Reset specialDivPosition to its original position and use the original video
      setSpecialDivPosition({ top: 0, left: 0 });
      setSpecialVideoId(originalVideoId);
    }
  };

  // Add a click event listener to the document to handle clicks outside of "my div"
  useEffect(() => {
    document.addEventListener('click', handleOutsideClick);

    return () => {
      // Remove the event listener when the component unmounts
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  return (
    <div className="App">
      {/* Div 1 */}
      <div className="my-div div1" onClick={() => handleDivClick('div1')}>
        learn
      </div>

      {/* Div 2 */}
      <div className="my-div div2" onClick={() => handleDivClick('div2')}>
        read
      </div>

      {/* Div 3 */}
      <div className="my-div div3" onClick={() => handleDivClick('div3')}>
        write
      </div>

      {/* Special Div */}
      <div className="special-div" style={{ top: specialDivPosition.top, left: specialDivPosition.left }}>
        <YouTube
          videoId={specialVideoId}
          opts={{ width: '640', height: '360' }}
        />
      </div>
    </div>
  );
}

export default Visual;
