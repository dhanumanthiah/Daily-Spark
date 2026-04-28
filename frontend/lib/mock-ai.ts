export type ActivityData = {
  emoji: string;
  name: string;
  tagline: string;
  duration: string;
  starter: string;
  howTo: string;
  watchFor: string;
  builds: string[];
};

export type FormData = {
  name: string;
  age: string;
  interests: string[];
  time: string;
  mood: string;
  hasSpecialNeeds: boolean;
  specialNeedsNote: string;
};

// This simulates the AI generation process since we are building a frontend-only app
export async function generateActivity(data: FormData): Promise<ActivityData> {
  // Simulate network delay (1.5s to 3s)
  const delay = Math.floor(Math.random() * 1500) + 1500;
  await new Promise((resolve) => setTimeout(resolve, delay));

  // Simulate a random failure (10% chance) to show the error state
  if (Math.random() < 0.1) {
    throw new Error("AI generation failed. Please try again.");
  }

  const { name, age, interests, time, mood, hasSpecialNeeds, specialNeedsNote } = data;
  
  const primaryInterest = interests.length > 0 ? interests[0] : "Exploring";
  
  // Generate dynamic content based on inputs
  let emoji = "✨";
  let activityName = "";
  let tagline = "";
  let starter = "";
  let howTo = "";
  let watchFor = "";
  let builds = ["Connection", "Joy", "Focus"];

  // Customize based on interest
  switch (primaryInterest) {
    case "Dinosaurs":
      emoji = "🦖";
      activityName = "Dino Stomp & Roar";
      tagline = "Unleash your inner T-Rex together.";
      starter = `Hey ${name}, I heard there's a dinosaur hiding in the living room! Want to help me find it?`;
      howTo = "Take turns pretending to be different dinosaurs. Stomp heavily for a T-Rex, stretch tall for a Brachiosaurus, and make your best roar sounds.";
      watchFor = "Notice how they use their body to express different sizes and emotions.";
      builds = ["Gross Motor Skills", "Imagination", "Emotional Release"];
      break;
    case "Drawing":
      emoji = "🎨";
      activityName = "Silly Monster Portraits";
      tagline = "A collaborative masterpiece of giggles.";
      starter = `${name}, I need your help drawing the silliest monster ever. I'll draw the head, you draw the body!`;
      howTo = "Take a piece of paper and take turns adding one body part at a time. Don't worry about making it perfect—the sillier, the better!";
      watchFor = "Watch their eyes light up when you draw something unexpected or funny.";
      builds = ["Creativity", "Turn-taking", "Fine Motor Skills"];
      break;
    case "Legos":
      emoji = "🧱";
      activityName = "Tower of Teamwork";
      tagline = "Building higher, together.";
      starter = `Let's see how tall of a tower we can build together, ${name}. You pick the first piece!`;
      howTo = "Take turns adding one block at a time to build a single tower. Talk about the colors and shapes as you go.";
      watchFor = "Notice their problem-solving skills when the tower starts to wobble.";
      builds = ["Spatial Awareness", "Patience", "Cooperation"];
      break;
    case "Music":
      emoji = "🥁";
      activityName = "Kitchen Band Jam";
      tagline = "Making joyful noise with everyday items.";
      starter = `${name}, grab a wooden spoon! It's time for our kitchen band practice.`;
      howTo = "Use pots, pans, or plastic containers as drums. Start a simple beat and ask them to copy you, then let them lead the rhythm.";
      watchFor = "Watch how they respond to changes in tempo—fast vs. slow.";
      builds = ["Rhythm", "Listening Skills", "Self-Expression"];
      break;
    case "Space":
      emoji = "🚀";
      activityName = "Living Room Moonwalk";
      tagline = "A zero-gravity adventure at home.";
      starter = `Astronaut ${name}, suit up! We're going on a mission to the moon.`;
      howTo = "Pretend the floor is the moon. Move in slow motion, taking giant, floaty steps. Collect 'moon rocks' (pillows or toys) along the way.";
      watchFor = "Notice their balance and body control as they move in slow motion.";
      builds = ["Body Awareness", "Imaginative Play", "Balance"];
      break;
    case "Cooking":
      emoji = "👨‍🍳";
      activityName = "Magic Potion Mixing";
      tagline = "A sensory kitchen experiment.";
      starter = `Chef ${name}, I need an assistant to help me mix a special magic potion today!`;
      howTo = "Get a bowl of water and let them add safe kitchen items like a pinch of salt, a drop of food coloring, or some ice cubes. Stir it up with a big spoon.";
      watchFor = "Watch their curiosity as the ingredients change the water.";
      builds = ["Sensory Exploration", "Following Directions", "Curiosity"];
      break;
    case "Stories":
      emoji = "📖";
      activityName = "Pass-the-Story";
      tagline = "Weaving a tale, one sentence at a time.";
      starter = `I have a story to tell you, ${name}, but I only know the beginning. I need you to help me finish it!`;
      howTo = "Start with 'Once upon a time, there was a tiny...' and let them fill in the blank. Take turns adding one sentence at a time to see where the story goes.";
      watchFor = "Notice the themes they introduce—it often reflects what's on their mind.";
      builds = ["Language Skills", "Narrative Thinking", "Active Listening"];
      break;
    case "Dancing":
      emoji = "💃";
      activityName = "Freeze Dance Party";
      tagline = "Shake the sillies out and freeze!";
      starter = `I'm turning on your favorite song, ${name}! Let's see your best dance moves.`;
      howTo = "Play a song and dance wildly together. Randomly pause the music and yell 'Freeze!' See who can hold their pose the longest.";
      watchFor = "Watch their self-regulation as they try to stop their body suddenly.";
      builds = ["Self-Regulation", "Gross Motor Skills", "Joyful Connection"];
      break;
    case "Sports":
      emoji = "⚽";
      activityName = "Balloon Keep-Uppy";
      tagline = "A gentle challenge of focus and reflexes.";
      starter = `${name}, let's see how long we can keep this balloon from touching the floor!`;
      howTo = "Toss a balloon in the air and take turns tapping it up. Count how many taps you can get together before it hits the ground.";
      watchFor = "Notice their hand-eye coordination and how they track the balloon.";
      builds = ["Hand-Eye Coordination", "Teamwork", "Counting"];
      break;
    case "Animals":
      emoji = "🦁";
      activityName = "Animal Charades";
      tagline = "Guessing games with furry friends.";
      starter = `I'm thinking of an animal, ${name}. Watch how I move and see if you can guess what I am!`;
      howTo = "Take turns acting out different animals without making sounds. Crawl, hop, or slither, and let the other person guess.";
      watchFor = "Watch their non-verbal communication skills as they try to express an animal's traits.";
      builds = ["Non-verbal Communication", "Empathy", "Observation"];
      break;
    default:
      emoji = "🌟";
      activityName = "Mirror Mirror";
      tagline = "A quiet game of connection and reflection.";
      starter = `Let's play a game, ${name}. Sit facing me, and try to copy exactly what I do.`;
      howTo = "Sit face-to-face. Make slow movements with your hands or silly faces, and have them mirror you. Then switch and let them be the leader.";
      watchFor = "Notice the intense eye contact and focus as they try to match you.";
      builds = ["Focus", "Empathy", "Visual Tracking"];
      break;
  }

  // Adjust based on mood
  if (mood === "Quiet & Calm" || mood === "A bit sad") {
    activityName = "Cozy " + activityName;
    howTo += " Keep your voices soft and movements gentle.";
  } else if (mood === "Hyper" || mood === "Happy & Energetic") {
    activityName = "Super " + activityName;
    howTo += " Use lots of energy and big movements!";
  }

  // Adjust based on special needs
  if (hasSpecialNeeds && specialNeedsNote) {
    howTo += ` (Note: Adapted for ${specialNeedsNote} - keep sensory input manageable and follow their lead).`;
  }

  return {
    emoji,
    name: activityName,
    tagline,
    duration: time,
    starter,
    howTo,
    watchFor,
    builds
  };
}

