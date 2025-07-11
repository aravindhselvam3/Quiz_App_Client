// import { useEffect, useState } from "react"
// import { useDispatch } from "react-redux";
// import { getServerData } from "../helper/helper";

// /** redux actions */
// import * as Action from '../redux/question_reducer'

// /** fetch question hook to fetch api data and set value to store */
// export const useFetchQestion = () => {
//     const dispatch = useDispatch();   
//     const [getData, setGetData] = useState({ isLoading : false, apiData : [], serverError: null});

//     useEffect(() => {
//         setGetData(prev => ({...prev, isLoading : true}));

//         /** async function fetch backend data */
//         (async () => {
//             try {
//                 const [{ questions, answers }] = await getServerData(`${process.env.REACT_APP_SERVER_HOSTNAME}/api/questions`, (data) => data)
                
//                 if(questions.length > 0){
//                     setGetData(prev => ({...prev, isLoading : false}));
//                     setGetData(prev => ({...prev, apiData : questions}));

//                     /** dispatch an action */
//                     dispatch(Action.startExamAction({ question : questions, answers }))

//                 } else{
//                     throw new Error("No Question Avalibale");
//                 }
//             } catch (error) {
//                 setGetData(prev => ({...prev, isLoading : false}));
//                 setGetData(prev => ({...prev, serverError : error}));
//             }
//         })();
//     }, [dispatch]);

//     return [getData, setGetData];
// }


// /** MoveAction Dispatch function */
// export const MoveNextQuestion = () => async (dispatch) => {
//     try {
//         dispatch(Action.moveNextAction()); /** increase trace by 1 */
//     } catch (error) {
//         console.log(error)
//     }
// }

// /** PrevAction Dispatch function */
// export const MovePrevQuestion = () => async (dispatch) => {
//     try {
//         dispatch(Action.movePrevAction()); /** decrease trace by 1 */
//     } catch (error) {
//         console.log(error)
//     }
// }


// Updated useFetchQuestion.js

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getServerData } from "../helper/helper";
import * as Action from '../redux/question_reducer';

export const useFetchQestion = () => {
  const dispatch = useDispatch();
  const [getData, setGetData] = useState({
    isLoading: false,
    apiData: { questions: [], answers: [] },
    serverError: null,
  });

  useEffect(() => {
    setGetData((prev) => ({ ...prev, isLoading: true }));

    (async () => {
      try {
        const data = await getServerData("/questions", res => res);

        if (data) {
          setGetData((prev) => ({ ...prev, isLoading: false }));
          setGetData((prev) => ({ ...prev, apiData: data }));

          // Destructure the data to get questions and answers
          const { questions, answers } = data;

          dispatch(Action.startExamAction({ question: questions, answers }));
        } else {
          throw new Error("No Question Available");
        }
      } catch (error) {
        setGetData((prev) => ({ ...prev, isLoading: false }));
        setGetData((prev) => ({ ...prev, serverError: error }));
      }
    })();
  }, [dispatch]);

  return [getData, setGetData];
};

export const MoveNextQuestion = () => async (dispatch) => {
  try {
    dispatch(Action.moveNextAction());
  } catch (error) {
    console.log(error);
  }
};

export const MovePrevQuestion = () => async (dispatch) => {
  try {
    dispatch(Action.movePrevAction());
  } catch (error) {
    console.log(error);
  }
};

