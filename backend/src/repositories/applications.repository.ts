import type { Db } from "../db/database.ts";
import type { ApplicationDbo } from "../models/application.ts";
import type { OfferStatus } from "../models/offer.ts";

interface OfferStatusRow {
  status: OfferStatus;
}

interface OfferIdParams {
  id: number;
}

interface InsertApplicationParams {
  offerId: number;
  studentId: number;
  message: string | null;
}

interface ApplicationIdParams {
  id: number;
}

export const createApplicationsRepository = (db: Db) => {
  const findOfferStatus = db.prepare<OfferIdParams, OfferStatusRow>(
    "SELECT status FROM offers WHERE id = @id",
  );
  const insertApplication = db.prepare<InsertApplicationParams, never>(`
    INSERT INTO applications (offer_id, student_id, message)
    VALUES (@offerId, @studentId, @message)
  `);
  const findApplication = db.prepare<ApplicationIdParams, ApplicationDbo>(`
    SELECT id, offer_id, message, status, applied_at
    FROM applications
    WHERE id = @id
  `);

  return {
    findOfferStatus: (offerId: number): OfferStatus | undefined =>
      findOfferStatus.get({ id: offerId })?.status,
    create: ({ offerId, studentId, message }: InsertApplicationParams): ApplicationDbo => {
      const result = insertApplication.run({ offerId, studentId, message });
      const application = findApplication.get({ id: Number(result.lastInsertRowid) });
      if (application === undefined) {
        throw new Error("La candidature créée est introuvable");
      }
      return application;
    },
  };
};

export type ApplicationsRepository = ReturnType<typeof createApplicationsRepository>;
