import Square from "../Square/Square";

const Board = (props) => {
  return (
    <div>
      {Array(5)
        .fill(null)
        .map((item, index) => {
          return (
            <div className="board-row" key={index}>
              {Array(5)
                .fill(null)
                .map((item, index2) => {
                  return (
                    <Square
                      key={5 * index + index2}
                      propsClass={
                        props.currentClick === index * 5 + index2
                          ? "square active"
                          : props.winLines.includes(5 * index + index2)
                          ? "square active"
                          : "square"
                      }
                      value={props.squares[5 * index + index2]}
                      onClick={() => props.onClick(5 * index + index2)}
                    />
                  );
                })}
            </div>
          );
        })}
    </div>
  );
};
export default Board;
