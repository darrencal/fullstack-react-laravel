import './InsightCard.css';

const InsightCard = ({ icon, color, title, quantity, percentage }) => {
  return (
    <div className="insight-card">
        <span className={`material-icons-round ${'bg-' + (color || 'primary')}`}>{icon}</span>
        <div className="body">
            <div className="details">
                <h3>{title}</h3>
                <h1>{quantity}</h1>
            </div>
            <div className="progress">
                <svg>
                    <circle 
                        cx="43" 
                        cy="43" 
                        r="36" 
                        style={{
                            stroke: `var(--color-${color || 'primary'})`,
                            strokeDasharray: 227, // Circumference (approx.)
                            strokeDashoffset: 227 - (227 * (percentage || 100) / 100)
                        }}
                    >                        
                    </circle>
                </svg>
                <div className="percentage">
                    <p>{percentage}%</p>
                </div>
            </div>
        </div>
        <small className="text-muted">Last 24 Hours</small>
    </div>
  )
}

export default InsightCard;