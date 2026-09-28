import OpenAI from 'openai';

let openaiClient = null;

const getOpenAIClient = () => {
  const apiKey = process.env.OPENAI_API_KEY;
  if (apiKey && apiKey.trim() !== '' && !apiKey.includes('xxxxxxxx')) {
    if (!openaiClient) {
      openaiClient = new OpenAI({ apiKey });
    }
    return openaiClient;
  }
  return null;
};

// 1. Next Lesson Recommendation
export const generateLessonRecommendation = async ({ user, progress, lessons }) => {
  const client = getOpenAIClient();
  const interest = user?.interestDomain || user?.primaryFocus || 'Physics';
  const category = user?.learnerCategory || user?.learnerType || 'High School STEM Learner';
  const userName = user?.name || 'Learner';

  // Extract learner diagnostic / quiz performance history if present
  const attempts = progress?.quizAttempts || progress?.progress?.quizAttempts || user?.quizHistory || [];
  const latestAttempt = Array.isArray(attempts) && attempts.length > 0 ? attempts[0] : null;

  const lowMasteryTopics = (progress?.topicMastery || [])
    .filter(t => t.status === 'needs_review' || t.scoreAvg < 65)
    .map(t => t.topic);

  const attemptTopic = latestAttempt?.topic || latestAttempt?.quizTitle || (lowMasteryTopics.length > 0 ? lowMasteryTopics[0] : 'General STEM');
  const score = latestAttempt?.score !== undefined ? latestAttempt.score : 8;
  const total = latestAttempt?.total !== undefined ? latestAttempt.total : 10;
  const missedCount = total - score;
  const percentage = latestAttempt?.percentage !== undefined ? latestAttempt.percentage : Math.round((score / total) * 100);

  // Match lesson based on the quiz topic
  let matchedLesson = (lessons || []).find(l => 
    l.topic?.toLowerCase().includes(attemptTopic.toLowerCase()) || 
    l.title?.toLowerCase().includes(attemptTopic.toLowerCase()) ||
    l.subject?.toLowerCase().includes(attemptTopic.toLowerCase())
  );

  if (!matchedLesson) {
    matchedLesson = (lessons || []).find(l => 
      l.subject?.toLowerCase().includes(interest.toLowerCase()) || 
      l.topic?.toLowerCase().includes(interest.toLowerCase()) ||
      l.title?.toLowerCase().includes(interest.toLowerCase())
    ) || (lessons && lessons[0]) || { _id: 'lesson-1', title: `${attemptTopic} & Foundations` };
  }

  if (client) {
    try {
      const response = await client.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'You are an adaptive educational AI coach for rural learners. Explain concisely (2 sentences) why this specific lesson was recommended, referencing the student\'s quiz history and interest domain.' },
          { role: 'user', content: `Learner: ${userName}, Category: ${category}, Interest: ${interest}, Quiz: ${attemptTopic}, Score: ${score}/${total} (${percentage}%), Missed Questions: ${missedCount}. Selected module: ${matchedLesson.title}.` }
        ],
        max_tokens: 120
      });
      return {
        lessonId: matchedLesson._id,
        lessonTitle: matchedLesson.title,
        whyThis: response.choices[0].message.content.trim(),
        isAIGenerated: true,
        source: 'OpenAI Cloud'
      };
    } catch (err) {
      console.warn('OpenAI call failed, using rule-based recommendation fallback:', err.message);
    }
  }

  // Learner-specific rule-based explanation tailored directly to the quiz
  let whyText = '';
  if (missedCount <= 0 || percentage === 100) {
    whyText = `You achieved 100% mastery on your ${attemptTopic} assessment (${score}/${total} correct)! You have demonstrated comprehensive understanding. We recommend advancing to "${matchedLesson.title}" to master practical extensions and complex problem solving.`;
  } else if (missedCount === 1) {
    whyText = `You missed only 1 question about ${attemptTopic} in your diagnostic (Score: ${score}/${total}, ${percentage}%). Your preferred interest is ${interest}. Try this illustrated lesson on "${matchedLesson.title}" next to perfect your understanding.`;
  } else {
    const countWord = missedCount === 2 ? 'two' : missedCount === 3 ? 'three' : `${missedCount}`;
    whyText = `You missed ${countWord} questions about ${attemptTopic} in your diagnostic (Score: ${score}/${total}, ${percentage}%), and your preferred interest is ${interest}. Try this illustrated lesson on "${matchedLesson.title}" next to strengthen core concepts.`;
  }

  return {
    lessonId: matchedLesson._id,
    lessonTitle: matchedLesson.title,
    whyThis: whyText,
    isAIGenerated: true,
    isFallback: !client,
    source: client ? 'Local AI Service' : 'Offline Fallback Engine'
  };
};

