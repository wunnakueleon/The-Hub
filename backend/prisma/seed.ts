/// <reference types="node" />
import "dotenv/config";
import bcrypt from "bcryptjs";
import { prisma } from "../src/lib/prisma";

async function main() {
  console.log("Seeding database...");

  // ─── Users ────────────────────────────────────────────────────────────────
  const adminPassword = await bcrypt.hash("admin1234", 12);
  const devPassword = await bcrypt.hash("dev1234", 12);

  await prisma.user.upsert({
    where: { email: "admin@thehub.dev" },
    update: {},
    create: {
      name: "Alex Rivera",
      email: "admin@thehub.dev",
      password: adminPassword,
      role: "admin",
      github: "alexrivera",
      bio: "Organiser of The Hub retreats. Building communities one island at a time.",
      skills: JSON.stringify(["community", "logistics", "typescript"]),
      hue: 220,
    },
  });

  const u1 = await prisma.user.upsert({
    where: { email: "maya@thehub.dev" },
    update: {},
    create: {
      name: "Maya Chen",
      email: "maya@thehub.dev",
      password: devPassword,
      role: "developer",
      github: "mayachen",
      bio: "Full-stack dev obsessed with performance and clean APIs.",
      skills: JSON.stringify(["React", "Go", "Postgres"]),
      hue: 168,
    },
  });

  const u2 = await prisma.user.upsert({
    where: { email: "sam@thehub.dev" },
    update: {},
    create: {
      name: "Sam Okafor",
      email: "sam@thehub.dev",
      password: devPassword,
      role: "developer",
      github: "samokafor",
      bio: "Mobile dev, Rust enthusiast, coffee snob.",
      skills: JSON.stringify(["Swift", "Rust", "React Native"]),
      hue: 30,
    },
  });

  const u3 = await prisma.user.upsert({
    where: { email: "priya@thehub.dev" },
    update: {},
    create: {
      name: "Priya Nair",
      email: "priya@thehub.dev",
      password: devPassword,
      role: "developer",
      github: "priyanair",
      bio: "ML engineer who ships side projects on the weekend.",
      skills: JSON.stringify(["Python", "PyTorch", "FastAPI"]),
      hue: 280,
    },
  });

  const u4 = await prisma.user.upsert({
    where: { email: "leon@thehub.dev" },
    update: {},
    create: {
      name: "Leon Hartmann",
      email: "leon@thehub.dev",
      password: devPassword,
      role: "developer",
      github: "leonhartmann",
      bio: "Backend dev, mountains > beaches (but beaches will do).",
      skills: JSON.stringify(["Java", "Kotlin", "Kubernetes"]),
      hue: 60,
    },
  });

  console.log(`Created ${5} users`);

  // ─── Event 1: Koh Yao Noi (published, popular) ────────────────────────────
  const event1 = await prisma.event.upsert({
    where: { id: "event-koh-yao-noi-spring-2026" },
    update: {},
    create: {
      id: "event-koh-yao-noi-spring-2026",
      name: "Koh Yao Noi Spring Retreat",
      island: "Koh Yao Noi, Phang Nga Bay",
      villa: "Baan Lamai Villa",
      startDate: new Date("2026-03-07"),
      endDate: new Date("2026-03-14"),
      season: "Spring 2026",
      tagline: "Ship code. Watch the karst. Repeat.",
      desc: "Seven days on a quiet island in Phang Nga Bay — deep work mornings, demo evenings, and the kind of sunsets that make you want to start another company. Twenty developers, one villa, unlimited coconuts.",
      capacity: 20,
      published: true,
      heroTag: "Most popular",
      rooms: {
        create: [
          {
            type: "shared",
            name: "Shared Twin",
            desc: "Two single beds in a garden-facing room. Great if you want to keep costs down and don't mind a room-mate.",
            price: 32000,
            sleeps: 2,
            beds: 6,
          },
          {
            type: "private",
            name: "Private Double",
            desc: "King bed, en-suite bathroom, and a small balcony overlooking the pool. Perfect for solo focus.",
            price: 52000,
            sleeps: 1,
            beds: 4,
          },
          {
            type: "suite",
            name: "Garden Suite",
            desc: "Separate living room, private plunge pool, and a rain shower. The best place to take a call or write a blog post.",
            price: 88000,
            sleeps: 2,
            beds: 2,
          },
        ],
      },
      amenities: {
        create: [
          { icon: "wifi", label: "1 Gbps fibre" },
          { icon: "pool", label: "Infinity pool" },
          { icon: "ac", label: "A/C in all rooms" },
          { icon: "chef", label: "Private chef" },
          { icon: "beach", label: "Private beach" },
          { icon: "kayak", label: "Kayaks & SUPs" },
          { icon: "generator", label: "Backup generator" },
          { icon: "airport", label: "Airport transfers" },
        ],
      },
      included: {
        create: [
          { text: "All meals (breakfast, lunch, dinner)", order: 0 },
          { text: "Daily barista coffee & fresh juices", order: 1 },
          { text: "Speedboat transfers from Krabi", order: 2 },
          { text: "Afternoon snorkelling trip", order: 3 },
          { text: "Demo night — present your week's work", order: 4 },
          { text: "Co-working setup with standing desks", order: 5 },
          { text: "24/7 fibre internet (wired + WiFi 6)", order: 6 },
        ],
      },
      schedule: {
        create: [
          { time: "07:30", title: "Sunrise swim & coffee", note: "Optional. The pool is best at dawn.", order: 0 },
          { time: "08:30", title: "Breakfast on the terrace", note: "Fresh fruit, eggs to order, local pastries.", order: 1 },
          { time: "09:30", title: "Deep work block", note: "Heads-down. No meetings, no standups.", order: 2 },
          { time: "13:00", title: "Lunch & swim break", note: "90 minutes. Use it.", order: 3 },
          { time: "14:30", title: "Deep work block II", note: "Afternoon sessions tend to be the most productive.", order: 4 },
          { time: "18:30", title: "Sunset drinks", note: "Cocktails on the deck. Mandatory.", order: 5 },
          { time: "19:30", title: "Dinner", note: "Communal table. Usually goes late.", order: 6 },
          { time: "21:00", title: "Demo / lightning talks", note: "Show the group what you built. 5 min each, no slides required.", order: 7 },
        ],
      },
      faq: {
        create: [
          {
            question: "What's the WiFi like?",
            answer: "1 Gbps fibre from CAT Telecom. We have a backup 4G router if the line drops. Both tested before each retreat.",
            order: 0,
          },
          {
            question: "Can I come solo?",
            answer: "Yes — most attendees do. The shared rooms pair you with someone in a similar timezone, and everyone's there to work and connect.",
            order: 1,
          },
          {
            question: "What's the refund policy?",
            answer: "Full refund up to 30 days before the start date. 50% refund between 30 and 14 days. No refund inside 14 days (but we'll help you find a replacement).",
            order: 2,
          },
          {
            question: "Is it suitable for remote workers with client calls?",
            answer: "Absolutely. We keep mornings quiet and each room has a door that closes. The suite has a private office nook.",
            order: 3,
          },
          {
            question: "How do I get there?",
            answer: "Fly into Krabi (KBV) or Phuket (HKT). We arrange a shared speedboat transfer — details sent after booking.",
            order: 4,
          },
        ],
      },
    },
  });

  // ─── Event 2: Koh Lanta (published, autumn) ───────────────────────────────
  const event2 = await prisma.event.upsert({
    where: { id: "event-koh-lanta-autumn-2026" },
    update: {},
    create: {
      id: "event-koh-lanta-autumn-2026",
      name: "Koh Lanta Autumn Retreat",
      island: "Koh Lanta, Krabi Province",
      villa: "Lanta Sky Villa",
      startDate: new Date("2026-10-03"),
      endDate: new Date("2026-10-10"),
      season: "Autumn 2026",
      tagline: "Quieter island. Louder ideas.",
      desc: "Koh Lanta's west coast at its finest — long flat beaches, a relaxed pace, and the kind of calm that's perfect for shipping big features. Smaller group, tighter community.",
      capacity: 16,
      published: true,
      heroTag: null,
      rooms: {
        create: [
          {
            type: "shared",
            name: "Shared Twin",
            desc: "Two single beds in a breezy garden room with a ceiling fan and en-suite bathroom.",
            price: 28000,
            sleeps: 2,
            beds: 4,
          },
          {
            type: "private",
            name: "Private King",
            desc: "King bed, sea-view balcony, blackout curtains for those late-night coding sessions.",
            price: 48000,
            sleeps: 1,
            beds: 4,
          },
          {
            type: "suite",
            name: "Clifftop Suite",
            desc: "Two-level suite with a living room, private terrace, and a direct view of the Andaman sunset.",
            price: 82000,
            sleeps: 2,
            beds: 2,
          },
        ],
      },
      amenities: {
        create: [
          { icon: "wifi", label: "500 Mbps fibre" },
          { icon: "pool", label: "Clifftop pool" },
          { icon: "ac", label: "A/C in all rooms" },
          { icon: "chef", label: "Private chef" },
          { icon: "beach", label: "Beach access" },
          { icon: "kayak", label: "Kayaks & bikes" },
          { icon: "generator", label: "Backup generator" },
          { icon: "airport", label: "Ferry transfers" },
        ],
      },
      included: {
        create: [
          { text: "All meals cooked by a local chef", order: 0 },
          { text: "Daily coffee, tea & fresh juices", order: 1 },
          { text: "Ferry transfers from Krabi pier", order: 2 },
          { text: "Sunset boat trip", order: 3 },
          { text: "Demo night on the terrace", order: 4 },
          { text: "Co-working desks with monitors", order: 5 },
          { text: "500 Mbps fibre (wired + WiFi 6)", order: 6 },
        ],
      },
      schedule: {
        create: [
          { time: "08:00", title: "Breakfast", note: "Slow mornings. No alarms required.", order: 0 },
          { time: "09:30", title: "Deep work block", note: "Full quiet until lunch.", order: 1 },
          { time: "13:00", title: "Lunch & beach break", note: "The beach is a 3-minute walk.", order: 2 },
          { time: "14:30", title: "Deep work block II", note: "Or take a kayak out — your call.", order: 3 },
          { time: "18:00", title: "Sunset on the terrace", note: "The Andaman sunsets here are something else.", order: 4 },
          { time: "19:30", title: "Dinner", note: "Long table, good conversation.", order: 5 },
          { time: "21:00", title: "Optional demo night", note: "Tuesdays and Fridays only.", order: 6 },
        ],
      },
      faq: {
        create: [
          {
            question: "Is Koh Lanta easy to reach?",
            answer: "Yes — ferry from Krabi pier (1.5 hours) or a short drive from Krabi airport via the bridge. We coordinate group transfers.",
            order: 0,
          },
          {
            question: "How big is the group?",
            answer: "Max 16. It's deliberately smaller than our other retreats for a tighter, more focused experience.",
            order: 1,
          },
          {
            question: "What's the WiFi speed?",
            answer: "500 Mbps fibre with a 4G backup. Not gigabit, but plenty for video calls and pushing code.",
            order: 2,
          },
          {
            question: "Is October a good time to visit?",
            answer: "Early October is shoulder season — fewer tourists, slightly lower humidity. Occasional rain in the evenings, but mornings are reliably clear.",
            order: 3,
          },
        ],
      },
    },
  });

  // ─── Event 3: Koh Samui (unpublished draft) ───────────────────────────────
  await prisma.event.upsert({
    where: { id: "event-koh-samui-winter-2027" },
    update: {},
    create: {
      id: "event-koh-samui-winter-2027",
      name: "Koh Samui Winter Retreat",
      island: "Koh Samui, Gulf of Thailand",
      villa: "Samui Hilltop Estate",
      startDate: new Date("2027-01-09"),
      endDate: new Date("2027-01-16"),
      season: "Winter 2027",
      tagline: "Start the year with a clean slate.",
      desc: "A fresh-year retreat on the Gulf side. Samui's north coast in January is dry, warm, and wide open. Come with big goals.",
      capacity: 20,
      published: false,
      heroTag: null,
      rooms: {
        create: [
          { type: "shared", name: "Shared Twin", desc: "Two beds, garden view.", price: 30000, sleeps: 2, beds: 6 },
          { type: "private", name: "Private Double", desc: "King bed, pool view.", price: 50000, sleeps: 1, beds: 6 },
          { type: "suite", name: "Hilltop Suite", desc: "360° Gulf views, private terrace.", price: 90000, sleeps: 2, beds: 2 },
        ],
      },
      amenities: {
        create: [
          { icon: "wifi", label: "1 Gbps fibre" },
          { icon: "pool", label: "Hilltop pool" },
          { icon: "ac", label: "A/C in all rooms" },
          { icon: "chef", label: "Private chef" },
        ],
      },
      included: {
        create: [
          { text: "All meals", order: 0 },
          { text: "Airport transfers from Samui (USM)", order: 1 },
          { text: "New Year kick-off workshop", order: 2 },
        ],
      },
      schedule: {
        create: [
          { time: "09:00", title: "Breakfast", note: "Late start — it's January.", order: 0 },
          { time: "10:00", title: "Deep work", note: "Full morning block.", order: 1 },
          { time: "19:00", title: "Dinner & demos", note: "Combined evening session.", order: 2 },
        ],
      },
      faq: {
        create: [
          { question: "Is this event confirmed?", answer: "Not yet — registration opens once we hit 10 expressions of interest.", order: 0 },
        ],
      },
    },
  });

  console.log("Created 3 events");

  // ─── Bookings ─────────────────────────────────────────────────────────────
  // Fetch the rooms we just created so we can reference them by type
  const e1rooms = await prisma.room.findMany({ where: { eventId: event1.id } });
  const sharedRoom = e1rooms.find((r) => r.type === "shared")!;
  const privateRoom = e1rooms.find((r) => r.type === "private")!;
  const suiteRoom   = e1rooms.find((r) => r.type === "suite")!;

  const e2rooms = await prisma.room.findMany({ where: { eventId: event2.id } });
  const e2private = e2rooms.find((r) => r.type === "private")!;

  const bookings = [
    {
      ref: "HUB-KY1-AA01",
      userId: u1.id,
      eventId: event1.id,
      roomId: privateRoom.id,
      status: "confirmed",
      guests: 1,
      diet: "Vegetarian",
      notes: "Quiet room if possible.",
    },
    {
      ref: "HUB-KY1-BB02",
      userId: u2.id,
      eventId: event1.id,
      roomId: sharedRoom.id,
      status: "confirmed",
      guests: 1,
      diet: "None",
    },
    {
      ref: "HUB-KY1-CC03",
      userId: u3.id,
      eventId: event1.id,
      roomId: suiteRoom.id,
      status: "waitlisted",
      guests: 2,
      diet: "Vegan",
      notes: "Travelling with partner.",
    },
    {
      ref: "HUB-KL2-DD04",
      userId: u4.id,
      eventId: event2.id,
      roomId: e2private.id,
      status: "confirmed",
      guests: 1,
      diet: "None",
    },
  ];

  for (const b of bookings) {
    await prisma.booking.upsert({
      where: { ref: b.ref },
      update: {},
      create: b,
    });
  }

  console.log("Created 4 bookings");
  console.log("\nSeed complete.");
  console.log("\nTest accounts:");
  console.log("  admin@thehub.dev  / admin1234  (admin)");
  console.log("  maya@thehub.dev   / dev1234    (developer)");
  console.log("  sam@thehub.dev    / dev1234    (developer)");
  console.log("  priya@thehub.dev  / dev1234    (developer)");
  console.log("  leon@thehub.dev   / dev1234    (developer)");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
