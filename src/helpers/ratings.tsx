
export default function getScore(score: number, multiplier: number = 100) {
    const value = score*multiplier;
    let className;
    if(value > 75) {
        className = 'green';
    } else if(value < 40) {
        className = 'red';
    } else {
        className = 'yellow';
    }
    return (
        <div className={"score-rect "+ className}>
            <div>{value.toFixed(0)}</div>
        </div>
    );
}