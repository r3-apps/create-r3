import { Entity, Fields } from "remult";

@Entity("payments", {
  allowApiCrud: true,
})
export class Payments {
  @Fields.cuid()
  id = "";

  @Fields.string()
  grossAmount = "";

  @Fields.string()
  netAmount = "";

  @Fields.string()
  fees = "";

  @Fields.string()
  source = "";

  @Fields.string()
  billing = "";

  @Fields.string()
  reference_number = "";

  @Fields.string()
  link = "";

  @Fields.createdAt()
  createdAt = new Date();
}
