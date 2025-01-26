

import '@src/Popup.css';
import { useStorage, withErrorBoundary, withSuspense } from '@extension/shared';
import { exampleThemeStorage } from '@extension/storage';
import { useState, type ComponentPropsWithoutRef } from 'react';
import PopupModal from './PopupModal';



const Popup = () => {
  const theme = useStorage(exampleThemeStorage);
  const isLight = theme === 'light';
  console.log('Awaiting?');


  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [popupContent, setPopupContent] = useState('');

  // Function to handle showing the popup
  const showPopup = (content: string) => {
    setPopupContent(content);
    setIsPopupVisible(true);
  };

  // Function to handle hiding the popup
  const hidePopup = () => {
    setIsPopupVisible(false);
  };


  return (
    <div
      className={`App ${isLight ? 'bg-gradient-to-br from-blue-100 to-blue-300' : 'bg-gradient-to-br from-gray-800 to-gray-900'
        } min-h-screen flex flex-col items-center`}
    >
      {/* Header Bar */}
      <header
        className={`w-full py-6 px-6 ${isLight ? 'bg-blue-700 text-white' : 'bg-gray-700 text-gray-100'
          } shadow-lg flex justify-center items-center rounded-b-2xl`}
      >
        <img
          src="pages/popup/public/QHacks-Logo.png"
          alt="Header Logo"
          className="h-auto w-auto"
        />
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center w-full">
        <div className="w-full max-w-sm p-8 bg-white rounded-2xl shadow-xl">
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
        </div>
      </main>
       {/* Popup Modal */}
       {isPopupVisible && (
        <PopupModal
          content={popupContent}
          onClose={hidePopup}
        />
      )}
    </div>
    

  );
};



// const ToggleButton = (props: ComponentPropsWithoutRef<'button'>) => {
//   const theme = useStorage(exampleThemeStorage);
//   return (
//     <button
//       className={
//         props.className +
//         ' ' +
//         'font-bold mt-4 py-1 px-4 rounded shadow hover:scale-105 ' +
//         (theme === 'light' ? 'bg-white text-black shadow-black' : 'bg-black text-white')
//       }
//       onClick={exampleThemeStorage.toggle}>
//       {props.children}
//     </button>
//   );
// };

export default withErrorBoundary(withSuspense(Popup, <div> Loading ... </div>), <div> Error Occur </div>);
