export class Settings {
    social_name?: string;
    logo?: string;
    tax_registration_number?: string;
    email?: string;
    adress?: string;
    responsable?: string;
    tel1?: string;
    tel2?: string;
    fax?: string;

    constructor(json?: {
        social_name?: string;
        logo?: string;
        tax_registration_number?: string;
        email?: string;
        adress?: string;
        responsable?: string;
        tel1?: string;
        tel2?: string;
        fax?: string;
    }) {
        this.social_name = json?.social_name!;
        this.logo = json?.logo!;
        this.tax_registration_number = json?.tax_registration_number!;
        this.email = json?.email!;
        this.adress = json?.adress!;
        this.responsable = json?.responsable!;
        this.tel1 = json?.tel1!;
        this.tel2 = json?.tel2!;
        this.fax = json?.fax!;
    }
}
