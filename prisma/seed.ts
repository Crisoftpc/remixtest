import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

async function seed() {
  const kody = await db.user.create({
    data: {
      username: "kody",
      // this is a hashed version of "twixrox"
      passwordHash:
        "$2b$10$K7L1OJ45/4Y2nIvhRVpCe.FSmhDdWoXehVzJptJ/op0lSsvqNu/1u",
    },
  });
  await Promise.all(
    getJokes().map((joke) => {
      const data = { jokesterId: kody.id, ...joke };
      return db.joke.create({ data });
    })
  );
}

seed();

function getJokes() {
  // shout-out to https://icanhazdadjoke.com/

  return [
    {
      name: "Road worker",
      content: `Nunca quise creer que mi papá estaba robando de su trabajo como trabajador de caminos. Pero cuando llegué a casa, todas las señales estaban allí.`,
    },
    {
      name: "Frisbee",
      content: `Me preguntaba por qué el frisbee se estaba haciendo más grande, entonces me di cuenta.`,
    },
    {
      name: "Trees",
      content: `¿Por qué los árboles parecen sospechosos en los días soleados? No sé, son solo un poco turbios.`,
    },
    {
      name: "Skeletons",
      content: `¿Por qué los esqueletos no montan montañas rusas? No tienen estómago para eso.`,
    },
    {
      name: "Hippos",
      content: `¿Por qué no encuentras hipopótamos escondidos en los árboles? Son realmente buenos en eso.`,
    },
    {
      name: "Dinner",
      content: `¿Qué le dijo un plato a otro plato? ¡La cena corre por mi cuenta!`,
    },
    {
      name: "Elevator",
      content: `La primera vez que usé un ascensor fue una experiencia edificante. La segunda vez me defraudó.`,
    },
  ];
}