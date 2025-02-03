import '@src/Popup.css';
import { useStorage, withErrorBoundary, withSuspense } from '@extension/shared';
import { exampleThemeStorage } from '@extension/storage';
import { useEffect, useState } from 'react';

const Popup = () => {
  const theme = useStorage(exampleThemeStorage);
  const isLight = theme === 'light';

  const [timeLeft, setTimeLeft] = useState(30 * 60); // Initial time in seconds (30 minutes)
  const [isTimerRunning, setIsTimerRunning] = useState(false); // Track if the timer is running

  // Start the timer when the button is clicked
  const startTimer = () => {
    setIsTimerRunning(true);
  };

  // Timer logic
  useEffect(() => {
    if (!isTimerRunning) return;

    const timerId = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timerId);
          setIsTimerRunning(false);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timerId); // Cleanup interval on component unmount or timer stop
  }, [isTimerRunning]);

  // Format timeLeft into MM:SS
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <div
      className={`App ${isLight ? 'bg-gradient-to-br from-blue-100 to-blue-300' : 'bg-gradient-to-br from-gray-800 to-gray-900'
        } min-h-screen flex flex-col items-center`}
    >
      {/* Header Bar */}
      <header
        className={`w-full py-6 px-6 ${isLight ? ' text-white' : 'bg-gray-700 text-gray-100'
          }  flex justify-center items-center rounded-b-2xl`}
      >
        <img
          src="QHacks-Logo (1).png"
          alt="Header Logo"
          className="h-20 w-120"
        />
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center w-full">
        <div className="w-full max-w-sm p-8 bg-white rounded-2xl shadow-xl">
          {isTimerRunning ? (
            // Timer Display
            <div className="text-center">
              <h2 className="text-blue-700 text-lg font-bold mb-4">Time Left</h2>
              <p className="text-4xl font-bold text-gray-800">{formatTime(timeLeft)}</p>
            </div>
          ) : (
            // Input and Button
            <>
              <label
                className="block text-blue-700 text-lg font-bold mb-4 text-center"
                htmlFor="unique-input"
              >
                Enter Prompt
              </label>
              <textarea
                className="text-base w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm bg-gray-100 h-36 resize-none focus:outline-none focus:ring-4 focus:ring-blue-300 focus:border-transparent"
                placeholder="Type your prompt here..."
                id="unique-input"
              />
              <div className="flex justify-center mt-6">
                <button
                  id="enterButton"
                  onClick={startTimer}
                  className="cursor-pointer group relative flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-full hover:scale-105 transition-transform duration-300 font-bold text-base shadow-lg"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    height="20px"
                    width="20px"
                  >
                    <path
                      stroke-linejoin="round"
                      stroke-linecap="round"
                      stroke-width="2"
                      stroke="#ffffff"
                      d="M6 21H18M12 3V17M12 17L17 12M12 17L7 12"
                    ></path>
                  </svg>
                  Enter Prompt
                </button>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default withErrorBoundary(withSuspense(Popup, <div> Loading ... </div>), <div> Error Occur </div>);
