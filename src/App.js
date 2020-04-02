import React, { useState } from 'react'
import './App.css'

function App() {
  const [counter, setCounter] = useState(0)
  const [winner, setWinner] = useState('')
  const [board, setBoard] = useState([
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ])
  const handleClickClear = () => {
    setWinner('')
    setCounter(0)
    setBoard([
      ['', '', ''],
      ['', '', ''],
      ['', '', '']
    ])
  }

  const handleClickField = (rowIndex, cellIndex) => {
    if(board[rowIndex][cellIndex] || winner) return
    const nextBoard = [...board]
    nextBoard[rowIndex] = [...nextBoard[rowIndex]]
    nextBoard[rowIndex][cellIndex] = counter % 2 === 0 
      ?'🐔'
      : '🦊' 
    setBoard(nextBoard)
    setCounter(counter + 1)
    finishGame(nextBoard)
  }

  const finishGame = (nextBoard) => {
    const checkIsWinnerCombination = (arr) => (arr[0] === arr[1] && arr[0] === arr[2] && arr[0])
    let winnerSign = ''
    let winnerRow = nextBoard.find(checkIsWinnerCombination)
    if(winnerRow) winnerSign = winnerRow[0]
    for (let i = 0; i < 3; i++) {
      if (checkIsWinnerCombination([nextBoard[0][i], nextBoard[1][i], nextBoard[2][i]])) {
        winnerSign = nextBoard[0][i]
      } 
    }
    
    if (checkIsWinnerCombination([nextBoard[0][0], nextBoard[1][1], nextBoard[2][2]])) {
      winnerSign = nextBoard[0][0]
    }

    if (checkIsWinnerCombination([nextBoard[0][2], nextBoard[1][1], nextBoard[2][0]])) {
      winnerSign = nextBoard[0][2]
    }

    if(winnerSign) setWinner(winnerSign)
    else if (nextBoard.flat().filter(v => v).length === 9) setWinner('🐧')
  }

  return (
    <div>
      <div>Winner is: {winner}</div>
      {
        board.map((row, rowIndex) => (
          <div key={rowIndex} className={'board-row'}>
            {
              row.map((cell, cellIndex) => (
                <div
                  onClick={() => handleClickField(rowIndex, cellIndex)} 
                  key={cellIndex} 
                  className={'board-item'}>
                    {cell}
                </div>
              ))
            }
          </div>
        ))
      }
      <button onClick={() => handleClickClear()}>clear</button>
    </div>
  );
}

export default App;
