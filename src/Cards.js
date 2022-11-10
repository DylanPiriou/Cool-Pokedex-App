import React from "react";
import "./Cards.css";

export default function Cards({ poke }) {
  const handleId = (id) => {
    return (id < 10 ? "0" : "") + id;
  };

  return (
    <div className="card">
      <img src={poke.pic} alt="" />
      <h4>{poke.name}</h4>
      <small>#{handleId(poke.id)}</small>
    </div>
  );
}
