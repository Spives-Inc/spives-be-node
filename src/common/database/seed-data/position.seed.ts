import { faker } from "@faker-js/faker";

const positions = [
  {
    name: "Goalkeeper",
    code: "GK",
  },
  {
    name: "Defender",
    code: "DF",
  },
  {
    name: "Midfielder",
    code: "MF",
  },
  {
    name: "Forward",
    code: "FW",
  },
  {
    name: "Striker",
    code: "ST",
  },
  {
    name: "Attacking Midfielder",
    code: "AM",
  },
  {
    name: "Central Midfielder",
    code: "CM",
  },
  {
    name: "Defensive Midfielder",
    code: "DM",
  },
  {
    name: "Left Midfielder",
    code: "LM",
  },
  {
    name: "Right Midfielder",
    code: "RM",
  },
  {
    name: "Left Back",
    code: "LB",
  },
  {
    name: "Right Back",
    code: "RB",
  },
  {
    name: "Centre Back",
    code: "CB",
  },
  {
    name: "Wing Back",
    code: "WB",
  },
  {
    name: "Left Wing Back",
    code: "LWB",
  },
  {
    name: "Right Wing Back",
    code: "RWB",
  },
  {
    name: "Sweeper",
    code: "SW",
  },
  {
    name: "Libero",
    code: "LB",
  },
  {
    name: "Centre Forward",
    code: "CF",
  },
  {
    name: "Second Striker",
    code: "SS",
  },
  {
    name: "False 9",
    code: "F9",
  },
  {
    name: "Shadow Striker",
    code: "SH",
  },
  {
    name: "Deep Lying Forward",
    code: "DLF",
  },
];

faker.seed(21111);

export const positionSeed = positions.map((position) => ({
  ...position,
  id: faker.datatype.uuid(),
}));
