const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt"); // Ensure bcrypt is installed for hashing passwords

const prisma = new PrismaClient();
const saltRounds = parseInt(process.env.SALT_ROUNDS) || 10;

async function main() {
  // Sample user data
  const users = [
    {
      email: "sergeev88@abv.bg",
      password: "00134679",
    },
    {
      email: "bob",
      password: "password456",
    },
    {
      email: "carol",
      password: "password789",
    },
  ];

  // Hash passwords and create users
  for (const user of users) {
    const hashedPassword = await bcrypt.hash(user.password, saltRounds);

    await prisma.user.create({
      data: {
        email: user.email,
        password: hashedPassword,
      },
    });
  }

  console.log("Users seeded successfully.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
