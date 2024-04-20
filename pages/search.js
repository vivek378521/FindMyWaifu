import { useState } from 'react';
import { useRouter } from 'next/router';
import waifuverseData from '../waifuverse.json';

export default function Search() {
  const router = useRouter();
  const [formData, setFormData] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [user_characteristics, setUserCharacteristics] = useState({
    affection: 0,
    courage: 0,
    kindness: 0,
    perviness: 0,
    loyalty: 0,
    love: 0
  });

  const questions = [
    {
      text: 'Will you peel Oranges for your Waifu?',
      options: ['I\'ll buy the whole orange farm and peel all the oranges with my hands', 'Yes', 'Maybe', 'No'],
      type: 'affection',
      score: [10, 7, 3, 0]

    },
    {
      text: 'If someone hits your car while your waifu is in the car with you, will you beat the culprit?',
      options: ['I\'ll kill the culprit', 'Yes', 'Maybe', 'No'],
      type: 'courage',
      score: [10, 7, 3, 0]
    },
    {
      text: 'Will you let your waifu go out with her friends?',
      options: ['I\'ll lock her in a cage', 'Yes', 'Maybe', 'No'],
      type: 'kindness',
      score: [10, 7, 3, 0]
    },
    {
      text: 'Will you let your waifu wear revealing clothes?',
      options: ['I\'ll burn all the indecent clothes', 'Yes', 'Maybe', 'No'],
      type: 'perviness',
      score: [10, 7, 3, 0]
    },
    {
      text: 'Will you conquer the world for your waifu?',
      options: ['I\'ll conquer the universe', 'Yes', 'Maybe', 'No'],
      type: 'loyalty',
      score: [10, 7, 3, 0]
    },
    {
      text: 'If your waifu is sick, will you take care of her?',
      options: ['I\'ll research about her sickness and find a cure for it', 'Yes', 'Maybe', 'No'],
      type: 'love',
      score: [10, 7, 3, 0]
    }
  ];

  const handleOptionChange = (option, index, type, score) => {
    setFormData({ ...formData, [questions[currentQuestion].text]: index });
    switch (type) {
      case 'affection':
        setUserCharacteristics({ ...user_characteristics, affection: score });
        break;
      case 'courage':
        setUserCharacteristics({ ...user_characteristics, courage: score });
        break;
      case 'kindness':
        setUserCharacteristics({ ...user_characteristics, kindness: score });
        break;
      case 'perviness':
        setUserCharacteristics({ ...user_characteristics, perviness: score });
        break;
      case 'loyalty':
        setUserCharacteristics({ ...user_characteristics, loyalty: score });
        break;
      case 'love':
        setUserCharacteristics({ ...user_characteristics, love: score });
        break;
    }
  };

  const calculateSimilarityScore = (userCharacteristics, characterCharacteristics) => {
    let score = 0;
    const totalCharacteristics = Object.keys(characterCharacteristics).length;

    for (const characteristic in userCharacteristics) {
      if (characterCharacteristics.hasOwnProperty(characteristic)) {
        const diff = Math.abs(userCharacteristics[characteristic] - characterCharacteristics[characteristic]);
        score += (totalCharacteristics - diff) / totalCharacteristics;
      }
    }

    return score;
  };

  const generateMatchingResults = (userCharacteristics, characters) => {
    const matchingResults = [];

    characters.forEach(character => {
      const similarityScore = calculateSimilarityScore(userCharacteristics, character.characteristics);
      matchingResults.push({
        character,
        similarityScore
      });
    });

    return matchingResults.sort((a, b) => b.similarityScore - a.similarityScore);
  };

  const pickRandomResult = (matchingResults) => {
    const randomIndex = Math.floor(Math.random() * matchingResults.length);
    return matchingResults[randomIndex];
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('User answers:', formData);
    console.log('User characteristics:', user_characteristics);
    const matchingResults = generateMatchingResults(user_characteristics, waifuverseData);
    const randomResult = pickRandomResult(matchingResults);
    console.log('Matching results:', matchingResults);
    console.log('Random result:', randomResult);
    const stringifiedResult = JSON.stringify(randomResult);
    router.push({
      pathname: '/result',
      query: { randomResult: stringifiedResult }
    });

  }



  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f5f5f5', backgroundImage: 'url("https://i.postimg.cc/kgGs7qw0/juju.jpg")', backgroundSize: 'cover' }}>
      {currentQuestion < questions.length ? (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#ffffff', padding: '2rem', borderRadius: '0.5rem', boxShadow: '0 0.25rem 0.5rem rgba(0, 0, 0, 0.1)' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1.5rem', textAlign: 'center', color: 'black' }}>{questions[currentQuestion].text}</h2>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '1.5rem' }}>
            {questions[currentQuestion].options.map((option, index) => (
              <div key={index} style={{ marginBottom: '0.75rem' }}>
                <label style={{ fontSize: '1.25rem', cursor: 'pointer', display: 'flex', alignItems: 'center', color: 'black' }}>
                  <input
                    type="radio"
                    name={questions[currentQuestion].text}
                    value={option}
                    onChange={() => handleOptionChange(option, index, questions[currentQuestion].type, questions[currentQuestion].score[index])}
                    style={{ marginRight: '0.5rem' }}
                  />
                  {option}
                </label>
              </div>
            ))}
          </div>
          <button
            onClick={() => setCurrentQuestion(currentQuestion + 1)}
            style={{ padding: '0.5rem 1rem', fontSize: '1rem', backgroundColor: '#007bff', color: '#ffffff', border: 'none', borderRadius: '0.25rem', cursor: 'pointer', transition: 'backgroundColor 0.3s ease' }}
            disabled={formData[questions[currentQuestion].text] === undefined}
          >
            Next
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#ffffff', padding: '2rem', borderRadius: '0.5rem', boxShadow: '0 0.25rem 0.5rem rgba(0, 0, 0, 0.1)' }}>
          <button
            onClick={handleSubmit}
            style={{ padding: '0.5rem 1rem', fontSize: '1rem', backgroundColor: '#28a745', color: '#ffffff', border: 'none', borderRadius: '0.25rem', cursor: 'pointer', transition: 'backgroundColor 0.3s ease', marginBottom: '1.5rem' }}
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
};