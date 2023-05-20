import React from "react";
import Demo from "./components/Demo";
import Hero from "./components/Hero";
import styles from "./style";

const App = () => {
  return (
    <div className="w-full min-h-screen overflow-clip bg-primary">
      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Hero />
          <Demo />
        </div>
      </div>
    </div>
  );
};

export default App;
