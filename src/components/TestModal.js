import React, { useState } from 'react';
import Modal from 'react-modal';
import { Button, Form } from 'react-bootstrap';
import api from '../utils/api';
import './TestModal.css'; // Ensure this CSS file is updated as shown below

Modal.setAppElement('#root'); // Bind modal to the root of the app

const questions = [
  {
    id: 1,
    text: "How do you prefer to communicate with others?",
    options: {
      a: "Through in-depth, thoughtful conversations",
      b: "Brief, direct exchanges focused on efficiency",
      c: "Written communication (e.g., texts, emails)",
      d: "A mix, depending on the situation"
    }
  },
  {
    id: 2,
    text: "What type of humor resonates with you the most?",
    options: {
      a: "Dry, witty humor",
      b: "Lighthearted and playful humor",
      c: "Satirical or dark humor",
      d: "Physical or slapstick comedy"
    }
  },
  {
    id: 3,
    text: "Which of the following values are most important to you in life and relationships?",
    options: {
      a: "Integrity and honesty",
      b: "Compassion and kindness",
      c: "Ambition and growth",
      d: "Loyalty and commitment"
    }
  },
  {
    id: 4,
    text: "How do you typically respond to emotionally charged situations?",
    options: {
      a: "I openly express my feelings and seek resolution",
      b: "I prefer to reflect on my emotions privately before discussing",
      c: "I remain composed and handle emotions logically",
      d: "I avoid emotional confrontation unless absolutely necessary"
    }
  },
  {
    id: 5,
    text: "What best describes your typical energy level in daily life?",
    options: {
      a: "I’m highly active and thrive on constant movement",
      b: "I prefer a balanced mix of activity and relaxation",
      c: "I lean towards quiet, low-energy activities",
      d: "My energy fluctuates depending on my environment"
    }
  },
  {
    id: 6,
    text: "How important is it for you to share hobbies or interests with someone you connect with?",
    options: {
      a: "Very important, shared interests are key to bonding",
      b: "Somewhat important, but I enjoy exploring new activities",
      c: "Not important, I value independence in interests",
      d: "I’m open to learning about others' hobbies but don’t require overlap"
    }
  },
  {
    id: 7,
    text: "How do you usually approach challenges or setbacks in life?",
    options: {
      a: "I maintain a positive, optimistic attitude",
      b: "I take a realistic approach and focus on practical solutions",
      c: "I approach things cautiously and prefer to avoid risks",
      d: "I remain flexible and adapt as needed, even if things don’t go as planned"
    }
  },
  {
    id: 8,
    text: "How do you tend to support the people closest to you?",
    options: {
      a: "By offering guidance and problem-solving assistance",
      b: "By being a compassionate listener and offering emotional support",
      c: "By showing encouragement and celebrating their successes",
      d: "By providing practical help when needed"
    }
  },
  {
    id: 9,
    text: "How would you describe your openness to trying new things or exploring different perspectives?",
    options: {
      a: "I actively seek new experiences and embrace change",
      b: "I’m open to new things, but prefer some familiarity",
      c: "I enjoy my current routines and rarely seek out new experiences",
      d: "I’m cautious but willing to try new things when necessary"
    }
  },
  {
    id: 10,
    text: "How do you demonstrate trustworthiness in relationships?",
    options: {
      a: "By always being transparent and honest",
      b: "By showing consistency in my actions and commitments",
      c: "By being open, even when things are difficult to discuss",
      d: "By protecting others’ confidentiality and maintaining loyalty"
    }
  },
  {
    id: 11,
    text: "How do you approach differences of opinion in relationships?",
    options: {
      a: "I value respectful discussions and see disagreements as opportunities to grow",
      b: "I focus on finding common ground while acknowledging differences",
      c: "I prefer to avoid conflict and respect others’ viewpoints without challenging them",
      d: "I encourage open debate to understand multiple perspectives"
    }
  },
  {
    id: 12,
    text: "When facing a disagreement, what’s your preferred way of resolving it?",
    options: {
      a: "I address it immediately to resolve it quickly",
      b: "I take time to process my thoughts before engaging in the conversation",
      c: "I try to de-escalate the situation and avoid conflict altogether",
      d: "I seek a balanced, thoughtful discussion to find a mutual solution"
    }
  },
  {
    id: 13,
    text: "How do you typically manage stress or strong emotions?",
    options: {
      a: "I stay calm and collected, even under pressure",
      b: "I express my emotions openly and work through them with others",
      c: "I prefer to handle things internally before discussing them",
      d: "I rely on external support systems, like friends or professionals, for help"
    }
  },
  {
    id: 14,
    text: "How much personal independence do you need in relationships?",
    options: {
      a: "I need plenty of alone time to recharge and pursue my interests",
      b: "I value independence but also enjoy regular togetherness",
      c: "I prefer spending most of my time with the other person",
      d: "My level of independence varies based on the relationship’s dynamics"
    }
  },
  {
    id: 15,
    text: "How do you approach being authentic in your interactions with others?",
    options: {
      a: "I am always my true self, regardless of the situation",
      b: "I gradually reveal more of myself as I become comfortable",
      c: "I adjust my behavior depending on the people I’m with",
      d: "I prioritize authenticity but also maintain a level of privacy"
    }
  },
  {
    id: 16,
    text: "How do you approach learning new things or exploring different ideas?",
    options: {
      a: "I actively seek out new knowledge and love to explore diverse topics",
      b: "I’m curious, but prefer to dive into subjects that directly interest me",
      c: "I’m open to learning when necessary but don’t seek it out often",
      d: "I tend to stick with what I already know and trust"
    }
  },
  {
    id: 17,
    text: "How would you describe your approach to giving in relationships?",
    options: {
      a: "I give freely and generously, without expecting anything in return",
      b: "I strive for a balance of giving and receiving",
      c: "I’m cautious about over-giving, preferring to keep things balanced",
      d: "I give when I feel it's deserved and when resources allow"
    }
  },
  {
    id: 18,
    text: "How do you usually handle unexpected changes or disruptions in your plans?",
    options: {
      a: "I adapt easily and enjoy the spontaneity of change",
      b: "I adjust gradually, but prefer having structure and predictability",
      c: "I feel anxious when things don’t go according to plan",
      d: "I prefer sticking to the original plan but will adapt when necessary"
    }
  },
  {
    id: 19,
    text: "How important is self-reflection and personal growth to you?",
    options: {
      a: "Extremely important, I regularly reflect on my thoughts and actions",
      b: "Important, but I reflect mainly when facing challenges",
      c: "Somewhat important, but I prefer to accept myself as I am",
      d: "Not a major focus for me, I prioritize external factors over introspection"
    }
  },
  {
    id: 20,
    text: "How do you prioritize your goals and ambitions in life?",
    options: {
      a: "I’m highly driven and set ambitious long-term goals",
      b: "I balance my ambitions with personal well-being and relationships",
      c: "I prefer living in the moment with moderate focus on future goals",
      d: "I prioritize relaxation and happiness over career or achievement"
    }
  },
  {
    id: 21,
    text: "How aligned are your current life goals with those of others you connect with?",
    options: {
      a: "Very aligned, I prefer being with people at similar stages of life",
      b: "Moderately aligned, I’m flexible about life stages but value common ground",
      c: "Life stages don’t matter as long as we share core values",
      d: "I’m open to connecting with people at different stages if we can learn from each other"
    }
  },
  {
    id: 22,
    text: "How important is cultural background or shared traditions to you in a relationship?",
    options: {
      a: "Extremely important, shared culture is key to connection",
      b: "Somewhat important, but I’m open to different cultures and backgrounds",
      c: "Not very important, I prioritize shared values over culture",
      d: "Not important at all, I enjoy learning from diverse cultures"
    }
  },
  {
    id: 23,
    text: "How do you prefer to set and maintain personal boundaries in relationships?",
    options: {
      a: "I set clear and firm boundaries early on",
      b: "I maintain flexible boundaries depending on the situation",
      c: "I’m open about my needs but adapt based on others' comfort levels",
      d: "I prefer minimal boundaries, allowing for fluidity in relationships"
    }
  },
  {
    id: 24,
    text: "How do you approach honesty in sensitive situations?",
    options: {
      a: "I believe in complete transparency, even if it’s uncomfortable",
      b: "I value honesty but approach sensitive topics with care and tact",
      c: "I believe in selective honesty to maintain harmony",
      d: "I prioritize discretion over full honesty, especially in delicate matters"
    }
  },
  {
    id: 25,
    text: "How important is it for you to feel fully accepted by others without judgment?",
    options: {
      a: "Extremely important, I need to feel safe being my true self",
      b: "Somewhat important, though constructive feedback is welcome",
      c: "Not very important, I’m comfortable with others’ opinions",
      d: "I’m open to judgment and criticism as a way to grow"
    }
  },
];