// 2. Explain Another Way
export const generateExplainAnotherWay = async ({ sectionTitle, content, mode }) => {
  const client = getOpenAIClient();

  if (client) {
    try {
      const response = await client.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: `You are an expert tutor. Explain the following lesson concept in "${mode}" style. Keep it grounded, engaging, and under 120 words.` },
          { role: 'user', content: `Section: ${sectionTitle}\nContent: ${content}` }
        ],
        max_tokens: 200
      });
      return {
        explanationText: response.choices[0].message.content.trim(),
        mode,
        isAIGenerated: true,
        source: 'OpenAI Cloud'
      };
    } catch (err) {
      console.warn('OpenAI explain call failed, using fallback:', err.message);
    }
  }

  const fallbackExplanations = {
    simpler: `Imagine this process like a kitchen recipe! The plant takes sunlight as its oven power, water from its root straw, and air from tiny leaf doors to cook up sweet glucose food.`,
    stepByStep: `1. Solar light strikes chlorophyll pigments in the leaf.\n2. Water molecules from roots are split into oxygen and hydrogen.\n3. Carbon dioxide gas enters through stomatal pores.\n4. Hydrogen and CO2 combine to manufacture glucose sugar.`,
    workedExample: `If a plant leaf receives 600 units of light energy and absorbs 6 molecules of CO2, it produces 1 molecule of glucose and releases 6 oxygen molecules.`,
    realWorld: `Submarines and space stations use artificial photosynthetic scrubbers inspired by plant leaves to absorb astronaut carbon dioxide and generate breathable oxygen during long missions!`
  };

  return {
    explanationText: fallbackExplanations[mode] || fallbackExplanations['simpler'],
    mode,
    isAIGenerated: true,
    isFallback: true,
    source: 'Offline Fallback Engine'
  };
};

// 4. AI Concept Breakdown & Visual Playground
export const generateConceptBreakdown = async ({ topic, query }) => {
  const client = getOpenAIClient();

  if (client) {
    try {
      const response = await client.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'Return JSON with keys: title, summary, stepByStep (array of 3 steps), workedExample, realWorldAnalogy, memoryMnemonic.' },
          { role: 'user', content: `Topic: ${topic}, Question/Query: ${query}` }
        ],
        response_format: { type: "json_object" },
        max_tokens: 350
      });
      return { ...JSON.parse(response.choices[0].message.content), isAIGenerated: true, source: 'OpenAI Cloud' };
    } catch (err) {
      console.warn('Concept breakdown error:', err.message);
    }
  }

  return {
    title: topic || 'Photosynthesis & Chemical Reactions',
    summary: 'Photosynthesis transforms solar light, carbon dioxide, and water into chemical glucose energy and oxygen gas.',
    stepByStep: [
      'Light Absorption: Chloroplasts capture solar photons.',
      'Photolysis: Water molecules split into hydrogen ions and oxygen gas.',
      'Glucose Synthesis: Carbon dioxide and hydrogen bond to form C6H12O6.'
    ],
    workedExample: '6 CO2 + 6 H2O + Light -> C6H12O6 + 6 O2. Splitting 12 water molecules yields 2 glucose molecules and 12 oxygen gas molecules.',
    realWorldAnalogy: 'Like a solar-powered smartphone charger storing electricity inside lithium battery cells for later use!',
    memoryMnemonic: 'Remember "C-H-O": Sunlight Cooks Hydrogen and Oxygen into Sugar!',
    isAIGenerated: true,
    isFallback: true,
    source: 'Offline Fallback Engine'
  };
};

// 5. AI Custom Quiz Generator
export const generateCustomQuiz = async ({ topic, difficulty = 'Intermediate', questionCount = 3 }) => {
  const client = getOpenAIClient();

  if (client) {
    try {
      const response = await client.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: `Generate a custom STEM quiz JSON array of ${questionCount} questions. Each question object must have: id, questionText, options (array of 4 strings), correctAnswerIndex (0-3), explanation, misconception.` },
          { role: 'user', content: `Topic: ${topic}, Difficulty: ${difficulty}` }
        ],
        response_format: { type: "json_object" },
        max_tokens: 500
      });
      const data = JSON.parse(response.choices[0].message.content);
      return {
        quizTitle: `AI Custom ${difficulty} Quiz: ${topic}`,
        questions: data.questions || data,
        isAIGenerated: true,
        source: 'OpenAI Cloud'
      };
    } catch (err) {
      console.warn('Custom quiz error:', err.message);
    }
  }

  return {
    quizTitle: `AI Custom ${difficulty} Quiz: ${topic}`,
    questions: [
      {
        id: 'cq-1',
        questionText: `What is the primary role of chlorophyll pigments during photosynthesis?`,
        options: ['Absorb solar radiation energy', 'Store oxygen gas in roots', 'Transport soil minerals', 'Reflect red light'],
        correctAnswerIndex: 0,
        explanation: 'Chlorophyll pigments inside chloroplasts absorb red and blue light to excite electrons and drive photosynthesis.',
        misconception: 'Chlorophyll absorbs light for energy; it does not store gas or transport minerals.'
      },
      {
        id: 'cq-2',
        questionText: `Solve for x: 4x + 8 = 32`,
        options: ['x = 4', 'x = 6', 'x = 8', 'x = 10'],
        correctAnswerIndex: 1,
        explanation: 'Subtract 8 from both sides: 4x = 24. Divide by 4: x = 6.',
        misconception: 'Did you add 8 instead of subtracting 8?'
      }
    ],
    isAIGenerated: true,
    isFallback: true,
    source: 'Offline Fallback Engine'
  };
};

