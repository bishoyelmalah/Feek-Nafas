interface CodeforcesProblem {
  name: string;
  contestId: number;
  index: string;
  type?: string;
  rating?: number;
  tags?: string[];
}

interface ProblemData {
  rating?: number,
  topic?: string
}

export async function getAllProblems() {
  try {
    const response = await fetch('https://codeforces.com/api/problemset.problems');
    const data = await response.json();

    if (data.status !== 'OK') {
      throw new Error('Codeforces API request failed');
    }

    const allProblems = data.result.problems;
    return allProblems;

  } catch (error) {
    console.error("Error fetching problem:", error);
    return null;
  }
}


export async function getProblemByRatingOrTopic({rating, topic}: ProblemData) {
  try {
    const problems = await getAllProblems();
    const filteredProblems = problems.filter(
      (problem: CodeforcesProblem) => {
        if (rating && topic) {
          return problem.rating === rating && problem.tags?.includes(topic.toLowerCase());
        } else if (rating) {
          return problem.rating === rating;
        } else if (topic) {
          return problem.tags?.includes(topic.toLowerCase());
        } else {
          throw new Error("You must provide rating or topic at least");
        }
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

// const problem1 = await getProblemByRatingOrTopic({rating: 800});
// const problem2 = await getProblemByRatingOrTopic({topic: "greedy"});
// const problem3 = await getProblemByRatingOrTopic({rating: 800, topic: "greedy"});

// console.log(problem1);
// console.log(problem2);
// console.log(problem3);
// const problem = await fetch(`https://codeforces.com/contest/${problem1?.contestId}/problem/${problem1?.index}`)

// console.log(problem);