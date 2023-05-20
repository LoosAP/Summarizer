import React from "react";
import { loosapplogo } from "../assets";
import styles from "../style";

const Hero = () => {
  return (
    <section className="flex flex-col items-center justify-center w-full ">
      <nav className="flex flex-row items-center justify-between w-full mt-5 mb-10">
        <embed
          src={loosapplogo}
          alt="logó"
          className="w-[124px] h-[64px] mt-2 object-contain"
        />

        <button
          type="button"
          onClick={() => window.open("https://github.com/LoosAP/Summarizer")}
          className={`mr-2 xs:mr-6 py-4 px-6 bg-pink-gradient font-poppins font-medium text-[18px] text-primary outline-none rounded-[10px]`}
        >
          Github
        </button>
      </nav>

      <h1 className="flex-1 font-poppins font-semibold ss:text-[72px] text-[52px] text-white ss:leading-[100px] leading-[75px]> text-center">
        Summarize articles with <br className="hidden sm:block" />
        <span className="text-gradient">The Power of Rapid API</span>
      </h1>
      <h4
        className={`font-poppins font-semibold text-white text-[20px] sm:text-[27px] leading-[23px] sm:leading-[50px] mb-1 max-w-[900px] text-center`}
      >
        Thats right! You can try out{" "}
        <a
          href="https://rapidapi.com/restyler/api/article-extractor-and-summarizer"
          target="_blank"
          className="cursor-pointer text-gradient"
        >
          this
        </a>{" "}
        Summarizer API for free! You can find out more about rapid API and their
        services{" "}
        <a
          href="https://rapidapi.com/hub"
          target="_blank"
          className="cursor-pointer text-gradient"
        >
          here
        </a>{" "}
      </h4>
    </section>
  );
};

export default Hero;
