import type { Db } from "../db/database.ts";
import type { ApplicationDbo, ApplicationListDbo } from "../models/application.ts";
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

interface StudentIdParams {
  studentId: number;
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
  const findApplicationsForStudent = db.prepare<StudentIdParams, ApplicationListDbo>(`
    SELECT a.id, a.offer_id, a.message, a.status, a.applied_at,
           o.title AS offer_title, c.short_name AS company_short_name,
           ay.label AS academic_year_label, p.code AS period_code
    FROM applications a
    JOIN offers o ON o.id = a.offer_id
    JOIN companies c ON c.id = o.company_id
    JOIN academic_years ay ON ay.id = o.academic_year_id
    JOIN periods p ON p.id = o.period_id
    WHERE a.student_id = @studentId
    ORDER BY a.applied_at DESC, a.id DESC
  `);

  return {
    findOfferStatus: (offerId: number): OfferStatus | undefined =>
      findOfferStatus.get({ id: offerId })?.status,
    findForStudent: (studentId: number): ApplicationListDbo[] =>
      findApplicationsForStudent.all({ studentId }),
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
