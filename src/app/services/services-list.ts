export enum SERVICES {
  API_BaseUrl = 'http://localhost:8094/',
  //API_BaseUrl = 'http://localhost:80/AndromedaDev/api/',
  //API_BaseUrl = 'https://andro31.azurewebsites.net/api/',

  LOGIN_Authenticate = 'login',
  LOGIN_Register = 'register',

  PELUCHE_getAllSale = 'getAllSale?',
  PELUCHE_top = 'top',
  PELUCHE_getTotalSale = 'totalSale',
  PELUCHE_myTotal = 'myTotal',
  PELUCHE_getAllByUser = 'getAllByUser',
  PELUCHE_setSale = 'setSale?',
  PELUCHE_buy = 'buy?',

  PELUCHE_order = 'peluche',
  PELUCHE_deletePeluche = 'peluche/',

  USER_GetById = 'user/getbyid?id=',
  USER_GetAll = 'user/getall',
  USER_ChangePassword = 'user/changepassword',
  USERROLE_Get = 'userrole/getbyuser?user=',
  USERROLE_Set = 'userrole/set',

  ENTITY_GetByType = 'entity/GetByType?type=',
  ENTITY_GetById = 'entity/GetById?id=',
  ENTITY_Save = 'entity/Save',

  ITEM_GetAll = 'item/GetAll',
  ITEM_GetById = 'item/GetById?id=',
  ITEM_Save = 'item/Save',

  DOCUMENT_GetByStatus = 'document/GetByStatus?status=',
  DOCUMENT_GetById = 'document/GetById?id=',
  DOCUMENT_GetByActivity = 'document/GetLastActivity?limit=20',
  DOCUMENT_GetByFilter = 'document/GetByFilter',
  DOCUMENT_SetPrepared = 'document/SetPrepared',
  DOCUMENT_SetBilled = 'document/SetBilled',
  DOCUMENT_SetDelivered = 'document/SetDelivered',
  DOCUMENT_SetSigned = 'document/SetNotIncome',
  DOCUMENT_UpdateLine = 'document/UpdateLine',
}
