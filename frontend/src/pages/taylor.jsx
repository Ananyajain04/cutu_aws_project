import Navbar from '../components/navbar';
import Footer from "../components/footer";
import { useEffect, useState } from 'react';
import { themes } from '../assets/themes';
import GamePage from './gamepage.jsx';
import AlbumPage from './albumpage.jsx';
import QuizPage from '../components/quizPage.jsx';
function Taylor() {
  // this page re-directs to other pages so we're gonna have a theme setting here
  const [theme,setTheme]=useState(themes.Midnights);
  const [openHome,setOpenHome]=useState(true);
  const [openAlbums,setOpenAlbum]=useState(false);
  const [openGame,setOpenGame]=useState(false);
  const [openQuiz,setOpenQuiz]=useState(false);
  return (
    <> {openHome &&
      <div id="about-taylor" className={`h-[100vh] bg-[url('${theme.bg_url}')] bg-cover bg-center bg-no-repeat overflow-hidden`} style={{ backgroundImage: `url(${theme.bg_url})` }}>
      <Navbar theme={theme} selectTheme={setTheme} setOpenAlbum={setOpenAlbum} setOpenGame={setOpenGame} setOpenHome={setOpenHome} setOpenQuiz={setOpenQuiz}/>
      <div className="flex-container flex h-[86vh] items-center justify-center">
        <img className="rounded-[50%] w-[30vw] h-[30vw] ml-[25px]"src="https://www.billboard.com/wp-content/uploads/2023/11/DO-NOT-USE-BBMA-2023-Taylor-Swift-2023-billboard-music-awards-acceptance-billboard-1548.jpg?w=1024" alt=""/>
        
        <div className="taylor-info p-[20px] bg-white rounded-[8px] shadow-[0_2px_10px_rgba(0,0,0,0.1)] m-5">
          <div>
            <p className="taylor-title text-[2em] text-[#333] mb-[10px] font-extrabold">It's me! Hi! I'm the problem, it's me!</p>
            <p className="taylor-description text-[1.1em] leading-[1.6] text-[#555]">
            Taylor Swift isn't just a singer-songwriter—she's a storyteller, a visionary, and an artist who has shaped an entire generation with her music. From her country roots to her pop anthems and indie masterpieces, she's constantly reinvented herself while staying true to her emotions and experiences. Every album feels like a new chapter, and every song feels like a page from a diary we all relate to. With countless Grammy wins and record-breaking achievements, she’s more than an icon—she’s a force. But beyond the awards and accolades, it's her ability to connect with us, to make us feel seen and understood, that makes her truly legendary.


            </p>
            <ul className="taylor-details list-none p-0">
              <li className="px-[5px] text-[1.1em] text-[#444]"><strong>Born:</strong> December 13, 1989</li>
              <li className="px-[5px] text-[1.1em] text-[#444]"><strong>Genres:</strong> Pop, Country, Indie</li>
              <li className="px-[5px] text-[1.1em] text-[#444]"><strong>Achievements:</strong> Over 200 million records sold worldwide, numerous Billboard chart records, and a dedicated fanbase known as "Swifties".</li>
            </ul>
          </div>
        </div>
      </div>
      <Footer theme={theme}/>
    </div>
    }
    {openAlbums &&
    <>
    <Navbar theme={theme} selectTheme={setTheme} setOpenAlbum={setOpenAlbum} setOpenGame={setOpenGame} setOpenHome={setOpenHome} setOpenQuiz={setOpenQuiz}/>
    <AlbumPage theme={theme}/>
    </>
    }
    {openGame &&
    <>
   <Navbar theme={theme} selectTheme={setTheme} setOpenAlbum={setOpenAlbum} setOpenGame={setOpenGame} setOpenHome={setOpenHome} setOpenQuiz={setOpenQuiz}/>
    <GamePage theme={theme}/>
    </>
    }
    {openQuiz &&
    <>
    <Navbar theme={theme} selectTheme={setTheme} setOpenAlbum={setOpenAlbum} setOpenGame={setOpenGame} setOpenHome={setOpenHome} setOpenQuiz={setOpenQuiz}/>
    <QuizPage theme={theme}/>
    </>}
    </>
    
  );
};

export default Taylor;