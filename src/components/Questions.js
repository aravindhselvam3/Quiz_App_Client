import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'


/** Custom Hook */
import { useFetchQestion } from '../hooks/FetchQuestion'
import { updateResult } from '../hooks/setResult'


export default function Questions({ onChecked }) {

    const [checked, setChecked] = useState(undefined)
    const { trace } = useSelector(state => state.questions);
    const result = useSelector(state => state.result.result);
    const [{ isLoading, serverError}] = useFetchQestion() 

    const questions = useSelector(state => state.questions.queue[state.questions.trace])
    console.log("Trace:", trace);
    console.log("Question at trace:", questions);
    console.log("Result:", result);

    const dispatch = useDispatch()

    useEffect(() => {
        if (checked !== undefined) {
            dispatch(updateResult({ trace, checked }))
        }
}, [checked, dispatch, trace])

    
    function onSelect(i){
        onChecked(i)
        setChecked(i)
        dispatch(updateResult({ trace, checked}))
    }


    if (isLoading) return <h3 className='text-light'>Loading...</h3>;
    if (serverError) return <h3 className='text-light'>{serverError.toString()}</h3>;
    if (!questions) return <h3 className='text-light'>No question available</h3>;

  return (
    <div className='questions'>
        <h2 className='text-light'>{questions?.question}</h2>
        
        <ul key={questions?.id}>
            {
                questions?.options.map((q, i) => (
                    <li key={i}>
                        <input 
                            type="radio"
                            value={false}
                            name="options"
                            id={`q${i}-option`}
                            onChange={() => onSelect(i)}
                        />

                        <label className='text-primary' htmlFor={`q${i}-option`}>{q}</label>
                        <div className={`check ${result[trace] === i ? 'checked' : ''}`}></div>
                    </li>
                ))
            }
        </ul>
    </div>
  )
}
