public with sharing class contactRecordController {
    @AuraEnabled()
    public static List<Contact> getContacts() {
    return [SELECT Id , FirstName , LastName , Phone , Email FROM Contact];
    }
    @AuraEnabled()
    public static List<Account> getAccounts()  {
    return [SELECT Id , Name , AccountNumber , Phone FROM Account];
    }
}