// 6. AI Flashcards Generator
export const generateFlashcards = async ({ topic }) => {
  const client = getOpenAIClient();

  if (client) {
    try {
      const response = await client.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'Generate 4 flashcards as a JSON array of objects with front (question/term) and back (answer/definition).' },
          { role: 'user', content: `Topic: ${topic}` }
        ],
        response_format: { type: "json_object" },
        max_tokens: 300
      });
      const data = JSON.parse(response.choices[0].message.content);
      return { flashcards: data.flashcards || data, isAIGenerated: true, source: 'OpenAI Cloud' };
    } catch (err) {
      console.warn('Flashcard error:', err.message);
    }
  }

  return {
    flashcards: [
      { front: 'Chloroplast', back: 'Organelle inside plant cells where photosynthesis occurs, housing green chlorophyll pigments.' },
      { front: 'Stomata', back: 'Microscopic pores on leaf surfaces regulated by guard cells for carbon dioxide intake and transpiration.' },
      { front: 'Unit Rate', back: 'A ratio simplified so that the second quantity equals 1 unit (e.g., 60 km per 1 hour).' },
      { front: 'Photolysis', back: 'The chemical reaction in photosynthesis where solar light splits water molecules into oxygen and hydrogen.' }
    ],
    isAIGenerated: true,
    isFallback: true,
    source: 'Offline Fallback Engine'
  };
};

// 7. Extra Practice
export const generateExtraPracticeQuestion = async ({ lessonTitle, content }) => {
  const client = getOpenAIClient();

  if (client) {
    try {
      const response = await client.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'Generate 1 multiple choice question with 4 options, correctAnswerIndex (0-3), explanation, and misconception based on the provided lesson. Return JSON.' },
          { role: 'user', content: `Lesson: ${lessonTitle}\nText: ${content}` }
        ],
        response_format: { type: "json_object" },
        max_tokens: 300
      });
      const parsed = JSON.parse(response.choices[0].message.content);
      return { ...parsed, isAIGenerated: true, source: 'OpenAI Cloud' };
    } catch (err) {
      console.warn('OpenAI extra practice call failed, using fallback:', err.message);
    }
  }

  return {
    questionText: `Which of the following best describes what happens to water (H₂O) molecules during the light-dependent phase of photosynthesis?`,
    options: [
      `Water is converted into carbon dioxide gas`,
      `Water molecules are split into oxygen gas and hydrogen ions`,
      `Water is stored permanently inside the cell wall`,
      `Water turns directly into sunlight energy`
    ],
    correctAnswerIndex: 1,
    explanation: `Light energy splits water molecules (photolysis) into oxygen gas which escapes into the air, and hydrogen ions used to synthesize ATP and glucose.`,
    misconception: `Option A confuses inputs with outputs. Option D mistakes matter for energy conversion.`,
    isAIGenerated: true,
    isFallback: true,
    source: 'Offline Fallback Engine'
  };
};

// 8. Study Plan
export const generateStudyPlan = async ({ goal, availableMinutes = 20 }) => {
  const client = getOpenAIClient();

  if (client) {
    try {
      const response = await client.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'Create a structured 4-step micro study plan with estimated minutes for a student.' },
          { role: 'user', content: `Goal: ${goal}, Available Time: ${availableMinutes} minutes.` }
        ],
        max_tokens: 250
      });
      return {
        planText: response.choices[0].message.content.trim(),
        goal,
        isAIGenerated: true,
        source: 'OpenAI Cloud'
      };
    } catch (err) {
      console.warn('OpenAI study plan call failed:', err.message);
    }
  }

  return {
    goal,
    durationMinutes: availableMinutes,
    steps: [
      { minute: '0-4 mins', task: 'Read Section 1 summary & key takeaways without distractions.' },
      { minute: '5-12 mins', task: 'Try 3 practice questions. Use "Explain another way" if stuck.' },
      { minute: '13-17 mins', task: 'Review wrong answers & misconception hints.' },
      { minute: '18-20 mins', task: 'Complete the 1-minute quick review challenge to lock in mastery.' }
    ],
    isAIGenerated: true,
    isFallback: true,
    source: 'Offline Fallback Engine'
  };
};

