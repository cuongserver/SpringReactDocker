import React from "react";
import background from "assets/images/4882066.jpg";
const LayoutEntry: React.FC = React.memo(() => {
  const style: React.CSSProperties = {
    backgroundImage: `url(${background})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };
  return (
    <React.Fragment>
      <div className="w-100v h-100v" style={style}></div>
    </React.Fragment>
  );
});

export default LayoutEntry;
