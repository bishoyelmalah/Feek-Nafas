import { type CodeforcesProblem } from "../types/CodeforcesProblem";
import { type ProblemData } from "../types/ProblemData";

const ratingOptions = ['800', '1000', '1200', '1400', '1600', '1800', '2000'];
const topicOptions = ['Implementation', 'Math', 'Greedy', 'DP', 'Graphs'];


export async function getAllProblems() {
  try {
    const response = await fetch('https://codeforces.com/api/problemset.problems');
    const data = await response.json();

    if (data.status !== 'OK') {
      throw new Error('Codeforces API request failed');
    }

    const allProblems = data.result.problems;
    
    // Filter for English-only problems (ASCII characters)
    const englishProblems = allProblems.filter((problem: CodeforcesProblem) => {
      return /^[a-zA-Z0-9\s\-.,:'()&/+*]+$/.test(problem.name);
    });

    return englishProblems;

  } catch (error) {
    console.error("Error fetching problem:", error);
    return null;
  }
}


export async function getProblemByRatingOrTopic({rating, topic}: ProblemData, existingProblems?: CodeforcesProblem[]) {
  try {
    let selectedRating = rating;
    let selectedTopic = topic;

    if (!selectedRating) {
      const idx = Math.floor(Math.random() * ratingOptions.length);
      selectedRating = Number(ratingOptions[idx]);
    }

    if (!selectedTopic) {
      const idx = Math.floor(Math.random() * topicOptions.length);
      selectedTopic = topicOptions[idx];
    }
    const problems = existingProblems || await getAllProblems();
    if (!problems) throw new Error("Could not load problems");

    const filteredProblems = problems.filter(
      (problem: CodeforcesProblem) => {
          return problem.rating === selectedRating && problem.tags?.includes(selectedTopic!.toLowerCase());
      }
    );
    
    // console.log(filteredProblems);

    if (filteredProblems.length === 0) {
      throw new Error(`No problems found with rating ${rating} and topic ${topic}`);
    }

    // 3. Pick a random problem from the filtered list
    const randomIndex = Math.floor(Math.random() * filteredProblems.length);
    const selectedProblem = filteredProblems[randomIndex];

    // 4. Return the necessary data for your match table
    return {
      name: selectedProblem.name,
      contestId: selectedProblem.contestId,
      index: selectedProblem.index,
      link: `https://codeforces.com/contest/${selectedProblem.contestId}/problem/${selectedProblem.index}`
    };

  } catch (error) {
    console.error("Error fetching problem:", error);
    return null;
  }
}

export const checkSubmission = async (handle: string, contestId: string, problem: string, minutes = 5) => {
  // calculate time from 5 minutes in seconds
  const currentTimeSeconds = Math.floor(Date.now() / 1000);
  const timeLimitSeconds = currentTimeSeconds - (minutes * 60);

  const response = await fetch(`https://codeforces.com/api/contest.status?contestId=${contestId}&handle=${handle}&count=1`)

  const data = await response.json();
  // console.log({
  //   now: currentTimeSeconds,
  //   limit: timeLimitSeconds,
  //   submissionTime: data.result[0].creationTimeSeconds,
  //   diffSeconds: currentTimeSeconds - data.result[0].creationTimeSeconds,
  // });

  // console.log(new Date(currentTimeSeconds * 1000).toISOString());
  // console.log(new Date(data.result[0].creationTimeSeconds * 1000).toISOString());

  if (data.result.length === 0) return null

  const problemIndex = data.result[0].problem.index; 
  const submissionTime = data.result[0].creationTimeSeconds;

  if (submissionTime >= timeLimitSeconds && problem === problemIndex) {
    const submission = data.result[0].verdict;
    // console.log(submission);
    return submission === 'OK';
  }
  return null;
}