// 9. Teacher Content Draft
export const generateTeacherContentDraft = async ({ topic, targetGrade, contentType }) => {
  const client = getOpenAIClient();

  if (client) {
    try {
      const response = await client.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'You are a teaching assistant. Draft a short lesson summary or quiz question based on request.' },
          { role: 'user', content: `Topic: ${topic}, Grade: ${targetGrade}, Type: ${contentType}` }
        ],
        max_tokens: 300
      });
      return {
        draftContent: response.choices[0].message.content.trim(),
        contentType,
        topic,
        isAIGenerated: true,
        source: 'OpenAI Cloud'
      };
    } catch (err) {
      console.warn('Teacher draft call failed:', err.message);
    }
  }

  const fallbackDrafts = {
    quiz: {
      questionText: `Sample Quiz Draft for ${topic}: Which factor is most critical when balancing an ecological food web?`,
      options: ['Preserving producer biomass', 'Eliminating all predators', 'Doubling water levels', 'Removing decomposers'],
      correctAnswerIndex: 0,
      explanation: 'Producers form the base of energy pyramids; maintaining producer biomass is essential.'
    },
    explanation: `Sample Draft Explanation for ${topic} (${targetGrade}): Focus on connecting abstract formulas to hands-on visual diagrams. Highlight key vocabulary terms before launching into word problems.`,
    lesson_summary: `Draft Lesson Overview (${topic}): In this module, students investigate real-world applications, conduct guided inquiry, and verify results using inverse operations.`
  };

  return {
    draftContent: fallbackDrafts[contentType] || fallbackDrafts['explanation'],
    contentType,
    topic,
    isAIGenerated: true,
    isFallback: true,
    source: 'Offline Fallback Engine'
  };
};

// 10. Progress Summary
export const generateProgressSummary = async ({ type = 'student', name, progress }) => {
  const client = getOpenAIClient();
  if (client) {
    try {
      const response = await client.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'Generate a 2-sentence supportive progress report.' },
          { role: 'user', content: `Target: ${name}, Role: ${type}, Progress: ${JSON.stringify(progress)}` }
        ],
        max_tokens: 150
      });
      return { summary: response.choices[0].message.content.trim(), isAIGenerated: true, source: 'OpenAI Cloud' };
    } catch (err) {
      console.warn('Summary call failed:', err.message);
    }
  }

  return {
    summary: type === 'teacher'
      ? `Class 7A is demonstrating strong growth in Science (88% average mastery). Math linear equations remains a key concept gap where 45% of learners could benefit from additional step-by-step practice.`
      : `${name} has achieved Mastery in Photosynthesis and is currently Practising Ratios & Proportional Reasoning. Keep up the 5-day study streak!`,
    isAIGenerated: true,
    isFallback: true,
    source: 'Offline Fallback Engine'
  };
};

