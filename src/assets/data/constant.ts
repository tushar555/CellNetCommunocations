export class Constant {

    public static BASE_URL = 'http://cellnetcommunications.com/api/';
    public static LocalHost_Base_Url = 'assets/data/';
    
    // public static Login = Constant.LocalHost_Base_Url + 'userList.json';
    public static Login = Constant.BASE_URL + 'userLogin.php';
    public static localLogin = Constant.LocalHost_Base_Url + 'userlist.json'

    public static sidemenu = Constant.LocalHost_Base_Url + 'sidemenu.json'

    public static showTotalRecords = Constant.BASE_URL + 'showTotalRecords.php';

    public static getEmpDetails = Constant.BASE_URL + 'getEmpDetails.php';

    public static uploadFile = Constant.BASE_URL + 'importDataIcici.php';

    public static showData = Constant.BASE_URL+ 'showData.php'

}