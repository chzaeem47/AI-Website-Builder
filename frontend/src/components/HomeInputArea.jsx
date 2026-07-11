import React, { useEffect, useRef, useState } from "react";
import {
  FiSend,
  FiCode,
  FiHeart,
  FiBriefcase,
  FiSearch,
} from "react-icons/fi";
import { LuCookingPot } from "react-icons/lu";
import axios from 'axios'
import {serverURL} from '../App.jsx'
import { FaFileCode } from "react-icons/fa";


function HomeInputArea() {
  const [prompt, setPrompt] = useState("");
  const textareaRef = useRef(null);

  const handleGenerateWebsite = async()=>{
    try {
      const result = await axios.post(`${serverURL}/api/website/generate`,{
        prompt
      },{withCredentials:true})
      console.log(result)
    } catch (error) {
      console.log(error)
    }
  }

  const categories = [
    {
      id: 1,
      name: "Coding",
      icon: <FiCode />,
    },
    {
      id: 2,
      name: "Cooking",
      icon: <LuCookingPot />,
    },
    {
      id: 3,
      name: "Health",
      icon: <FiHeart />,
    },
    {
      id: 4,
      name: "Trips",
      icon: <FiBriefcase />,
    },
    {
      id: 5,
      name: "Troubleshoot",
      icon: <FiSearch />,
    },
  ];

  useEffect(() => {
    const textarea = textareaRef.current;

    if (!textarea) return;

    textarea.style.height = "auto";
    textarea.style.height = `${Math.min(textarea.scrollHeight, 150)}px`;
  }, [prompt]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!prompt.trim()) return;

    console.log(prompt);
    setPrompt("");
  };

  const handleCategoryClick = (category) => {
    setPrompt(`${category}: `);
    textareaRef.current?.focus();
  };

  return (
    <div
      className="
        absolute
        bottom-8
        left-[120px]
        right-4
        flex
        justify-center
        px-6
      "
    >
      <div className="w-full max-w-[850px]">
        {/* Added Success Banner */}
        <div className="mb-4 flex w-full items-center justify-between rounded-[18px] border border-white/80 bg-white/75 px-5 py-2 backdrop-blur-xl shadow-sm">
          <div className="flex items-center gap-3 text-gray-800 font-medium">
            <FaFileCode size={32} className="text-blue-600" />
            <span className="text-[22px] font-serif relative top-1">Your website is created succesfully check it out</span>
          </div>
          <button className="rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 px-5 py-2 text-[20px] font-serif text-white shadow-md transition-all hover:scale-105
          relative left-3">
            Open Editor
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="
            w-full
            min-h-[76px]
            flex
            items-end
            gap-3
            rounded-[24px]
            border
            border-white/80
            bg-white/75
            px-5
            py-4
            backdrop-blur-xl
            shadow-[0_18px_45px_rgba(75,85,130,0.18)]
          "
        >
          <textarea
            ref={textareaRef}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Create your dream website"
            rows={1}
            className="
              max-h-[150px]
              min-h-[44px]
              flex-1
              resize-none
              overflow-y-auto
              bg-transparent
              px-2
              py-2
              text-[25px]
              font-serif
              text-gray-800
              placeholder:text-gray-400
              outline-none
              [scrollbar-width:none]
              [-ms-overflow-style:none]
              [&::-webkit-scrollbar]:hidden
            "
          />

          <button
            type="submit"
            disabled={!prompt.trim()}
            aria-label="Send prompt"
            onClick={handleGenerateWebsite}
            className="
              flex
              h-12
              w-12
              shrink-0
              items-center
              justify-center
              rounded-full
              bg-gradient-to-br
              from-purple-600
              to-blue-600
              text-xl
              text-white
              shadow-[0_8px_20px_rgba(79,70,229,0.32)]
              transition-all
              duration-300
              hover:scale-105
              disabled:cursor-not-allowed
              disabled:opacity-40
            "
          >
            <FiSend size={30} className="relative right-0.5 top-0.5" />
          </button>
        </form>

        {/* Category buttons */}
        <div
          className="
            mt-4
            flex
            flex-wrap
            items-center
            justify-center
            gap-3
          "
        >
          {categories.map((category) => (
            <button
              key={category.id}
              type="button"
              onClick={() => handleCategoryClick(category.name)}
              className="
                flex
                items-center
                gap-2
                rounded-full
                border
                border-gray-300/80
                bg-white/60
                px-4
                py-2
                text-[13px]
                text-gray-600
                backdrop-blur-md
                shadow-[0_5px_14px_rgba(70,80,120,0.08)]
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:bg-white/80
                hover:text-gray-900
              "
            >
              <span className="text-[15px]">{category.icon}</span>
              {category.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomeInputArea;