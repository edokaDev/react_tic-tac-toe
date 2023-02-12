import './App.css';

import { useState } from 'react';

export default function Board() {
    const [squares, setSquares] = useState(Array(9).fill(null));

    function handleClick(index) {
        const nextSquares = squares.slice(); // creates a copy of the squares array
        nextSquares[index] = 'X';
        // setValue('X')
        setSquares(nextSquares);
    }

    return (
        <div className='game'>
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
    // const [value, setValue] = useState(null);
    // }
    return (
        <button
            className="square"
            onClick={onSquareClick}
        >
            { value }
        </button>
    )
}
