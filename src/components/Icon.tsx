export const Icon = ({
  children,
  nonInteractive = false,
  small = false,
}: {
  children: React.ReactNode;
  nonInteractive?: boolean;
  small?: boolean;
}) => (
  <div
    className={`border small rounded dynamo ${
      nonInteractive ? "" : "highlight-hover"
    }`}
  >
    <span
      className={`${nonInteractive ? "" : "nudge"} ${
        small ? "padding-small" : "padding"
      }  bold icon small f-align-center f-justify-center f`}
    >
      {children}
    </span>
  </div>
);
