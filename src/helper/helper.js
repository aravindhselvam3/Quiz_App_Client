import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import axios from 'axios';

const BASE_URL = "http://localhost:8080/api";

/** calculate number of attempted questions */
export function attempts_Number(result) {
  return result.filter(r => r !== undefined).length;
}

/** calculate earned points */
export function earnPoints_Number(result, answers, point) {
  return result
    .map((element, i) => answers[i] === element)
    .filter(Boolean)
    .map(() => point)
    .reduce((prev, curr) => prev + curr, 0);
}

/** flag result as pass/fail */
export function flagResult(totalPoints, earnPoints) {
  return (totalPoints * 50 / 100) < earnPoints;
}

/** check user auth  */
export function CheckUserExist({ children }) {
  const auth = useSelector(state => state.result.userId);
  return auth ? children : <Navigate to={'/'} replace={true} />;
}

/** get server data */
export async function getServerData(url, callback) {
  const fullURL = `${BASE_URL}${url}`;
  console.log("🔍 Fetching:", fullURL);
  try {
    const { data } = await axios.get(fullURL);

    // Optional: If server returns [{ questions: [...], answers: [...] }], extract:
    // const extracted = data[0]?.questions || [];

    return callback ? callback(data) : data;
  } catch (error) {
    console.error("❌ getServerData error:", error?.response?.status, error.message);
    throw error;
  }
}

/** post server data */
export async function postServerData(url, result, callback) {
  const fullURL = `${BASE_URL}${url}`;
  try {
    const { data } = await axios.post(fullURL, result);
    return callback ? callback(data) : data;
  } catch (error) {
    console.error("❌ postServerData error:", error?.response?.status, error.message);
    throw error;
  }
}
