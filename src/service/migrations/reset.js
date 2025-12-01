import down from "./down";
import up from "./up";


async function resetDB() {
  down()
  up()
}


resetDB()
export default resetDB

