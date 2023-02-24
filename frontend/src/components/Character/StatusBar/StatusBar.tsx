import "./StatusBar.css";

interface StatusBarProps {
  status: string[];
}

export const StatusBar = (props: StatusBarProps) => {
  const { status } = props;

  return (
    <div className="status-bar">
      {status.map((status, index) => {
        return (
          <div key={`status-${index}`}>
            <img
              className="status-icon"
              src={`/status/${status}.png`}
              alt={""}
            />
          </div>
        );
      })}
    </div>
  );
};
