import { remultNext } from "remult/remult-next";
import { Blogs } from "src/shared/Blog";
import { Links } from "src/shared/Links";
import { Payments } from "src/shared/Payments";
import { BlogController } from "src/controllers/linkController";
export default remultNext({
  entities: [Blogs, Links, Payments],
  controllers:[BlogController]
});
