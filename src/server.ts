import { app } from "./app";
const SERVER_PORT = process.env.SERVER_PORT || 3000;

export const server = app.listen(SERVER_PORT, () => {
  console.log(`Server running on port ${SERVER_PORT}`);
});
