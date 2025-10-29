import { useNavigate } from "react-router-dom";
import "./App.css";
import Homenav from "./components/homenav";
import { useEffect, useState } from "react";
import LoginModal from "./components/loginModal";
import SignUpModal from "./components/SignUpModal";
import { getToken } from "./services/authService"; // 👈 add this import

function App() {
  const navigate = useNavigate();
  const [openLoginModal, setLoginModal] = useState(false);
  const [openSignUpModal, setSignUpModal] = useState(false);
  const [openHome, setOpenHome] = useState(false);

  // ✅ if token exists, auto redirect to /home
  useEffect(() => {
    const token = getToken();
    if (token) {
      navigate("/home");
    }
  }, []);

  // ✅ handle redirect once login/signup successful
  useEffect(() => {
    if (openHome === true) {
      navigate("/home");
    }
  }, [openHome, navigate]);

  return (
    <div className="overflow-hidden relative">
      <div>
        {/* Navigation bar */}
        <Homenav
          whenPress={() => {
            setLoginModal(true);
            setSignUpModal(false);
          }}
        />

        {/* Landing section */}
        <div className="landing-container bg-[url('./bg.svg')] relative w-[100vw] h-[92vh] bg-no-repeat flex items-center justify-start pl-[10vw] text-[#E0EDFD] overflow-hidden overflow-x-hidden bg-cover bg-center z-0">
          <div className="flex flex-col gap-[20px] content max-w-[600px] text-left text-[#E0EDFD] text-[1.4rem]">
            <h1 className="font-bold">Join the Swiftie Community</h1>
            <p className="text-[#c9d9f2] text-[1.3rem] leading-[1.5] opacity-90">
              A place for fans to celebrate Taylor Swift's music, decode her
              lyrics, and connect with fellow Swifties. Are you ready to begin?
            </p>

            <img
              src="https://myawsproject-assets.s3.eu-north-1.amazonaws.com/image-Photoroom.png"
              alt=""
              className="absolute top-1/2 -right-[22vw] translate-y-[-50%] w-[100vw] h-[99vh]"
            />

            <div>
              <button
                onClick={() => {
                  setSignUpModal(true);
                  setLoginModal(false);
                }}
                className="bg-[#E0EDFD] text-[#1F2E43] border-none text-[1rem] font-bold rounded-[5px] px-[24px] py-[12px] hover:bg-[#c9d9f2] cursor-pointer transition duration-300"
              >
                Join Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ✅ Modals */}
      {openSignUpModal && (
        <SignUpModal
          onClose={() => setSignUpModal(false)}
          onLoginClick={() => {
            setSignUpModal(false);
            setLoginModal(true);
          }}
          onSuccess={() => setOpenHome(true)} // redirect on success
        />
      )}

      {openLoginModal && (
        <LoginModal
          onClose={() => setLoginModal(false)}
          onSignUpClick={() => {
            setLoginModal(false);
            setSignUpModal(true);
          }}
          onSuccess={() => setOpenHome(true)} // redirect on success
        />
      )}
    </div>
  );
}

export default App;
