import React, { Component } from 'react';
import { useState } from "react";


function DealDetailMobile() {
  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  return (
    <div className="container">
      <div className="block-mob-tabs">
        <button
          className={toggleState === 1 ? "mob-tabs active-mob-tabs" : "mob-tabs"}
          onClick={() => toggleTab(1)}
        >
          Pitch
        </button>
        <button
          className={toggleState === 2 ? "mobtabs active-mob-tabs" : "mob-tabs"}
          onClick={() => toggleTab(2)}
        >
          FAQ
        </button>
        <button
          className={toggleState === 3 ? "mobtabs active-mob-tabs" : "mob-tabs"}
          onClick={() => toggleTab(3)}
        >
          Deal
        </button>
        <button
          className={toggleState === 3 ? "mobtabs active-mob-tabs" : "mob-tabs"}
          onClick={() => toggleTab(4)}
        >
          Teem
        </button>
      </div>

      <div className="content-mob-tabs">
        <div
          className={toggleState === 1 ? "content-mob  active-content-mob" : "content-mob"}
        >
          <h2>Content 1</h2>
          <hr />
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati
            praesentium incidunt quia aspernatur quasi quidem facilis quo nihil
            vel voluptatum?
          </p>
        </div>

        <div
          className={toggleState === 2 ? "content-mob  active-content-mob" : "content-mob"}
        >
          <h2>Content 2</h2>
          <hr />
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente
            voluptatum qui adipisci.
          </p>
        </div>

        <div
          className={toggleState === 3 ? "content-mob  active-content-mob" : "content-mob"}
        >
          <h2>Content 3</h2>
          <hr />
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos sed
            nostrum rerum laudantium totam unde adipisci incidunt modi alias!
            Accusamus in quia odit aspernatur provident et ad vel distinctio
            recusandae totam quidem repudiandae omnis veritatis nostrum
            laboriosam architecto optio rem, dignissimos voluptatum beatae
            aperiam voluptatem atque. Beatae rerum dolores sunt.
          </p>
        </div>
      </div>
    </div>
  );
}

export default DealDetailMobile;
