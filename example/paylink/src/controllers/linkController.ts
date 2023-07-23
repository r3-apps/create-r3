import { BackendMethod, Remult } from "remult"
import { Blog } from "src/shared/Blog"

export class BlogController {
  @BackendMethod({ allowed: true })
  static async setAll(remult?: Remult) {
    const taskRepo = remult!.repo(Blog)
    const data = await taskRepo.find()
    console.log('[data]',data)
    return  data

  }
}