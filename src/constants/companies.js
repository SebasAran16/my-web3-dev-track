import companiesData from "@/data/companies.json";
import certificationsData from "@/data/certifications.json";

export const companies = companiesData;

// Same shape a Mongo collection would give us: look a company up by its id and
// hand the caller `null` when the relation is not set, instead of undefined.
const companiesById = new Map(companies.map((company) => [company.id, company]));

export const getCompany = (companyId) =>
  (companyId && companiesById.get(companyId)) || null;

// Certifications carry a nullable `companyId`, so a cert may or may not be tied
// to a job. Resolving it here keeps the components free of lookup logic.
export const certifications = certificationsData.map((certification) => ({
  ...certification,
  company: getCompany(certification.companyId),
}));

// The reverse side of the relation: every certification earned at a company,
// so an experience card can list them without scanning the collection itself.
const certificationsByCompany = certifications.reduce((byCompany, cert) => {
  if (!cert.companyId) return byCompany;
  (byCompany[cert.companyId] = byCompany[cert.companyId] || []).push(cert);
  return byCompany;
}, {});

export const getCompanyCertifications = (companyId) =>
  certificationsByCompany[companyId] || [];
