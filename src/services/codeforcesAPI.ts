interface CodeforcesProblem {
  name: string;
  contestId: number;
  index: string;
  type?: string;
  rating?: number;
  tags?: string[];
}

export async function getRandomProblemByRating(targetRating: number) {
  try {
    // 1. Fetch problems (using a broad tag helps reduce the initial payload size)
    const response = await fetch('https://codeforces.com/api/problemset.problems?tags=implementation');
    const data = await response.json();

    if (data.status !== 'OK') {
      throw new Error('Codeforces API request failed');
    }

    // 2. Filter the massive array by your specific rating
    const allProblems = data.result.problems;
    const filteredProblems = allProblems.filter(
      (problem: CodeforcesProblem) => problem.rating === targetRating
    );
    
    // console.log(filteredProblems);

    if (filteredProblems.length === 0) {
      throw new Error(`No problems found with rating ${targetRating}`);
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

const problem = await getRandomProblemByRating(800);
console.log(problem);