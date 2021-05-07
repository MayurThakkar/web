export interface IPostingList {
  content: IPostingContent;
}

export interface IPostingContent {
  id: string;
  company: ICompany;
  creator: string;
  name: string;
  customField: ICustomField;
  department: IDepartment;
  experienceLevel: IExperienceLevel;
  function: IFunction;
  jobAd: IJobAd;
  industry: IIndustry;
  language: ILanguage;
  location: ILocation;
  ref: string;
  refNumber: string;
  releaseDate: string;
  typeOfEmployement: ITypeOfEmployement;
  uuid: string;
}

export interface ICompany {
  identifier: string;
  name: string;
}

export interface ICustomField {
  fieldId: string;
  fieldLabel: string;
  valueId: string;
  valueLabel: string;
}

export interface IDepartmentList {
  content: IDepartment;
}

export interface IDepartment {
  id: string;
  label: string;
  description: string;
}

export interface IExperienceLevel {
  id: string;
  label: string;
}

export interface IFunction {
  id: string;
  label: string;
}

export interface IJobAd {
  sections: ISections;
}

export interface ISections {
  additionalInformation: string;
  companyDescription: string;
  jobDescription: string;
  qualifications: string;
}

export interface IIndustry {
  id: string;
  label: string;
}

export interface ILanguage {
  code: string;
  label: string;
  labelNative: string;
}

export interface ILocation {
  city: string;
  region: string;
  country: string;
  address: string;
  postalCode: string;
}

export interface ITypeOfEmployement {
  label: string;
}
