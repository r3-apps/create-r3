import { Entity, Fields } from "remult";

@Entity("links", {
  allowApiCrud: true,
})
export class Links {
  @Fields.cuid()
  id = "";

  @Fields.string()
  type = "";

  @Fields.json()
  attributes: string[] = []

  @Fields.createdAt()
  createdAt = new Date();
}
