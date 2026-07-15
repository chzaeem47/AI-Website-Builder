import React, { useState } from "react";
import { FcBiotech } from "react-icons/fc";
import { IoIosArrowDown } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { LuLayoutGrid } from "react-icons/lu";
import { FiClock, FiSun, FiMoon } from "react-icons/fi";
import { BiDollar } from "react-icons/bi";
import { serverURL } from "../App.jsx";
import axios from "axios";
import { setUserData } from "../redux/userSlice.js";
import { toggleTheme } from "../redux/userSlice.js";

function HomeBodyHeader() {
  const { userData, darkMode } = useSelector((state) => state.user);
  const isLoggedIn = Boolean(userData?._id);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [dropdown, setDropdown] = useState(false);

  const logout = async () => {
    try {
      await axios.get(`${serverURL}/api/auth/logout`, {
        withCredentials: true,
      });

      dispatch(setUserData(null));
      setDropdown(false);
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  return (
    <div
      className={`
        absolute
        top-2 sm:top-3 md:top-4
        left-2 sm:left-[95px] md:left-[120px]
        right-2 sm:right-3 md:right-4
        bottom-2 sm:bottom-3 md:bottom-4
        rounded-[18px] sm:rounded-[24px] md:rounded-[28px]
        overflow-hidden
        bg-center
        bg-no-repeat
        bg-cover
        transition-all
        duration-300
        ${
          darkMode
            ? "bg-[#111827] bg-none shadow-[inset_0_0_50px_rgba(0,0,0,0.5)] border border-gray-800"
            : "bg-[url('/home-light-bg.jpeg')]"
        }
      `}
    >
      <div className="relative flex items-center justify-start sm:justify-between flex-wrap sm:flex-nowrap gap-2 px-2 sm:px-3 md:px-5 pt-2 sm:pt-3 md:pt-4">
        {/* Left model selector — hidden on small screens/tablets */}
        <button
          type="button"
          className={`
            hidden sm:flex
            items-center
            gap-1 sm:gap-2
            h-[34px] sm:h-[40px] md:h-[46px]
            px-2 sm:px-3 md:px-4
            rounded-xl
            backdrop-blur-md
            transition-all
            duration-300
            hover:-translate-y-0.5
            ${
              darkMode
                ? "bg-[#1e1e2e]/80 border border-gray-600 text-gray-200 shadow-[0_8px_22px_rgba(0,0,0,0.4)] hover:shadow-[0_10px_26px_rgba(0,0,0,0.5)]"
                : "bg-white/95 border border-white text-gray-900 shadow-[0_8px_22px_rgba(70,75,110,0.16)] hover:shadow-[0_10px_26px_rgba(70,75,110,0.22)]"
            }
          `}
        >
          <span className="text-[12px] sm:text-[15px] md:text-[20px] font-medium font-serif whitespace-nowrap">
            Quantum 3.5 Pro
          </span>
        </button>

        {/* Center title — hidden on small screens/tablets */}
        <h1
          className="
            hidden sm:block
            relative right-0
            text-lg sm:text-2xl md:text-3xl
            font-serif
            font-semibold
            text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-blue-600 to-purple-700
            whitespace-nowrap
          "
        >
          Quantum AI
        </h1>

        {/* Right side */}
        {!isLoggedIn ? (
          <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3">
            <Link
              to="/login"
              className={`
                h-[34px] sm:h-[40px] md:h-[46px]
                px-2.5 sm:px-4 md:px-5
                rounded-xl
                text-[13px] sm:text-[18px] md:text-[25px] font-serif
                font-medium
                flex
                items-center
                justify-center
                hover:scale-105
                transition-all
                duration-300
                ${
                  darkMode
                    ? "bg-purple-600 text-white shadow-[0_8px_20px_rgba(147,51,234,0.3)]"
                    : "bg-[#071426] text-white shadow-[0_8px_20px_rgba(7,20,38,0.24)]"
                }
              `}
            >
              Login
            </Link>

            <Link
              to="/signup"
              className={`
                h-[34px] sm:h-[40px] md:h-[46px]
                px-2.5 sm:px-4 md:px-5
                rounded-xl
                text-[13px] sm:text-[18px] md:text-[25px] font-serif
                font-medium
                flex
                items-center
                justify-center
                hover:scale-105
                transition-all
                duration-300
                ${
                  darkMode
                    ? "bg-[#1e1e2e] border border-gray-700 text-gray-200 shadow-[0_8px_20px_rgba(0,0,0,0.3)]"
                    : "bg-white border border-gray-200 text-gray-800 shadow-[0_8px_20px_rgba(70,75,110,0.14)]"
                }
              `}
            >
              SignUp
            </Link>
          </div>
        ) : (
          <div className="relative">
            <div className="p-[2px] rounded-2xl bg-gradient-to-r from-purple-600 via-violet-500 to-blue-500">
              <div
                className={`
                  min-w-[140px] sm:min-w-[190px] md:min-w-[245px]
                  h-12 sm:h-14 md:h-15
                  px-2 sm:px-3
                  rounded-xl
                  flex
                  items-center
                  gap-1.5 sm:gap-2 md:gap-3
                  transition-colors
                  duration-300
                  ${
                    darkMode
                      ? "bg-[#111827]/80 shadow-[0_8px_20px_rgba(0,0,0,0.4)]"
                      : "bg-white/50 shadow-[0_8px_20px_rgba(7,20,38,0.24)]"
                  }
                `}
              >
                {userData?.avatar ? (
                  <img
                    src={userData.avatar}
                    alt={userData.name || "User"}
                    className="
                      w-8 h-8 sm:w-10 sm:h-10 md:w-13 md:h-13 relative right-1
                      rounded-full
                      object-cover
                      border-2
                      border-white
                    "
                  />
                ) : (
                  <span className="inline-flex scale-[0.7] sm:scale-[0.85] md:scale-100">
                    <FaUserCircle size={36} className="text-white" />
                  </span>
                )}

                <div className="min-w-0">
                  <h2
                    className="text-[13px] sm:text-[17px] md:text-[21px] truncate font-serif text-transparent bg-clip-text
                    bg-gradient-to-r from-blue-600 via-purple-600 to-pink-700
                    font-semibold"
                  >
                    {userData?.name}
                  </h2>

                  <p
                    className={`text-[10px] sm:text-[12px] md:text-[14px] font-sans relative bottom-1 ${
                      darkMode ? "text-gray-300" : "text-black"
                    }`}
                  >
                    Credits: {userData?.credits}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setDropdown(!dropdown)}
                  className="ml-auto"
                >
                  <span className="inline-flex scale-[0.75] sm:scale-[0.9] md:scale-100">
                    <IoIosArrowDown
                      size={24}
                      className={`text-purple-700 transition-transform duration-300 ${
                        dropdown ? "rotate-180" : ""
                      }`}
                    />
                  </span>
                </button>
              </div>
            </div>

            {dropdown && (
              <div
                className={`
                  absolute
                  right-0
                  top-[54px] sm:top-[62px] md:top-[68px]
                  w-[120px] sm:w-[135px] md:w-[150px]
                  p-1.5 sm:p-2
                  rounded-xl
                  z-50
                  transition-all
                  duration-300
                  ${
                    darkMode
                      ? "bg-[#1e1e2e] border border-gray-700 shadow-[0_8px_20px_rgba(0,0,0,0.5)]"
                      : "bg-white border border-purple-200 shadow-[0_8px_20px_rgba(7,20,38,0.18)]"
                  }
                `}
              >
                <button
                  type="button"
                  onClick={logout}
                  className="
                    w-full
                    px-3 sm:px-4
                    py-1.5 sm:py-2
                    rounded-lg
                    text-[14px] sm:text-[17px]
                    font-serif
                    text-white
                    bg-red-600
                    hover:scale-[1.02]
                    transition-all
                    duration-300
                  "
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}

        {/* Relocated icons for small screens: History, Pricing, Theme toggle */}
        <div className="flex sm:hidden items-center gap-1.5">
          <button
            type="button"
            aria-label="History"
            title="History"
            onClick={() => navigate("/dashboard")}
            className={`w-[34px] h-[34px] rounded-full flex items-center justify-center text-[15px] border transition-all duration-300 ${
              darkMode
                ? "bg-[#1e1e2e]/95 text-gray-300 border-gray-700"
                : "bg-white/95 text-gray-800 border-white"
            }`}
          >
            <FiClock />
          </button>

          <button
            type="button"
            aria-label="Pricing"
            title="Pricing"
            onClick={() => navigate("/pricing")}
            className={`w-[34px] h-[34px] rounded-full flex items-center justify-center text-[15px] border transition-all duration-300 ${
              darkMode
                ? "bg-[#1e1e2e]/95 text-gray-300 border-gray-700"
                : "bg-white/95 text-gray-800 border-white"
            }`}
          >
            <BiDollar />
          </button>

          <button
            type="button"
            aria-label="Toggle Theme"
            title="Toggle Theme"
            onClick={() => dispatch(toggleTheme())}
            className={`w-[34px] h-[34px] rounded-full flex items-center justify-center text-[15px] border transition-all duration-300 ${
              darkMode
                ? "bg-[#1e1e2e]/95 text-gray-300 border-gray-700"
                : "bg-white/95 text-gray-800 border-white"
            }`}
          >
            {darkMode ? <FiMoon /> : <FiSun />}
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomeBodyHeader;