import { useNavigate } from "react-router-dom";
const Navbar = ({whenPress}) => {
    const navigate = useNavigate();
    return (
        <nav className="navbar w-full flex flex-row items-center justify-between bg-[#E0EDFD] relative h-[8vh]">
            <h2 className="m-[20px] text-[#1F2E43] text-[30px] font-extrabold">Swiftie Society</h2>
            <button className="logout-btn m-[20px] bg-[#1F2E43] text-[#E0EDFD] border-none rounded-[5px] text-[1rem] font-bold px-[24px] py-[12px]" onClick={() => whenPress()}>Login</button>
        </nav>
    );
};

export default Navbar;
