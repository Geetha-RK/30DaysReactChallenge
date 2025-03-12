import React from 'react'
import { useParams } from 'react-router-dom'; 

const QuestionContainer = ({questions}) => {
  return (
    <div>
        {questions.length > 0 ? (
            questions.map((question,index)=>
                <>
                <div key={question.id} className='trivia__question'>
                    {question.question}
                </div>
                <div className='trivia__options'>
                    <p className='trivia__answers'>answers</p>
                    <p className='trivia__answers'>answers</p>
                    <p className='trivia__answers'>answers</p>
                    <p className='trivia__answers'>answers</p>
                </div>
                </>
            )
        ) : <div className='trivia__question'>
            <p>No Questions Available</p>
        </div>
        }
    </div>
  )
}

export default QuestionContainer