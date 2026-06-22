import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  FaArrowLeft,
  FaArrowRight,
  FaBriefcase,
  FaBuilding,
  FaCheck,
  FaCloudUploadAlt,
  FaFileAlt,
  FaHeadset,
  FaIdCard,
  FaLandmark,
  FaPenNib,
  FaShieldAlt,
  FaSpinner,
  FaUserFriends,
} from 'react-icons/fa';

type AccountType = 'company' | 'individual';
type FormState = Record<string, string | boolean>;
type UploadState = Record<string, { name: string; preview?: string }>;

const requiredText = z.string().trim().min(2, 'This field is required.');
const requiredName = z.string().trim().min(2, 'Name is required').regex(/^[A-Za-z\s\-\']+$/, 'Name can only contain letters, spaces, hyphens, and apostrophes.');
const requiredEmail = z.string().trim().email('Enter a valid email address.');
const requiredDate = z.string().trim().min(1, 'Select a valid date.');
const requiredPhone = z.string().trim().refine(val => {
  const stripped = val.replace(/[\s-()]/g, '');
  if (stripped.startsWith('+237')) {
    return /^\+237[23468]\d{8}$/.test(stripped);
  }
  return /^\+?\d{10,15}$/.test(stripped);
}, 'Invalid phone number. If Cameroon, use +237 followed by exactly 9 digits.');
const requiredIdNumber = z.string().trim().min(5, 'ID number must be at least 5 characters.').regex(/^[A-Za-z0-9\-\s]+$/, 'Invalid ID format.');
const requiredAccountNumber = z.string().trim().min(8, 'Account number must be at least 8 digits.').regex(/^\d+$/, 'Account number must contain only digits.');
const agreement = z.literal(true, { message: 'You must accept the declaration.' });

const formConfig = {
  company: {
    title: 'Company KYC Onboarding',
    subtitle: 'Please provide basic information about your company',
    storageKey: 'enako_company_kyc_draft',
    steps: [
      {
        title: 'Company Information',
        short: 'Company Info',
        description: 'Basic details about your company',
        icon: FaBuilding,
        groups: [
          {
            title: 'Basic Company Details',
            icon: FaBuilding,
            fields: [
              { name: 'companyName', label: 'Company Legal Name', required: true, placeholder: 'Enter company legal name' },
              { name: 'tradingName', label: 'Trading Name (if different)', placeholder: 'Enter trading name' },
              { name: 'registrationNumber', label: 'Registration Number', required: true, placeholder: 'Enter registration number' },
              { name: 'taxNumber', label: 'Tax Identification Number (TIN)', required: true, placeholder: 'Enter tax identification number' },
              { name: 'incorporationDate', label: 'Incorporation Date', required: true, type: 'date' },
              { name: 'companyType', label: 'Company Type', required: true, type: 'select', options: ['Private Limited', 'Public Limited', 'Partnership', 'Sole Proprietorship', 'NGO'] },
              { name: 'businessAddress', label: 'Registered Address', required: true, placeholder: 'Enter complete registered address', wide: true },
              { name: 'city', label: 'City', required: true, placeholder: 'Enter city' },
              { name: 'state', label: 'State / Province', required: true, placeholder: 'Enter state or province' },
              { name: 'country', label: 'Country', required: true, type: 'select', options: ['Cameroon', 'Nigeria', 'Ghana', 'United States', 'United Kingdom', 'Other'] },
              { name: 'postalCode', label: 'Postal / ZIP Code', required: true, placeholder: 'Enter postal or ZIP code' },
              { name: 'website', label: 'Website (if available)', placeholder: 'Enter website URL' },
            ],
          },
          {
            title: 'Business Information',
            icon: FaBriefcase,
            fields: [
              { name: 'natureOfBusiness', label: 'Nature of Business', required: true, type: 'select', options: ['Financial Services', 'Import / Export', 'Technology', 'Consulting', 'Real Estate', 'Retail', 'Other'] },
              { name: 'industry', label: 'Industry', required: true, type: 'select', options: ['Banking', 'Fintech', 'Trade', 'Energy', 'Professional Services', 'Other'] },
              { name: 'businessActivity', label: 'Company Description', required: true, type: 'textarea', placeholder: 'Please describe your business activities', wide: true },
              { name: 'employees', label: 'Number of Employees', placeholder: 'Enter number of employees' },
              { name: 'annualRevenue', label: 'Annual Revenue Range', required: true, type: 'select', options: ['Below $50k', '$50k - $250k', '$250k - $1m', '$1m - $10m', 'Above $10m'] },
            ],
          },
          {
            title: 'Contact Information',
            icon: FaIdCard,
            fields: [
              { name: 'primaryContactName', label: 'Primary Contact Name', required: true, placeholder: 'Enter full name' },
              { name: 'companyEmail', label: 'Primary Contact Email', required: true, type: 'email', placeholder: 'Enter email address' },
              { name: 'primaryPhone', label: 'Primary Contact Phone', required: true, placeholder: '(555) 000-0000' },
              { name: 'jobTitle', label: 'Job Title', required: true, placeholder: 'Enter job title' },
            ],
          },
        ],
        schema: z.object({
          companyName: requiredName,
          registrationNumber: requiredIdNumber,
          taxNumber: requiredIdNumber,
          incorporationDate: requiredDate,
          companyType: requiredText,
          businessAddress: requiredText,
          city: requiredText,
          state: requiredText,
          country: requiredText,
          postalCode: requiredText,
          natureOfBusiness: requiredText,
          industry: requiredText,
          businessActivity: requiredText,
          annualRevenue: requiredText,
          primaryContactName: requiredName,
          companyEmail: requiredEmail,
          primaryPhone: requiredPhone,
          jobTitle: requiredText,
        }),
      },
      {
        title: 'Directors & Shareholders',
        short: 'Directors',
        description: 'Information about owners and directors',
        icon: FaUserFriends,
        groups: [
          {
            title: 'Ownership Details',
            icon: FaUserFriends,
            fields: [
              { name: 'directors', label: 'Directors', required: true, type: 'textarea', placeholder: 'List directors, roles, nationality, and ownership percentage', wide: true },
              { name: 'shareholders', label: 'Shareholders', required: true, type: 'textarea', placeholder: 'List shareholders with 10% or more ownership', wide: true },
              { name: 'authorizedOfficer', label: 'Authorized Officer', required: true, placeholder: 'Enter authorized officer name' },
            ],
          },
        ],
        schema: z.object({ directors: requiredText, shareholders: requiredText, authorizedOfficer: requiredText }),
      },
      {
        title: 'AML & Compliance',
        short: 'AML & Compliance',
        description: 'Compliance and regulatory information',
        icon: FaShieldAlt,
        groups: [
          {
            title: 'Compliance Framework',
            icon: FaShieldAlt,
            fields: [
              { name: 'hasAmlPolicy', label: 'Does your company have an anti-money laundering (AML) policy?', required: true, type: 'yesno', options: ['Yes', 'No'], wide: true },
              { name: 'hasComplianceOfficer', label: 'Is there a designated AML Compliance Officer?', required: true, type: 'yesno', options: ['Yes', 'No'] },
              { name: 'complianceOfficerName', label: 'Name of Compliance Officer (If Yes)', placeholder: 'Enter compliance officer name' },
              { name: 'conductsCddEdd', label: 'Does your company conduct customer due diligence (CDD) and enhanced due diligence (EDD)?', required: true, type: 'yesno', options: ['Yes', 'No'], wide: true },
              { name: 'employeesTrainedAml', label: 'Are employees trained on AML and KYC procedures?', required: true, type: 'yesno', options: ['Yes', 'No'], wide: true },
              { name: 'sourceOfFunds', label: 'Source of Funds', required: true, placeholder: 'Describe source of funds', wide: true },
            ],
          },
        ],
        schema: z.object({
          hasAmlPolicy: requiredText,
          hasComplianceOfficer: requiredText,
          complianceOfficerName: z.string().optional(),
          conductsCddEdd: requiredText,
          employeesTrainedAml: requiredText,
          sourceOfFunds: requiredText,
        }).refine(data => data.hasComplianceOfficer !== 'Yes' || (data.complianceOfficerName && data.complianceOfficerName.trim().length > 0), {
          message: 'Please enter the name of the Compliance Officer.',
          path: ['complianceOfficerName'],
        }),
      },
      {
        title: 'Banking Information',
        short: 'Banking',
        description: 'Bank account and financial details',
        icon: FaLandmark,
        groups: [
          {
            title: 'Bank Account Details',
            icon: FaLandmark,
            fields: [
              { name: 'bankName', label: 'Bank Name', required: true, placeholder: 'Enter bank name' },
              { name: 'accountName', label: 'Account Name', required: true, placeholder: 'Enter account name' },
              { name: 'accountNumber', label: 'Account Number', required: true, placeholder: 'Enter account number' },
              { name: 'bankCountry', label: 'Bank Country', required: true, placeholder: 'Enter bank country' },
            ],
          },
        ],
        schema: z.object({ bankName: requiredText, accountName: requiredName, accountNumber: requiredAccountNumber, bankCountry: requiredText }),
      },
      {
        title: 'Document Uploads',
        short: 'Documents',
        description: 'Upload required documents',
        icon: FaFileAlt,
        uploads: [
          { name: 'corporateDocuments', label: 'Corporate Documents' },
          { name: 'idCard', label: 'ID Card' },
          { name: 'articlesOfAssociation', label: 'Articles of Association' },
          { name: 'taxpayerCard', label: 'Taxpayer Card' },
          { name: 'bankStatements', label: 'Bank Statements' },
          { name: 'certificateOfIncorporation', label: 'Certificate of Incorporation' },
        ],
        schema: z.object({}),
      },
      {
        title: 'Declaration & Signature',
        short: 'Review',
        description: 'Review and submit your application',
        icon: FaPenNib,
        groups: [
          {
            title: 'Declaration',
            icon: FaPenNib,
            fields: [
              { name: 'signature', label: 'Signature', required: true, placeholder: 'Type your full name' },
              { name: 'declarationDate', label: 'Date', required: true, type: 'date' },
              { name: 'agreement', label: 'I confirm the information is true and authorize ENAKO to verify it.', type: 'checkbox', wide: true },
            ],
          },
        ],
        schema: z.object({ signature: requiredText, declarationDate: requiredDate, agreement }),
      },
    ],
  },
  individual: {
    title: 'Individual KYC Onboarding',
    subtitle: 'Please provide your personal verification information',
    storageKey: 'enako_individual_kyc_draft',
    steps: [
      {
        title: 'Personal Information',
        short: 'Personal Info',
        description: 'Basic identity and residential details',
        icon: FaIdCard,
        groups: [
          {
            title: 'Personal Details',
            icon: FaIdCard,
            fields: [
              { name: 'fullName', label: 'Full Name', required: true, placeholder: 'Enter full name' },
              { name: 'dateOfBirth', label: 'Date of Birth', required: true, type: 'date' },
              { name: 'nationality', label: 'Nationality', required: true, placeholder: 'Enter nationality' },
              { name: 'gender', label: 'Gender', required: true, type: 'select', options: ['Female', 'Male', 'Prefer not to say'] },
              { name: 'phoneNumber', label: 'Phone Number', required: true, placeholder: '(555) 000-0000' },
              { name: 'emailAddress', label: 'Email Address', required: true, type: 'email', placeholder: 'Enter email address' },
              { name: 'residentialAddress', label: 'Residential Address', required: true, type: 'textarea', placeholder: 'Enter complete residential address', wide: true },
            ],
          },
        ],
        schema: z.object({
          fullName: requiredName,
          dateOfBirth: requiredDate,
          nationality: requiredText,
          gender: requiredText,
          phoneNumber: requiredPhone,
          emailAddress: requiredEmail,
          residentialAddress: requiredText,
        }),
      },
      {
        title: 'Identification',
        short: 'Identity',
        description: 'Government-issued identity information',
        icon: FaIdCard,
        groups: [
          {
            title: 'Identity Document',
            icon: FaIdCard,
            fields: [
              { name: 'idType', label: 'ID Type', required: true, type: 'select', options: ['Passport', 'National ID', 'Residence Permit', 'Driver License'] },
              { name: 'idNumber', label: 'Passport / ID Number', required: true, placeholder: 'Enter document number' },
              { name: 'expiryDate', label: 'Expiry Date', required: true, type: 'date' },
            ],
          },
        ],
        schema: z.object({ idType: requiredText, idNumber: requiredIdNumber, expiryDate: requiredDate }),
      },
      {
        title: 'Employment Information',
        short: 'Employment',
        description: 'Occupation and source of funds',
        icon: FaBriefcase,
        groups: [
          {
            title: 'Employment Details',
            icon: FaBriefcase,
            fields: [
              { name: 'occupation', label: 'Occupation', required: true, placeholder: 'Enter occupation' },
              { name: 'employerName', label: 'Employer Name', required: true, placeholder: 'Enter employer name' },
              { name: 'sourceOfFunds', label: 'Source of Funds', required: true, placeholder: 'Enter source of funds' },
            ],
          },
        ],
        schema: z.object({ occupation: requiredText, employerName: requiredText, sourceOfFunds: requiredText }),
      },
      {
        title: 'Banking Information',
        short: 'Banking',
        description: 'Account details for payments and settlements',
        icon: FaLandmark,
        groups: [
          {
            title: 'Bank Account Details',
            icon: FaLandmark,
            fields: [
              { name: 'bankName', label: 'Bank Name', required: true, placeholder: 'Enter bank name' },
              { name: 'accountName', label: 'Account Name', required: true, placeholder: 'Enter account name' },
              { name: 'accountNumber', label: 'Account Number', required: true, placeholder: 'Enter account number' },
            ],
          },
        ],
        schema: z.object({ bankName: requiredText, accountName: requiredName, accountNumber: requiredAccountNumber }),
      },
      {
        title: 'Document Upload',
        short: 'Documents',
        description: 'Upload clear verification documents',
        icon: FaFileAlt,
        uploads: [
          { name: 'idPassportUpload', label: 'ID/Passport Upload' },
          { name: 'proofOfAddress', label: 'Proof of Address' },
          { name: 'selfieVerification', label: 'Selfie Verification' },
        ],
        schema: z.object({}),
      },
      {
        title: 'Declaration',
        short: 'Review',
        description: 'Review and submit your application',
        icon: FaPenNib,
        groups: [
          {
            title: 'Declaration',
            icon: FaPenNib,
            fields: [
              { name: 'signature', label: 'Signature', required: true, placeholder: 'Type your full name' },
              { name: 'declarationDate', label: 'Date', required: true, type: 'date' },
              { name: 'agreement', label: 'I agree that the information provided is accurate and may be verified by ENAKO.', type: 'checkbox', wide: true },
            ],
          },
        ],
        schema: z.object({ signature: requiredText, declarationDate: requiredDate, agreement }),
      },
    ],
  },
} as const;

function emptyState(type: AccountType): FormState {
  const state: FormState = {};
  formConfig[type].steps.forEach(step => {
    if ('groups' in step) {
      step.groups.forEach(group => group.fields.forEach(field => {
        state[field.name] = 'type' in field && field.type === 'checkbox' ? false : '';
      }));
    }
  });
  return state;
}

function Field({ field, value, error, onChange }: {
  field: { name: string; label: string; type?: string; placeholder?: string; options?: readonly string[]; required?: boolean };
  value: string | boolean;
  error?: string;
  onChange: (name: string, value: string | boolean) => void;
}) {
  if (field.type === 'checkbox') {
    return (
      <label className="flex gap-3 rounded-2xl bg-[#f6f9ff] border border-[#d9e5f5] p-4 cursor-pointer">
        <input type="checkbox" checked={Boolean(value)} onChange={e => onChange(field.name, e.target.checked)} className="mt-1 h-4 w-4 accent-[#003061]" />
        <span className="text-sm font-semibold text-slate-700">{field.label}</span>
        {error && <span className="text-xs text-red-500 ml-auto">{error}</span>}
      </label>
    );
  }

  const baseClass = `w-full rounded-xl border px-4 py-3.5 text-sm outline-none transition-all bg-white ${error ? 'border-red-300 focus:ring-2 focus:ring-red-100' : 'border-[#d9e5f5] focus:border-[#003061] focus:ring-2 focus:ring-[#003061]/10'}`;

  return (
    <div>
      <label className="block text-xs font-extrabold text-[#07112b] mb-2">
        {field.label} {field.required && <span className="text-[#1d64d8]">*</span>}
      </label>
      {field.type === 'textarea' ? (
        <textarea value={String(value || '')} onChange={e => onChange(field.name, e.target.value)} rows={4} placeholder={field.placeholder} className={baseClass} />
      ) : field.type === 'yesno' ? (
        <div className="flex items-center gap-4 mt-1">
          {field.options?.map(option => (
            <label key={option} className={`flex-1 flex items-center justify-center gap-3 rounded-xl border px-4 py-3 cursor-pointer transition-all ${value === option ? 'border-[#003061] bg-[#f6f9ff] ring-1 ring-[#003061]' : 'border-[#d9e5f5] bg-white hover:border-[#003061]'}`}>
              <input type="radio" name={field.name} value={option} checked={value === option} onChange={e => onChange(field.name, e.target.value)} className="hidden" />
              <div className={`h-4 w-4 rounded-full border flex items-center justify-center ${value === option ? 'border-[#003061]' : 'border-[#d9e5f5]'}`}>
                {value === option && <div className="h-2 w-2 rounded-full bg-[#003061]" />}
              </div>
              <span className={`text-sm font-bold ${value === option ? 'text-[#003061]' : 'text-[#07112b]'}`}>{option}</span>
            </label>
          ))}
        </div>
      ) : field.type === 'select' ? (
        <select value={String(value || '')} onChange={e => onChange(field.name, e.target.value)} className={baseClass}>
          <option value="">{field.placeholder || `Select ${field.label.toLowerCase()}`}</option>
          {field.options?.map(option => <option key={option}>{option}</option>)}
        </select>
      ) : (
        <input 
          type={field.type || 'text'} 
          value={String(value || '')} 
          onChange={e => onChange(field.name, e.target.value)} 
          placeholder={field.placeholder} 
          className={baseClass} 
          {...(field.type === 'date' ? { min: '1900-01-01', max: '2099-12-31' } : {})}
        />
      )}
      {error && <p className="text-xs text-red-500 mt-1.5">{error}</p>}
    </div>
  );
}

function UploadCard({ label, file, onChange }: {
  label: string;
  file?: { name: string; preview?: string };
  onChange: (file: File) => void;
}) {
  return (
    <label className="group min-h-48 rounded-2xl border-2 border-dashed border-[#d9e5f5] bg-white hover:border-[#003061] hover:bg-[#f6f9ff] transition-all p-5 flex flex-col justify-between cursor-pointer">
      <input
        type="file"
        accept=".pdf,.jpg,.jpeg,.png"
        className="hidden"
        onChange={e => {
          const selected = e.target.files?.[0];
          if (selected) onChange(selected);
        }}
      />
      {file?.preview ? (
        <img src={file.preview} alt="" className="h-24 w-full rounded-2xl object-cover mb-4" />
      ) : (
        <div className="h-24 rounded-2xl bg-[#003061]/6 flex items-center justify-center text-[#003061] mb-4 group-hover:scale-[1.02] transition-transform">
          <FaCloudUploadAlt className="text-3xl" />
        </div>
      )}
      <div>
        <div className="text-sm font-extrabold text-[#07112b]">{label}</div>
        <div className="text-xs text-slate-400 mt-1 break-all">{file?.name || 'PDF, JPG, or PNG up to 10MB'}</div>
      </div>
    </label>
  );
}

function BrandHeader() {
  return (
    <header className="bg-[#030b21] border-b border-white/10 text-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-5 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <img src="/logo.png" alt="ENAKO Logo" className="h-28 w-auto object-contain" />
        </Link>
        <div className="hidden sm:flex items-center gap-2 text-xs font-bold text-white/85 whitespace-nowrap">
          <FaShieldAlt className="text-blue-300" />
          Secure. Compliant. Trusted.
        </div>
      </div>
    </header>
  );
}

export default function ClientKycForm() {
  const params = useParams();
  const accountType: AccountType = params.type === 'individual' ? 'individual' : 'company';
  const config = formConfig[accountType];
  const [stepIndex, setStepIndex] = useState(0);
  const [uploads, setUploads] = useState<UploadState>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { watch, setValue, reset } = useForm<FormState>({
    defaultValues: emptyState(accountType),
    mode: 'onChange',
  });
  const form = watch();

  useEffect(() => {
    const saved = localStorage.getItem(config.storageKey);
    reset(saved ? { ...emptyState(accountType), ...JSON.parse(saved) } : emptyState(accountType));
    setUploads({});
    setStepIndex(0);
    setSubmitted(false);
  }, [accountType, config.storageKey, reset]);

  useEffect(() => {
    localStorage.setItem(config.storageKey, JSON.stringify(form));
  }, [form, config.storageKey]);

  const step = config.steps[stepIndex];
  const progress = Math.round(((stepIndex + 1) / config.steps.length) * 100);

  const validateStep = () => {
    const result = step.schema.safeParse(form);
    if (result.success) {
      setErrors({});
      return true;
    }
    const nextErrors: Record<string, string> = {};
    result.error.issues.forEach(issue => {
      const key = String(issue.path[0]);
      nextErrors[key] = issue.message;
    });
    setErrors(nextErrors);
    return false;
  };

  const submit = async () => {
    if (!validateStep()) return;
    setLoading(true);
    try {
      const envApiUrl = import.meta.env.VITE_API_URL as string | undefined;
      const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
      const API_BASE = (envApiUrl && envApiUrl !== 'undefined') 
        ? envApiUrl 
        : (isLocal 
            ? 'http://localhost:5000/api/v1' 
            : 'https://enako-backend-production.up.railway.app/api/v1'); // Replace this placeholder if it doesn't match your actual Railway URL

      // Build FormData to support file uploads
      const formData = new FormData();
      formData.append('applicantType', accountType);
      formData.append('applicantName',
        String(form['fullName'] || form['companyName'] || form['primaryContactName'] || 'Unknown'));
      formData.append('email',
        String(form['emailAddress'] || form['companyEmail'] || ''));
      formData.append('phone',
        String(form['phoneNumber'] || form['primaryPhone'] || ''));

      // Collect all form fields as payload JSON
      const payload: Record<string, string> = {};
      Object.entries(form).forEach(([k, v]) => {
        if (typeof v === 'boolean') payload[k] = String(v);
        else if (v) payload[k] = String(v);
      });
      formData.append('payload', JSON.stringify(payload));

      // Attach uploaded files
      Object.entries(uploads).forEach(([name, fileInfo]) => {
        // We only have the preview/name, not the actual File object here
        // The file was already read as DataURL — send document metadata
        formData.append('documentMeta', JSON.stringify({ documentType: name, fileName: fileInfo.name }));
      });

      const res = await fetch(`${API_BASE}/kyc/submissions`, {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message ?? `Submission failed (${res.status})`);
      }

      setSubmitted(true);
      localStorage.removeItem(config.storageKey);
    } catch (err: any) {
      alert(err.message ?? 'Submission failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const uploadFile = (name: string, file: File) => {
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => setUploads(prev => ({ ...prev, [name]: { name: file.name, preview: String(reader.result) } }));
      reader.readAsDataURL(file);
      return;
    }
    setUploads(prev => ({ ...prev, [name]: { name: file.name } }));
  };

  const completedSteps = useMemo(() => config.steps.map((item, index) => ({
    title: item.title,
    short: item.short,
    description: item.description,
    icon: item.icon,
    active: index === stepIndex,
    done: index < stepIndex,
  })), [config.steps, stepIndex]);

  if (submitted) {
    return (
      <main className="min-h-screen bg-[#f7faff] flex items-center justify-center px-4">
        <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="max-w-md w-full bg-white border border-[#d9e5f5] rounded-[2rem] p-8 text-center shadow-xl">
          <div className="mx-auto mb-5 h-16 w-16 rounded-full bg-[#003061]/8 text-[#003061] flex items-center justify-center">
            <FaCheck />
          </div>
          <h1 className="text-2xl font-extrabold text-slate-950 mb-2">Application Submitted</h1>
          <p className="text-sm text-slate-500 leading-relaxed mb-7">Your {accountType} KYC application has been received. ENAKO compliance will review it within 2-5 business days.</p>
          <Link to="/" className="inline-flex bg-[#003061] text-white font-bold px-6 py-3 rounded-xl">Return Home</Link>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f7faff]">
      <BrandHeader />

      <section className="max-w-7xl mx-auto px-4 sm:px-8 py-8 sm:py-10 grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-8">
        <aside className="lg:sticky lg:top-6 h-fit space-y-5">
          <div className="rounded-2xl bg-white border border-[#d9e5f5] p-6 shadow-[0_16px_45px_rgba(15,23,42,0.05)]">
            <div className="text-sm font-extrabold text-[#07112b] mb-5">Onboarding Progress</div>
            <div className="flex items-center gap-5">
              <div className="relative h-20 w-20 rounded-full bg-[#eef4ff] flex items-center justify-center">
                <div className="absolute inset-0 rounded-full"
                  style={{ background: `conic-gradient(#2563eb ${progress * 3.6}deg, #e4ebf6 0deg)` }} />
                <div className="relative h-16 w-16 rounded-full bg-white flex items-center justify-center text-lg font-extrabold text-[#07112b]">{progress}%</div>
              </div>
              <div>
                <div className="text-sm font-extrabold text-[#07112b]">Step {stepIndex + 1} of {config.steps.length}</div>
                <p className="text-xs text-slate-500 leading-5 mt-1">Please complete all required information</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-white border border-[#d9e5f5] p-3 shadow-[0_16px_45px_rgba(15,23,42,0.05)]">
            {completedSteps.map((item, index) => (
              <button
                type="button"
                key={item.title}
                onClick={() => setStepIndex(index)}
                className={`w-full flex items-start gap-4 rounded-xl p-4 text-left transition-all ${item.active ? 'bg-[#eef4ff] shadow-sm' : 'hover:bg-[#f6f9ff]'}`}
              >
                <span className={`h-9 w-9 rounded-full flex items-center justify-center text-sm font-extrabold shrink-0 border ${item.active ? 'bg-[#2563eb] text-white border-[#2563eb]' : item.done ? 'bg-[#003061] text-white border-[#003061]' : 'bg-white text-[#07112b] border-[#d9e5f5]'}`}>
                  {item.done ? <FaCheck className="text-xs" /> : index + 1}
                </span>
                <span>
                  <span className={`block text-sm font-extrabold ${item.active ? 'text-[#2563eb]' : 'text-[#07112b]'}`}>{item.title}</span>
                  <span className="block text-xs text-slate-500 leading-5 mt-1">{item.description}</span>
                </span>
              </button>
            ))}
          </div>

          <div className="rounded-2xl bg-[#eef4ff] border border-[#d9e5f5] p-6">
            <FaHeadset className="text-2xl text-[#2563eb] mb-5" />
            <h3 className="font-extrabold text-[#07112b] mb-2">Need Help?</h3>
            <p className="text-sm text-slate-600 leading-6 mb-5">Our support team is here to help you with your onboarding.</p>
            <Link to="/contact" className="inline-flex items-center gap-3 rounded-xl border border-[#bcd0ee] bg-white px-4 py-3 text-sm font-extrabold text-[#2563eb]">
              Contact Support <FaArrowRight />
            </Link>
          </div>

          <div className="rounded-2xl bg-white border border-[#d9e5f5] p-5 flex items-start gap-4">
            <div className="h-10 w-10 rounded-full bg-[#003061]/8 text-[#003061] flex items-center justify-center">
              <FaShieldAlt />
            </div>
            <div>
              <div className="text-sm font-extrabold text-[#07112b]">Your information is secure</div>
              <p className="text-xs text-slate-500 leading-5 mt-1">We use bank-level encryption to protect your data</p>
            </div>
          </div>
        </aside>

        <section>
          <div className="mb-8">
            <Link to="/register" className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-[#003061] mb-6">
              <FaArrowLeft /> Account type
            </Link>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-[-0.03em] text-[#07112b] mb-3">{step.title}</h1>
            <p className="text-slate-600">{step.description}</p>
          </div>

          <div className="hidden md:grid grid-cols-6 items-start gap-0 mb-9">
            {completedSteps.map((item, index) => (
              <div key={item.title} className="relative flex flex-col items-center text-center">
                {index < completedSteps.length - 1 && <div className="absolute top-5 left-1/2 w-full h-px bg-[#d9e5f5]" />}
                <button
                  type="button"
                  onClick={() => setStepIndex(index)}
                  className={`relative z-10 h-10 w-10 rounded-full border flex items-center justify-center text-sm font-extrabold ${item.active ? 'bg-[#2563eb] text-white border-[#2563eb]' : item.done ? 'bg-[#003061] text-white border-[#003061]' : 'bg-white text-[#07112b] border-[#d9e5f5]'}`}
                >
                  {item.done ? <FaCheck className="text-xs" /> : index + 1}
                </button>
                <div className="text-xs font-bold text-[#07112b] mt-3">{item.short}</div>
              </div>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={`${accountType}-${stepIndex}`}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.22 }}
              className="space-y-5"
            >
              {'groups' in step && step.groups.map(group => (
                <section key={group.title} className="bg-white border border-[#d9e5f5] rounded-2xl p-5 sm:p-7 shadow-[0_16px_45px_rgba(15,23,42,0.04)]">
                  <div className="flex items-center gap-3 mb-6">
                    <group.icon className="text-[#2563eb]" />
                    <h2 className="text-xl font-extrabold text-[#07112b]">{group.title}</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {group.fields.map(field => (
                      <div key={field.name} className={'wide' in field && field.wide ? 'md:col-span-2' : ''}>
                        <Field field={field} value={form[field.name]} error={errors[field.name]} onChange={(name, value) => setValue(name, value, { shouldDirty: true, shouldTouch: true })} />
                        {field.name === 'hasAmlPolicy' && form.hasAmlPolicy === 'Yes' && (
                          <div className="mt-5 max-w-sm">
                             <UploadCard label="Upload AML Policy Document" file={uploads['amlPolicyDocument']} onChange={file => uploadFile('amlPolicyDocument', file)} />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              ))}

              {'uploads' in step && (
                <section className="bg-white border border-[#d9e5f5] rounded-2xl p-5 sm:p-7 shadow-[0_16px_45px_rgba(15,23,42,0.04)]">
                  <div className="flex items-center gap-3 mb-6">
                    <FaFileAlt className="text-[#2563eb]" />
                    <h2 className="text-xl font-extrabold text-[#07112b]">Required Documents</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {step.uploads.map(upload => (
                      <UploadCard key={upload.name} label={upload.label} file={uploads[upload.name]} onChange={file => uploadFile(upload.name, file)} />
                    ))}
                  </div>
                </section>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="mt-5 bg-white border border-[#d9e5f5] rounded-2xl p-5 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => setStepIndex(index => Math.max(0, index - 1))}
              disabled={stepIndex === 0}
              className="px-5 py-3 rounded-xl border border-[#d9e5f5] text-sm font-extrabold text-[#2563eb] disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Save & Exit
            </button>
            {stepIndex === config.steps.length - 1 ? (
              <button type="button" onClick={submit} disabled={loading} className="inline-flex justify-center items-center gap-3 px-7 py-3 rounded-xl bg-gradient-to-r from-[#2563eb] to-[#003061] text-white text-sm font-extrabold disabled:opacity-70">
                {loading ? <FaSpinner className="animate-spin" /> : <FaCheck />}
                Submit Application
              </button>
            ) : (
              <button
                type="button"
                onClick={() => validateStep() && setStepIndex(index => Math.min(config.steps.length - 1, index + 1))}
                className="inline-flex justify-center items-center gap-3 px-7 py-3 rounded-xl bg-gradient-to-r from-[#2563eb] to-[#003061] text-white text-sm font-extrabold"
              >
                Save & Continue <FaArrowRight />
              </button>
            )}
          </div>

          <div className="py-7 flex items-center justify-center gap-3 text-sm text-slate-500">
            <FaShieldAlt className="text-[#2563eb]" />
            <div>
              <span className="font-extrabold text-[#07112b]">All information is encrypted and securely stored</span>
              <div className="text-xs">We never share your data with third parties</div>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}
