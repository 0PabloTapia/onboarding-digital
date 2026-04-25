export type FormState = {
  documento: string;
  sexo: string;
  paisNac: string;
  nacionalidad: string;
  profesion: string;
  estadoCivil: string;
  ingreso: string;
  email: string;
};

export const INITIAL_FORM: FormState = {
  documento: "",
  sexo: "",
  paisNac: "",
  nacionalidad: "",
  profesion: "",
  estadoCivil: "",
  ingreso: "",
  email: "",
};
