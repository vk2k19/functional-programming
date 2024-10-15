import "./Chevron.css";
export const Chevron = ({ up = false }: { up?: boolean }) => (
  <span className={up ? "up" : "down"}>▼</span>
);