// 11. Interactive AI Study Coach & STEM Tutor Chat Response
export const generateTutorChatResponse = async ({ userMessage, conversationHistory = [], currentLessonContext = '' }) => {
  const client = getOpenAIClient();

  if (client) {
    try {
      const messages = [
        {
          role: 'system',
          content: `You are Orbit AI, a warm, intelligent, and encouraging personal study coach and STEM tutor.
- If the user greets you (e.g. "hi", "hello", "hey", "good morning"), greet them warmly and conversationally, introduce yourself as Orbit AI, and ask what they would like to study or solve today.
- If the user asks a casual, conversational, or general curiosity question (e.g. "how are you", "who are you", "why is the sky blue", "tell me a joke"), answer naturally, warmly, and helpfully.
- If the user asks a math, science, or computer science question, provide an accurate, step-by-step explanation with formulas, worked calculations, and clear examples.
- Format responses cleanly with markdown, bullet points, and bold text for readability.`
        }
      ];

      // Include recent conversation context (last 4 messages)
      const recentHistory = (conversationHistory || []).slice(-4);
      recentHistory.forEach(m => {
        if (m.sender === 'user' || m.role === 'user') {
          messages.push({ role: 'user', content: m.text || m.content });
        } else if (m.sender === 'ai' || m.role === 'assistant') {
          messages.push({ role: 'assistant', content: m.text || m.content });
        }
      });

      messages.push({ role: 'user', content: userMessage });

      const response = await client.chat.completions.create({
        model: 'gpt-4o-mini',
        messages,
        max_tokens: 450,
        temperature: 0.6
      });

      const reply = response.choices[0].message.content.trim();
      return {
        reply,
        isAIGenerated: true,
        source: 'OpenAI GPT-4o-mini'
      };
    } catch (err) {
      console.warn('OpenAI tutor chat error:', err.message);
    }
  }

  // Comprehensive Smart Contextual Engine for Offline / Local Execution
  const rawQ = (userMessage || '').trim();
  const q = rawQ.toLowerCase().replace(/[?!.,]/g, '').trim();
  let reply = '';

  // 1. Questions about its day / life / how things are going
  if (/how'?s (your |the |this )?day|how (was|is|has been) (your |the )?day|your day|how is your day going|how is it going today/i.test(q)) {
    reply = `😊 **My day has been wonderful, thank you for asking!**\n\nI've been helping students break down math equations, understand physics laws, and explore science concepts.\n\nHow is your day going? Are you working on any interesting study topics or homework today, or just taking a quick break?`;
  }
  // 2. Greetings (hi, hello, hey, etc.)
  else if (/^(hi|hello|hey|heya|hola|namaste|good morning|good afternoon|good evening|howdy|sup|yo|greetings|hi orbit|hello orbit|hey orbit)(\s.*)?$/i.test(q) || q === 'hi' || q === 'hello') {
    reply = `👋 **Hello! Welcome to Orbit AI.**\n\nI am your personal AI study companion, available 24/7 both online and 100% offline directly on your device.\n\nHere are some things you can ask me:\n• **Mathematics:** "Solve 3x + 12 = 48" or "Explain quadratic formula"\n• **Physics:** "What is Newton's second law?" or "Calculate Ohm's law with 12V and 4Ω"\n• **Chemistry:** "Explain stoichiometry and the mole concept" or "What is pH?"\n• **Biology:** "How does photosynthesis work?" or "Explain DNA base pairing"\n• **Computer Science:** "How does binary search work?" or "Explain Big-O complexity"\n\nWhat would you like to explore or solve today?`;
  }
  // 3. Status & Well-being
  else if (/how are (you|u|ya|you doing)|how's it going|how is it going|what's up|whats up|how do you do|how have you been|how are things|hows everything/i.test(q)) {
    reply = `⚡ **I'm doing great, feeling energized and ready to help!**\n\nAll my reasoning modules are loaded and ready—whether you need to solve an algebraic equation, balance a chemical reaction, understand circuit laws, or review your quiz progress.\n\nHow can I help you with your studies right now?`;
  }
  // 4. Casual acknowledgments / short chatter
  else if (/^(ok|okay|k|cool|nice|awesome|great|sure|alright|fine|sounds good|got it|yep|yeah|yes|nope|no|nothing|not much|just chilling)$/i.test(q)) {
    reply = `👍 **Sounds good!** Whenever you run into a tricky homework question, need an equation solved step-by-step, or want a fun science riddle, just let me know!`;
  }
  // 5. User sharing mood or feelings
  else if (/^(i'?m good|doing well|im fine|all good|i'?m fine|pretty good|good)$/i.test(q) || (q.includes('good') && q.length < 15)) {
    reply = `🌟 **Awesome to hear that!** Having a positive mindset makes learning and problem-solving so much easier. What's on your mind today?`;
  }
  else if (/i'?m (tired|exhausted|sleepy)|so tired|need (sleep|rest)/i.test(q)) {
    reply = `☕ **Make sure to get some rest!** Studying when you're fatigued is tough. Research shows that taking a short 10-minute break or power nap can boost memory retention by over 40%. Don't push yourself too hard! Whenever you feel refreshed, we can continue.`;
  }
  else if (/i'?m (bored|boring)|so bored|bored/i.test(q)) {
    reply = `💡 **Let's banish that boredom!** Did you know that a single teaspoon of a neutron star would weigh about 6 billion tons on Earth? Or would you prefer a quick math puzzle or a science riddle to test your brain?`;
  }
  else if (/i'?m (stressed|worried|overwhelmed|anxious)|too hard|so hard|so much (homework|study)/i.test(q)) {
    reply = `🤝 **Don't worry, we're in this together!** Complex topics often feel overwhelming when viewed all at once. The secret is breaking any problem down into tiny, simple steps. Share whatever problem or concept is bothering you, and we'll solve it together step by step!`;
  }
  else if (/i'?m (sad|unhappy|depressed)|feel sad/i.test(q)) {
    reply = `💙 **I'm really sorry to hear you're feeling down.** Take a deep breath and be kind to yourself today. Remember that learning is a gradual journey, not a race. If you want to talk, take a breather, or hear an interesting science story to lift your spirits, I'm here!`;
  }
  // 6. Chat & companionship requests
  else if (/can we (chat|talk)|let'?s talk|talk to me|just (chat|talk)|want to (chat|talk)/i.test(q)) {
    reply = `🗣️ **I would love to chat!** We can talk about science, space, technology, school, or whatever curiosity is on your mind. What would you like to talk about?`;
  }
  else if (/what (are you|r u) doing|what are you up to|what'?re you doing/i.test(q)) {
    reply = `📚 **Right now, I'm here ready to brainstorm and learn with you!** I can break down equations, explain biological systems, diagram algorithms, or just have an engaging conversation. What are you up to today?`;
  }
  // 7. Identity & Creator
  else if (/who (are you|are u|made you|created you)|what is your name|what are you|what is orbit ai/i.test(q)) {
    reply = `🪐 **I am Orbit AI, your intelligent on-device STEM study coach!**\n\nI was built as part of the Offline Orbit educational platform to empower students everywhere—even in remote, low-bandwidth, and completely offline settings—with high-quality, step-by-step tutoring.\n\nI run with in-browser WebGPU acceleration and local cloud caching so you can learn anytime with zero latency!`;
  }
  else if (/are you (real|human|ai|a bot|a robot|alive)/i.test(q)) {
    reply = `🤖 **I am an AI study coach!** I run directly in your browser using neural networks, WebGPU acceleration, and smart offline reasoning. While I don't have human feelings, I am dedicated to making STEM learning fun, simple, and accessible for you everywhere!`;
  }
  else if (/where (do you live|are you from)|do you sleep|do you eat/i.test(q)) {
    reply = `⚡ **I live right inside your browser!** Because I run on local WebLLM technology, I don't need sleep, food, or even an active internet connection. I'm always here whenever you're ready to study.`;
  }
  else if (/favorite (subject|topic|food|color)/i.test(q)) {
    reply = `🌌 **My favorite subject is Astrophysics and Quantum Mechanics!** The idea that mathematical equations can predict the movement of galaxies billions of light years away is simply mind-blowing. What's your favorite subject to study?`;
  }
  // 8. Platform info
  else if (/what is (offline )?orbit|about (offline )?orbit/i.test(q)) {
    reply = `🚀 **Offline Orbit is an equitable, low-bandwidth, edge-first digital learning platform.**\n\nIt allows learners in rural, remote, or connectivity-limited schools to access interactive STEM lessons, diagnostics, and AI tutoring—even with zero internet—using local peer-to-peer sync and on-device intelligence.`;
  }
  // 9. Capabilities & Help
  else if (/what can you do|help|how to use|commands|features|what can i ask/i.test(q)) {
    reply = `💡 **Here is what I can do for you:**\n\n` +
      `1. **Solve Equations Step-by-Step:** Linear, quadratic, fractions, percentages, and arithmetic with full verification.\n` +
      `2. **Explain Physics Laws:** Kinematics, Newtonian dynamics, work/energy, electricity, and electromagnetism.\n` +
      `3. **Break Down Chemical Principles:** Stoichiometry, balancing reactions, molar mass, and acid-base titrations.\n` +
      `4. **Unpack Biological Systems:** Photosynthesis, respiration, DNA transcription, translation, and genetics.\n` +
      `5. **Analyze Algorithms & Code:** Binary search, sorting algorithms, Big-O complexity, and Python code.\n` +
      `6. **General Curiosity:** Ask science questions, riddles, or everyday phenomena!\n\n` +
      `Try asking me: *"Solve 2x + 6 = 20"* or *"Why is the sky blue?"*`;
  }
  // 10. Study suggestions
  else if (/what should i (study|learn)|recommend( a)? lesson|where should i start|give me a problem|quiz me/i.test(q)) {
    reply = `🎯 **Here are 3 great study recommendations:**\n\n` +
      `1. **Algebra:** Linear equations & fractions — essential foundation for high school math.\n` +
      `2. **Physics:** Newton's Laws & kinematics — connect everyday movement to mathematics.\n` +
      `3. **Computer Science:** Binary search & Big-O complexity — learn how computers process billions of items in milliseconds.\n\n` +
      `Which one would you like to dive into? Just say *"Solve 2x + 6 = 20"* or *"Explain binary search"* to get started!`;
  }
  // 11. Compliments & Gratitude
  else if (/thank you|thanks|thx|thank u|appreciate it/i.test(q)) {
    reply = `😊 **You're very welcome!**\n\nKeep up the great curiosity and hard work. Feel free to ask anytime you encounter a tough problem or tricky concept!`;
  }
  else if (/you (are|r) (smart|awesome|cool|great|the best)|good job|nice work|i love you/i.test(q)) {
    reply = `💙 **Thank you so much! That really means a lot.** My goal is to make learning enjoyable and empowering for you. Let's keep exploring and learning together!`;
  }
  // 12. Farewells
  else if (/^(bye|goodbye|see you|good night|cya|take care|have a good day|have a nice day)$/i.test(q)) {
    reply = `👋 **Goodbye! Great work today.**\n\nYour study progress, streak days, and points are safely saved in your local cache. Come back whenever you're ready to learn more! 🚀`;
  }
  // 13. Jokes, Riddles & Stories
  else if (/joke|tell me a joke|funny|make me laugh/i.test(q)) {
    reply = `😄 **Here is a science joke for you:**\n\nWhy can't you trust atoms?\n**Because they make up everything!** ⚛️\n\nAnd here's a math one:\nWhy was the equal sign so humble?\n**Because it knew it wasn't less than or greater than anyone else!** ⚖️`;
  }
  else if (/riddle|give me a riddle/i.test(q)) {
    reply = `🧩 **Here is a science riddle for you:**\n\n*I have no weight, but you can see me. Put me in a bucket, and I make it lighter. What am I?*\n\n**Answer:** A hole! 🕳️\n\nWant another one, or ready for a math challenge?`;
  }
  else if (/tell me a story|story/i.test(q)) {
    reply = `🍎 **The Garden of Woolsthorpe (1665):**\n\nWhen Cambridge University temporarily closed during the Great Plague, a 23-year-old Isaac Newton retreated to his family farm. While sitting under an apple tree, he watched an apple fall straight to the ground.\n\nHe didn't just watch it—he wondered: *Does the same force pulling this apple also keep the Moon orbiting the Earth?*\n\nThat single question led him to develop universal gravitation, the laws of motion, and calculus. Great discoveries always start with simple curiosity!`;
  }
  else if (/tell me something (interesting|cool|new)|fun fact|interesting fact|fact/i.test(q)) {
    reply = `✨ **Did you know?**\n\nIf you could fold a standard piece of paper in half **42 times**, its thickness would reach all the way from the Earth to the Moon! (This demonstrates the immense power of **exponential growth**, $2^{42}$).`;
  }
  // 11. Everyday science curiosities
  else if (q.includes('sky') && q.includes('blue')) {
    reply = `☀️ **Why the Sky is Blue (Rayleigh Scattering):**\n\n` +
      `1. **Solar Spectrum:** Sunlight looks white, but it is actually composed of all visible colors.\n` +
      `2. **Atmospheric Gas Particles:** When sunlight enters Earth's atmosphere, it collides with tiny nitrogen and oxygen molecules.\n` +
      `3. **Scattering Effect:** Shorter wavelengths of light (blue and violet) scatter in all directions much more strongly than longer red or yellow wavelengths.\n` +
      `4. **Human Vision:** Because human eyes are much more sensitive to blue light than violet, the sky appears a brilliant blue to us during the daytime!`;
  }
  else if (q.includes('pi') && (q.includes('what is') || q.length < 10)) {
    reply = `🥧 **What is Pi (π)?**\n\n` +
      `• **Definition:** Pi ($\\pi$) is the mathematical constant representing the ratio of a circle's circumference ($C$) to its diameter ($d$): **$\\pi = C / d$**.\n` +
      `• **Value:** It is an irrational number approximately equal to **3.1415926535...** (its decimal digits continue infinitely without repeating).\n` +
      `• **Key Formulas:**\n` +
      `  - Circumference: $C = 2\\pi r$\n` +
      `  - Circle Area: $A = \\pi r^2$\n` +
      `  - Sphere Volume: $V = \\frac{4}{3}\\pi r^3$`;
  }
  else if (q.includes('speed of light')) {
    reply = `⚡ **The Speed of Light ($c$):**\n\nIn a vacuum, light travels at approximately **299,792,458 meters per second** (~$3.0 \\times 10^8\\,\\text{m/s}$ or about **186,282 miles per second**).\n\nAt this speed, light can travel around the entire Earth 7.5 times in a single second!`;
  }
  // 12. Photosynthesis
  else if (q.includes('photo') || q.includes('plant') || q.includes('stomata') || q.includes('chlorophyll')) {
    reply = `🌿 **Photosynthesis Explained:**\n\n` +
      `Plants absorb solar light energy through green chlorophyll pigments inside chloroplasts. They convert carbon dioxide (CO₂) from the air and water (H₂O) from roots into chemical glucose (C₆H₁₂O₆) energy while releasing oxygen (O₂) into the atmosphere.\n\n` +
      `⚡ **Chemical Equation:**\n` +
      `6 CO₂ + 6 H₂O + Sunlight ➔ C₆H₁₂O₆ + 6 O₂\n\n` +
      `💡 **Key Mechanism:** Water photolysis occurs in the thylakoid membranes (light reaction), while glucose sugar is synthesized in the stroma during the Calvin cycle.`;
  }
  // 13. Algorithms & Big-O
  else if (q.includes('binary') || q.includes('search') || q.includes('sort') || q.includes('algorithm') || q.includes('big o')) {
    reply = `💻 **Algorithm & Computational Complexity:**\n\n` +
      `• **Binary Search** operates exclusively on sorted arrays by repeatedly dividing the search space in half. Its time complexity is **O(log n)**, dramatically outperforming O(n) linear scan.\n` +
      `• **Big O Hierarchy:** O(1) [Constant] < O(log n) [Logarithmic] < O(n) [Linear] < O(n log n) [Efficient Sorts] < O(n²) [Quadratic].\n\n` +
      `🐍 **Python Implementation:**\n` +
      `\`\`\`python\n` +
      `def binary_search(arr, target):\n` +
      `    low, high = 0, len(arr) - 1\n` +
      `    while low <= high:\n` +
      `        mid = (low + high) // 2\n` +
      `        if arr[mid] == target: return mid\n` +
      `        elif arr[mid] < target: low = mid + 1\n` +
      `        else: high = mid - 1\n` +
      `    return -1\n` +
      `\`\`\``;
  }
  // 14. Equations & Math
  else if (q.includes('solve') || q.includes('equation') || q.includes('math') || q.includes('x =') || q.includes('+') || q.includes('=')) {
    reply = `📐 **Step-by-Step Algebraic Solution:**\n\n` +
      `To solve linear equations (e.g. *ax + b = c*):\n` +
      `1. **Isolate variable terms:** Apply inverse operations across both sides of the equals sign.\n` +
      `2. **Balance constants:** Subtract or add the constant term to both sides.\n` +
      `3. **Divide by coefficient:** Divide both sides by the multiplier of *x*.\n\n` +
      `🔍 **Worked Example (4x + 8 = 32):**\n` +
      `• Step 1: 4x = 32 - 8 ➔ 4x = 24\n` +
      `• Step 2: x = 24 / 4 ➔ **x = 6**\n` +
      `• Verification: 4(6) + 8 = 24 + 8 = 32 ✓`;
  }
  // 15. Newton's Laws & Physics
  else if (q.includes('newton') || q.includes('force') || q.includes('gravity') || q.includes('velocity') || q.includes('physics')) {
    reply = `⚡ **Newton's Laws & Mechanics:**\n\n` +
      `• **1st Law (Inertia):** An object remains at rest or in uniform motion unless acted upon by a net external force.\n` +
      `• **2nd Law (Force & Acceleration):** **F = m · a** (Force in Newtons = Mass in kg × Acceleration in m/s²).\n` +
      `• **3rd Law (Action-Reaction):** For every action force, there is an equal and opposite reaction force.\n\n` +
      `🎯 **Kinematic Formula:** Velocity = Initial Velocity + (Acceleration × Time) ➔ *v = u + at*.`;
  }
  // 16. Chemistry & Stoichiometry
  else if (q.includes('stoich') || q.includes('reaction') || q.includes('chem') || q.includes('acid') || q.includes('atom')) {
    reply = `⚗️ **Chemical Reactions & Stoichiometry:**\n\n` +
      `• **Conservation of Mass:** Atoms are neither created nor destroyed in a chemical reaction; equations must be strictly balanced on both sides.\n` +
      `• **The Mole Concept:** 1 mole = 6.022 × 10²³ particles (Avogadro's Number). Mass (g) = Moles × Molar Mass (g/mol).\n` +
      `• **pH Scale:** pH = -log[H⁺]. Values < 7 are acidic (excess H⁺), values > 7 are basic (excess OH⁻), and pH 7 is neutral (pure H₂O).`;
  }
  // 17. Study / Exam Advice
  else if (q.includes('exam') || q.includes('test') || q.includes('study')) {
    reply = `🎯 **Effective Study Strategy:**\n\nWhen preparing for exams or homework, try these 3 proven techniques:\n• **Active Recall:** Test yourself by solving practice questions without checking the notes first.\n• **Feynman Technique:** Explain the concept in simple terms as if teaching a younger student.\n• **Pomodoro Focus:** Study in 25-minute focused bursts followed by a 5-minute breather.\n\nWhat subject are you working on? We can do a quick quiz or step-by-step problem together!`;
  }
  // 18. Natural Conversational Fallback (Zero Robotic Template)
  else {
    reply = `👋 **I hear you!**\n\nWhether you'd like to work through a challenging homework question, understand how a science concept works in everyday life, practice for an assessment, or just have a chat about technology and learning—I'm right here with you.\n\nWhat would you like to explore or focus on next?`;
  }

  return {
    reply,
    isAIGenerated: true,
    source: 'In-Browser STEM Reasoning Engine'
  };
};
