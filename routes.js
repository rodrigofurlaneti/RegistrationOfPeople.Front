//Configuration Api Environment
export const urlBaseApiLocalHost = "https://localhost:44337/";
export const urlBaseApiProduction = "https://greyath5e3afg4cc.westus-01.azurewebsites.net/";
export const urlBaseApiEnvironment = urlBaseApiLocalHost;

//Configuration Api Routes
export const urlBaseApi = urlBaseApiEnvironment+"api/";
export const urlBaseApiPerson = urlBaseApiEnvironment +"api/Person";
export const urlBaseApiAddress = urlBaseApiEnvironment +"api/Address";
export const urlBaseApiAddressGetByPersonId = urlBaseApiEnvironment +"api/Address/ByPersonId";

//Configuration Api Routes Externo
export const urlBaseZipCode = "https://viacep.com.br/ws/";
export const urlBaseZipCodeEnd = "/json/?callback=meu_callback";