const TestModal = ({ isOpen, onRequestClose, onTestSubmit }) => {
    const [isIntro, setIsIntro] = useState(true); // State to handle introductory screen
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState(Array(25).fill(null));
    const [error, setError] = useState(null);
  
    const handleOptionChange = (e) => {
      const updatedAnswers = [...answers];
      updatedAnswers[currentQuestion] = e.target.value;
      setAnswers(updatedAnswers);
    };
  
    const handleNext = () => {
      if (!answers[currentQuestion]) {
        setError("Please select an option before proceeding.");
        return;
      }
      setError(null);
      setCurrentQuestion(currentQuestion + 1);
    };
  
    const handleBack = () => {
      setError(null);
      setCurrentQuestion(currentQuestion - 1);
    };
  
    const handleSubmit = async () => {
      if (!answers[currentQuestion]) {
        setError("Please select an option before submitting.");
        return;
      }
      setError(null);
  
      try {
        const response = await api.post('/api/core/submit_test/', { answers });
        alert("Test submitted successfully!");
        onTestSubmit(); // Refresh Discover People or other UI elements
        onRequestClose();
        // Reset modal state
        setIsIntro(true);
        setCurrentQuestion(0);
        setAnswers(Array(25).fill(null));
      } catch (err) {
        console.error("Error submitting test:", err);
        setError("Failed to submit test. Please try again.");
      }
    };
  
    const handleStartTest = () => {
      setIsIntro(false);
    };
  
    const handleClose = () => {
      onRequestClose();
      // Reset modal state
      setIsIntro(true);
      setCurrentQuestion(0);
      setAnswers(Array(25).fill(null));
      setError(null);
    };
  
    const currentQ = questions[currentQuestion];
  
    return (
      <Modal
        isOpen={isOpen}
        onRequestClose={handleClose}
        contentLabel="Charectrahertz Test"
        className="Modal"
        overlayClassName="Overlay"
      >
        {isIntro ? (
          <div className="intro-container">
            <h2>Welcome to Charectrahertz</h2>
            <p>
            Charectrahertz is the frequency at which people vibe (with respect to your frequency). This test will help you find like-minded people so you vibe better and hence socialize better.
            </p>
            <p><strong>There are no wrong answers.</strong></p>
            <div className="d-flex justify-content-end mt-4">
              <Button variant="secondary" onClick={handleClose} className="me-2">
                Close
              </Button>
              <Button variant="primary" onClick={handleStartTest}>
                Start Test
              </Button>
            </div>
          </div>
        ) : (
          <>
            <h2>Charectrahertz Test</h2>
            {/* Progress Bar */}
            <div className="progress mt-2">
              <div
                className="progress-bar"
                role="progressbar"
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                aria-valuenow={currentQuestion + 1}
                aria-valuemin="0"
                aria-valuemax={questions.length}
              >
                {Math.round(((currentQuestion + 1) / questions.length) * 100)}%
              </div>
            </div>
            <Form className="mt-3">
              <Form.Group>
                <Form.Label><strong>Question {currentQ.id}:</strong> {currentQ.text}</Form.Label>
                {Object.entries(currentQ.options).map(([key, value]) => (
                  <Form.Check
                    type="radio"
                    id={`question-${currentQ.id}-option-${key}`}
                    name={`question-${currentQ.id}`}
                    label={`${key}) ${value}`}
                    value={key}
                    checked={answers[currentQuestion] === key}
                    onChange={handleOptionChange}
                    key={key}
                    className="text-e8e8e8" // Custom class to set text color
                  />
                ))}
              </Form.Group>
              {error && <p className="text-danger">{error}</p>}
              <div className="d-flex justify-content-between mt-3">
                <Button variant="secondary" onClick={handleBack} disabled={currentQuestion === 0}>
                  Back
                </Button>
                {currentQuestion < questions.length - 1 ? (
                  <Button variant="primary" onClick={handleNext}>
                    Next
                  </Button>
                ) : (
                  <Button variant="success" onClick={handleSubmit}>
                    Submit
                  </Button>
                )}
              </div>
            </Form>
          </>
        )}
      </Modal>
    );
  };
  
  export default TestModal;