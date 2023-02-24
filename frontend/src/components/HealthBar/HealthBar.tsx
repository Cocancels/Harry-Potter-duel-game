import "./HealthBar.css";
import "./HealthBar.css";

const HealthBar = (props: { health: number; maxHealth: number }) => {
  const { health, maxHealth } = props;

  const fillWidth = `${(health / maxHealth) * 100}%`;

  return (
    <div className="health-bar">
      <div className="health-bar__fill" style={{ width: fillWidth }} />
      <div className="health-bar__label">{`${health}/${maxHealth}`}</div>
    </div>
  );
};

export default HealthBar;
