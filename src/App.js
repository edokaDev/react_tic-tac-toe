import './index.css';

import { useState } from 'react';

export default function Game() {
    const [history, setHistory] = useState([Array(9).fill(null)])
    const [currentMove, setCurrentMove] = useState(0);
    const xIsNext = currentMove % 2 === 0;
    const currentSquares = history[currentMove];

    function handlePlay(nextSquares) {
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);
    }

    function jumpTo(nextMove) {
        setCurrentMove(nextMove);
    }

    const moves = history.map((squares, move) => {
        let description = move > 0 ? 'Go to move #' + move
            : 'Go to game start';
        return (
            <li key={move}>
                <button onClick={() => jumpTo(move)}>{description}</button>
            </li>
        )
    })

    return (
        <div className='game'>
            <div className='game-board'>
                <p className='text-3x1 font-bold'>
                    Welcome
                </p>
                <Board
                    onPlay={handlePlay}
                    squares={currentSquares}
                    xIsNext={xIsNext}
                />
            </div>
            <div className='game-info'>
                <p>Game Info</p>
                <ol>{moves}</ol>
            </div>
        </div>
    )
}

function Board({ squares, xIsNext, onPlay }) {
    const winner = calculateWinner(squares);
    let status = winner ? 'Winner: ' + winner 
                    : 'Next player: ' + (xIsNext ? 'X' 
                                            : 'O');

    function handleClick(i) {
        if (squares[i] || calculateWinner(squares)){
            return;
        }
        const nextSquares = squares.slice(); // creates a copy of the squares array

        nextSquares[i] = xIsNext ? 'X' : 'O';

        onPlay(nextSquares);
    }
    return (
        <div>
            <div className='status'>{status}</div>
            <div className='board-row'>
                <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
                {/* Note that since we are calling the handleClick() rightway
                and not passing it as a prop,
                calling it directly with cause and infinite loop, so,
                we call it with a function (an arrow function) */}
                <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
                <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
            </div>
            <div className='board-row'>
                <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
                <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
                <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
            </div>
            <div className='board-row'>
                <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
                <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
                <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
            </div>

        </div>
        )
}

function Square({ value, onSquareClick }) {
    return (
        <button
            className="square"
            onClick={onSquareClick}
        >
            { value }
        </button>
    )
}

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i]; //destructuring
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

