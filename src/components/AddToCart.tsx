import { Icon } from "./Icon";

export const AddToCart = ({ onClick }: { onClick: () => void }) => {
  return (
    <button onClick={onClick} className="dynamo mw-content no-padding">
      <Icon children="Add to cart" />
    </button>
  );
};
