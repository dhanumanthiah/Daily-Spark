export type ActivityData = {
  id: string;
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

const activitiesDB: Record<string, Omit<ActivityData, 'duration' | 'id'>[]> = {
  "Dinosaurs": [
    { emoji: "🦖", name: "Dino Stomp & Roar", tagline: "Unleash your inner T-Rex together.", starter: "Hey [NAME], I heard there's a dinosaur hiding in the living room! Want to help me find it?", howTo: "Take turns pretending to be different dinosaurs. Stomp heavily for a T-Rex, stretch tall for a Brachiosaurus, and make your best roar sounds.", watchFor: "Notice how they use their body to express different sizes and emotions.", builds: ["Gross Motor Skills", "Imagination", "Emotional Release"] },
    { emoji: "🦕", name: "Fossil Hunters", tagline: "A prehistoric search and rescue.", starter: "Dr. [NAME], we have a mission! We need to find the missing dinosaur bones.", howTo: "Hide a few small toys or objects around the room. Give them a 'magnifying glass' (their hands) and search together.", watchFor: "Watch their problem-solving skills as they look in tricky spots.", builds: ["Problem Solving", "Observation", "Teamwork"] },
    { emoji: "🌋", name: "Volcano Jump", tagline: "The floor is hot lava!", starter: "Watch out [NAME], the volcano is erupting! We need to jump to safety.", howTo: "Place pillows on the floor as 'safe rocks'. Jump from rock to rock without touching the 'lava' floor.", watchFor: "Notice their balance and coordination as they leap.", builds: ["Balance", "Gross Motor Skills", "Following Rules"] }
  ],
  "Drawing": [
    { emoji: "🎨", name: "Silly Monster Portraits", tagline: "A collaborative masterpiece of giggles.", starter: "[NAME], I need your help drawing the silliest monster ever. I'll draw the head, you draw the body!", howTo: "Take a piece of paper and take turns adding one body part at a time. Don't worry about making it perfect—the sillier, the better!", watchFor: "Watch their eyes light up when you draw something unexpected or funny.", builds: ["Creativity", "Turn-taking", "Fine Motor Skills"] },
    { emoji: "🖍️", name: "Shadow Tracing", tagline: "Capturing the magic of light.", starter: "Look at the shadows, [NAME]! Let's see if we can trap them on paper.", howTo: "Place a toy on a piece of paper near a window or flashlight. Trace the outline of the shadow together.", watchFor: "Notice their focus as they try to keep the pen on the line.", builds: ["Fine Motor Skills", "Focus", "Science Basics"] },
    { emoji: "✏️", name: "Blindfold Artist", tagline: "Trust your hands, not your eyes.", starter: "Close your eyes, [NAME]! Let's see what we can draw without looking.", howTo: "Take turns closing your eyes and trying to draw a simple object (like a house or a cat). Laugh at the funny results together.", watchFor: "Watch how they use spatial awareness to guess where to draw.", builds: ["Spatial Awareness", "Humor", "Sensory Play"] }
  ],
  "Legos": [
    { emoji: "🧱", name: "Tower of Teamwork", tagline: "Building higher, together.", starter: "Let's see how tall of a tower we can build together, [NAME]. You pick the first piece!", howTo: "Take turns adding one block at a time to build a single tower. Talk about the colors and shapes as you go.", watchFor: "Notice their problem-solving skills when the tower starts to wobble.", builds: ["Spatial Awareness", "Patience", "Cooperation"] },
    { emoji: "🌈", name: "Color Sort Race", tagline: "A fast-paced sorting challenge.", starter: "Ready, set, sort! [NAME], can you find all the red pieces before I find the blue ones?", howTo: "Dump a pile of blocks and race to sort them by color into different piles.", watchFor: "Watch their quick decision-making and color recognition.", builds: ["Color Recognition", "Sorting", "Quick Thinking"] },
    { emoji: "🌉", name: "Bridge Builders", tagline: "Connecting two worlds.", starter: "[NAME], these two toys need to visit each other. Can we build a bridge for them?", howTo: "Place two objects a short distance apart and work together to build a bridge between them using blocks.", watchFor: "Notice their engineering ideas and how they test the bridge's strength.", builds: ["Engineering", "Problem Solving", "Teamwork"] }
  ],
  "Music": [
    { emoji: "🥁", name: "Kitchen Band Jam", tagline: "Making joyful noise with everyday items.", starter: "[NAME], grab a wooden spoon! It's time for our kitchen band practice.", howTo: "Use pots, pans, or plastic containers as drums. Start a simple beat and ask them to copy you, then let them lead the rhythm.", watchFor: "Watch how they respond to changes in tempo—fast vs. slow.", builds: ["Rhythm", "Listening Skills", "Self-Expression"] },
    { emoji: "🎶", name: "Stop and Go Singing", tagline: "A musical game of control.", starter: "Let's sing your favorite song, [NAME], but when I raise my hand, we have to stop instantly!", howTo: "Sing a familiar song together. Randomly raise your hand to signal 'stop', then lower it to resume singing.", watchFor: "Notice their self-regulation as they abruptly stop singing.", builds: ["Self-Regulation", "Listening", "Joy"] },
    { emoji: "🥛", name: "Water Glass Chimes", tagline: "Discovering the notes of water.", starter: "Listen to this, [NAME]! Did you know water can make music?", howTo: "Fill a few glasses with different amounts of water. Gently tap them with a spoon to hear the different pitches.", watchFor: "Watch their curiosity as they discover which glass makes the highest sound.", builds: ["Sensory Exploration", "Pitch Recognition", "Gentle Touch"] }
  ],
  "Sports": [
    { emoji: "⚽", name: "Balloon Keep-Uppy", tagline: "A gentle challenge of focus and reflexes.", starter: "[NAME], let's see how long we can keep this balloon from touching the floor!", howTo: "Toss a balloon in the air and take turns tapping it up. Count how many taps you can get together before it hits the ground.", watchFor: "Notice their hand-eye coordination and how they track the balloon.", builds: ["Hand-Eye Coordination", "Teamwork", "Counting"] },
    { emoji: "🧦", name: "Sock Basketball", tagline: "Indoor hoops with soft shots.", starter: "It's game time, [NAME]! Let's see who can score the most points.", howTo: "Roll up some clean socks into balls and place a laundry basket a few feet away. Take turns tossing the socks in.", watchFor: "Watch how they adjust their throw based on whether they miss short or long.", builds: ["Motor Planning", "Depth Perception", "Turn-taking"] },
    { emoji: "🏃", name: "Living Room Obstacle Course", tagline: "Crawl, jump, and balance.", starter: "Welcome to the ultimate challenge, [NAME]! Can you make it through the course?", howTo: "Set up pillows to jump over, a blanket to crawl under, and a string to balance on. Time them as they go through.", watchFor: "Notice their agility and how they follow the sequence of steps.", builds: ["Agility", "Following Multi-step Directions", "Gross Motor Skills"] }
  ],
  "Animals": [
    { emoji: "🦁", name: "Animal Charades", tagline: "Guessing games with furry friends.", starter: "I'm thinking of an animal, [NAME]. Watch how I move and see if you can guess what I am!", howTo: "Take turns acting out different animals without making sounds. Crawl, hop, or slither, and let the other person guess.", watchFor: "Watch their non-verbal communication skills as they try to express an animal's traits.", builds: ["Non-verbal Communication", "Empathy", "Observation"] },
    { emoji: "🧸", name: "Vet Clinic", tagline: "Caring for our plush friends.", starter: "Oh no, [NAME], your teddy bear has a tummy ache! We need to be the doctors.", howTo: "Gather stuffed animals and pretend to examine them. Use a toy stethoscope or just your hands to check their heartbeats and give them 'medicine'.", watchFor: "Notice their nurturing behavior and empathy towards the toys.", builds: ["Empathy", "Role Play", "Nurturing"] },
    { emoji: "🦆", name: "Follow the Leader Flock", tagline: "Moving together like a family of ducks.", starter: "Quack quack, [NAME]! I'm the mama duck, follow me!", howTo: "Waddle around the house making animal noises. Have them follow exactly in your footsteps, then switch so they are the leader.", watchFor: "Watch their spatial awareness as they try to stay right behind you.", builds: ["Spatial Awareness", "Leadership", "Following Directions"] }
  ],
  "Space": [
    { emoji: "🚀", name: "Living Room Moonwalk", tagline: "A zero-gravity adventure at home.", starter: "Astronaut [NAME], suit up! We're going on a mission to the moon.", howTo: "Pretend the floor is the moon. Move in slow motion, taking giant, floaty steps. Collect 'moon rocks' (pillows or toys) along the way.", watchFor: "Notice their balance and body control as they move in slow motion.", builds: ["Body Awareness", "Imaginative Play", "Balance"] },
    { emoji: "⭐", name: "Starry Night Flashlight", tagline: "Constellations on the ceiling.", starter: "Let's turn off the lights, [NAME], and make our own stars.", howTo: "Poke small holes in a piece of paper or foil, place it over a flashlight, and shine it on the ceiling in a dark room.", watchFor: "Watch their wonder and how they try to reach for the light.", builds: ["Visual Tracking", "Wonder", "Calmness"] },
    { emoji: "🛸", name: "Alien Encounter", tagline: "Greetings from planet Earth!", starter: "Beep boop! [NAME], I am an alien. How do humans say hello?", howTo: "Pretend to be an alien who doesn't know how everyday objects work. Have your child explain things like a spoon or a shoe to you.", watchFor: "Notice their communication skills as they explain simple concepts.", builds: ["Communication", "Perspective Taking", "Humor"] }
  ],
  "Cooking": [
    { emoji: "👨‍🍳", name: "Magic Potion Mixing", tagline: "A sensory kitchen experiment.", starter: "Chef [NAME], I need an assistant to help me mix a special magic potion today!", howTo: "Get a bowl of water and let them add safe kitchen items like a pinch of salt, a drop of food coloring, or some ice cubes. Stir it up with a big spoon.", watchFor: "Watch their curiosity as the ingredients change the water.", builds: ["Sensory Exploration", "Following Directions", "Curiosity"] },
    { emoji: "🥪", name: "Funny Face Snacks", tagline: "Edible art on a plate.", starter: "[NAME], let's make our snack smile back at us!", howTo: "Use crackers, cheese, fruit, or veggies to create faces on a plate. Talk about the emotions the faces are showing before eating them.", watchFor: "Notice their fine motor skills as they place small pieces.", builds: ["Fine Motor Skills", "Emotional Vocabulary", "Healthy Eating"] },
    { emoji: "🥣", name: "Rhythm Stirring", tagline: "Baking to the beat.", starter: "We have to stir this bowl, [NAME], but we have to do it to the beat!", howTo: "Give them a bowl with a little water or flour. Sing a song and have them stir fast during the fast parts and slow during the slow parts.", watchFor: "Watch their rhythm and ability to change pace.", builds: ["Rhythm", "Motor Control", "Listening"] }
  ],
  "Stories": [
    { emoji: "📖", name: "Pass-the-Story", tagline: "Weaving a tale, one sentence at a time.", starter: "I have a story to tell you, [NAME], but I only know the beginning. I need you to help me finish it!", howTo: "Start with 'Once upon a time, there was a tiny...' and let them fill in the blank. Take turns adding one sentence at a time to see where the story goes.", watchFor: "Notice the themes they introduce—it often reflects what's on their mind.", builds: ["Language Skills", "Narrative Thinking", "Active Listening"] },
    { emoji: "🎒", name: "Mystery Story Bag", tagline: "Pull an object, tell a tale.", starter: "[NAME], reach into the magic bag and let's see what our story is about today!", howTo: "Put 3-4 random objects in a bag. Have them pull one out, and start a story about that object. Pull another one to add to the plot.", watchFor: "Watch their creativity as they connect unrelated objects.", builds: ["Creativity", "Improvisation", "Vocabulary"] },
    { emoji: "🎭", name: "Alternate Endings", tagline: "Rewriting the classics.", starter: "You know the story of the Three Little Pigs, [NAME]? What if the wolf was actually just looking for a friend?", howTo: "Take a familiar story and ask them to help you change the ending. Discuss how the characters would feel.", watchFor: "Notice their empathy and understanding of cause and effect.", builds: ["Empathy", "Critical Thinking", "Storytelling"] }
  ],
  "Dancing": [
    { emoji: "💃", name: "Freeze Dance Party", tagline: "Shake the sillies out and freeze!", starter: "I'm turning on your favorite song, [NAME]! Let's see your best dance moves.", howTo: "Play a song and dance wildly together. Randomly pause the music and yell 'Freeze!' See who can hold their pose the longest.", watchFor: "Watch their self-regulation as they try to stop their body suddenly.", builds: ["Self-Regulation", "Gross Motor Skills", "Joyful Connection"] },
    { emoji: "🎀", name: "Ribbon Dancing", tagline: "Painting the air with movement.", starter: "[NAME], let's make the air colorful with our dancing!", howTo: "Give them a ribbon, scarf, or even a light towel. Put on sweeping, classical music and encourage them to make big circles and waves.", watchFor: "Notice their shoulder and arm mobility as they make large movements.", builds: ["Gross Motor Skills", "Expression", "Rhythm"] },
    { emoji: "🤖", name: "Robot vs. Noodle", tagline: "Exploring tension and relaxation.", starter: "Are you a stiff robot or a floppy noodle today, [NAME]?", howTo: "Put on music. When you say 'Robot', dance with stiff, jerky movements. When you say 'Noodle', dance loose and floppy.", watchFor: "Watch their body awareness as they switch between muscle tension and relaxation.", builds: ["Body Awareness", "Muscle Control", "Listening"] }
  ],
  "Puzzles": [
    { emoji: "🧩", name: "Living Room Jigsaw", tagline: "A scavenger hunt for the missing pieces.", starter: "Oh no, [NAME]! A puzzle exploded in the living room. Can you help me find the pieces?", howTo: "Hide the pieces of a simple puzzle around the room. Have them search for the pieces and bring them back to assemble the puzzle together.", watchFor: "Notice their visual scanning skills as they search for hidden pieces.", builds: ["Visual Scanning", "Problem Solving", "Persistence"] },
    { emoji: "📦", name: "Mystery Box", tagline: "Guessing by touch alone.", starter: "I have a secret object in this box, [NAME]. Can you guess what it is without looking?", howTo: "Put a familiar object (like a toy car, a spoon, or a ball) inside a box or under a blanket. Have them reach in and feel it to guess what it is.", watchFor: "Watch how they use their sense of touch to gather information.", builds: ["Sensory Processing", "Deductive Reasoning", "Vocabulary"] },
    { emoji: "🔺", name: "Shape Sorter Challenge", tagline: "Finding geometry in the real world.", starter: "[NAME], we are on a mission to find three things that are shaped like a circle!", howTo: "Pick a shape (circle, square, triangle) and walk around the house together trying to find objects that match that shape.", watchFor: "Notice their ability to abstract a shape from a complex object.", builds: ["Shape Recognition", "Observation", "Categorization"] }
  ],
  "Brain Building": [
    { emoji: "🧠", name: "Memory Match-Up", tagline: "A classic game of hide and seek for objects.", starter: "Pay close attention, [NAME]. Let's see if you can remember where the toy is hiding!", howTo: "Take three cups and hide a small toy under one of them. Slowly shuffle the cups around and ask them to point to the cup with the toy.", watchFor: "Watch their intense focus as they track the moving cup.", builds: ["Working Memory", "Visual Tracking", "Focus"] },
    { emoji: "🔄", name: "Pattern Play", tagline: "Creating order out of chaos.", starter: "Look at this pattern, [NAME]: Red block, blue block, red block... what comes next?", howTo: "Use blocks, colored cereal, or toys to create a simple repeating pattern. Ask them to continue the pattern or create their own for you to solve.", watchFor: "Notice their logical thinking as they figure out the sequence.", builds: ["Pattern Recognition", "Logical Thinking", "Math Readiness"] },
    { emoji: "❓", name: "What's Missing?", tagline: "Testing the limits of observation.", starter: "Take a good look at these toys, [NAME]. Now close your eyes... what disappeared?", howTo: "Place 3-5 familiar objects on a tray. Let them look for 10 seconds, then have them close their eyes while you remove one object. Ask them to guess what's missing.", watchFor: "Watch their memory recall process as they scan the remaining items.", builds: ["Short-term Memory", "Observation", "Attention to Detail"] }
  ],
  "Default": [
    { emoji: "🌟", name: "Mirror Mirror", tagline: "A quiet game of connection and reflection.", starter: "Let's play a game, [NAME]. Sit facing me, and try to copy exactly what I do.", howTo: "Sit face-to-face. Make slow movements with your hands or silly faces, and have them mirror you. Then switch and let them be the leader.", watchFor: "Notice the intense eye contact and focus as they try to match you.", builds: ["Focus", "Empathy", "Visual Tracking"] },
    { emoji: "👀", name: "I Spy Colors", tagline: "A colorful hunt around the room.", starter: "I spy with my little eye, [NAME], something that is bright red!", howTo: "Take turns picking a color and finding an object in the room that matches it. Give hints if they get stuck.", watchFor: "Watch their visual scanning skills as they search the environment.", builds: ["Observation", "Color Recognition", "Patience"] },
    { emoji: "🤫", name: "The Quiet Game", tagline: "Finding peace in the silence.", starter: "Let's see who can be as quiet as a mouse the longest, [NAME].", howTo: "Sit together and see how long you can both stay completely silent. Make funny faces to try and make the other person laugh.", watchFor: "Notice their self-control and how they communicate without words.", builds: ["Self-Control", "Non-verbal Communication", "Calmness"] }
  ]
};

// This simulates the AI generation process since we are building a frontend-only app
export async function generateActivity(data: FormData, seenActivities: string[] = []): Promise<ActivityData> {
  // Simulate network delay (1.5s to 3s)
  const delay = Math.floor(Math.random() * 1500) + 1500;
  await new Promise((resolve) => setTimeout(resolve, delay));

  // Simulate a random failure (10% chance) to show the error state
  if (Math.random() < 0.1) {
    throw new Error("AI generation failed. Please try again.");
  }

  const primaryInterest = data.interests.length > 0 ? data.interests[0] : "Default";
  
  // Get available activities for the chosen interest
  const availableActivities = activitiesDB[primaryInterest] || activitiesDB["Default"];
  
  // Filter out activities the user has already seen
  let unseenActivities = availableActivities.filter(a => !seenActivities.includes(a.name));
  
  // If they've seen all of them, reset the pool for this interest
  if (unseenActivities.length === 0) {
    unseenActivities = availableActivities;
  }
  
  // Pick a random activity from the unseen list
  const randomIndex = Math.floor(Math.random() * unseenActivities.length);
  const baseActivity = unseenActivities[randomIndex];

  // Customize content based on inputs
  let activityName = baseActivity.name;
  let starter = baseActivity.starter.replace(/\[NAME\]/g, data.name);
  let howTo = baseActivity.howTo;

  // Adjust based on mood
  if (data.mood === "Quiet & Calm" || data.mood === "A bit sad") {
    activityName = "Cozy " + activityName;
    howTo += " Keep your voices soft and movements gentle.";
  } else if (data.mood === "Hyper" || data.mood === "Happy & Energetic") {
    activityName = "Super " + activityName;
    howTo += " Use lots of energy and big movements!";
  }

  // Adjust based on special needs
  if (data.hasSpecialNeeds && data.specialNeedsNote) {
    howTo += ` (Note: Adapted for ${data.specialNeedsNote} - keep sensory input manageable and follow their lead).`;
  }

  return {
    id: baseActivity.name, // Use the base name as the unique ID for tracking history
    emoji: baseActivity.emoji,
    name: activityName,
    tagline: baseActivity.tagline,
    duration: data.time,
    starter,
    howTo,
    watchFor: baseActivity.watchFor,
    builds: baseActivity.builds
  };
}

