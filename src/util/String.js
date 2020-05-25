import numeral from "numeral";
import VersionNumber from 'react-native-version-number';
import DeviceInfo from 'react-native-device-info';
import Context from "context";

export default class String {
  static sayHello = () => { };

  static format = function () {
    var s = arguments[0];
    for (var i = 0; i < arguments.length - 1; i++) {
      var reg = new RegExp("\\{" + i + "\\}", "gm");
      s = s.replace(reg, arguments[i + 1]);
    }
    return s;
  }

  static validateIdentityID = id => {
    if (id != null) {
      if (id.length == 9 || id.length == 12) {
        return true;
      } else {
        return false;
      }
    }
  };

  static validatePhoneNumber = phone => {
    if (phone != null) {
      if (phone.length != 10) {
        return false;
      } else {
        return true;
      }
    }
    return false
  };

  //Using for check validate password
  static regexCheck = (regularChars, value) => {
    return regularChars.test(value);
  };

  //least 6 character
  static regexCheckLength = value => {
    return String.regexCheck(/.{6,}/, value);
  };

  //Contain number and alphabet
  static regexCheckNumAndText = value => {
    return String.regexCheck(/(?=.*?[A-Z]|[a-z])(?=.*?[0-9])/, value);
  };

  //upper and lower or special character
  static regexCheckUpLowCase = value => {
    return String.regexCheck(/(?=.*[a-z])(?=.*[A-Z])/, value);
  };

  static regexCheckValidateEmail = value => {
    return String.regexCheck(
      ///^[a-z][a-z0-9_\.]{5,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$/gm,
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]{2,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$/,
      value
    );
  };

  // Using for checking validate password must include a-z, A-Z, 0-9
  static regexCheckValidatePass = value => {
    return String.regexCheck(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/,
      value
    );
  };

  static regexCheckSpace = value => {
    return String.regexCheck(
      ///^[a-z][a-z0-9_\.]{5,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$/gm,
      /^\S+$/,
      value
    );
  };

  // Check phone number
  static regexCheckPhoneNumber = value => {
    return String.regexCheck(/(0)+([0-9]{9})\b/, value);
  };

  static regexCheckPhoneNumberVN = value => {
    return String.regexCheck(
      /0(86|96|97|98|32|33|34|35|36|37|38|39|89|90|93|70|79|77|76|78|88|91|94|83|84|85|81|82|92|56|58|99|59|52)+([0-9]{7})\b/,
      value
    );
  };

  //Check only number
  static regexCheckNumber = value => {
    return String.regexCheck(/^[0-9]*$/, value);
  };

  static formatMoney = number => {
    var num = numeral(number);
    return num.format() + "đ";
  };

  // hide just show only 4 before @
  static formatEmail = email => {
    let temp = email.indexOf("@");
    let test = "";
    let res = "";
    if(temp >= 5){
      test = email.slice(0,temp-4);
      let a = "";
      for(let i = 0;i < test.length;i++){
        a+="*"
      }
      res = email.replace(test,a)
    }else{
      test = email[0];
      res = email.replace(test,"*");
    }
    return res;
  };

  static securityPhone(strPhone) {
    const security =
      "******" + strPhone.slice(strPhone.length - 4, strPhone.length);
    return security;
  }

  /**Create Security bank code */
  static securityBank = (str) => {
    if (str) {
      let strPrefix = ""
      let arr = str.split("")
      arr = arr.reverse()
      let arrLast = arr.splice(0, 4)
      arrLast = arrLast.reverse()

      arr.forEach(element => {
        strPrefix += "*"
      });
      return strPrefix + " " + arrLast.join("")
    }
    return ""
  }

  // /**Create Security bank code */
  // static securityBank = (str) => {
  //   if (str){
  //     let arr = str.split("")
  //     arr = arr.reverse()
  //     let arrLast = arr.splice(0,4)
  //     let prefix = ""
  //     arr.forEach(character => {
  //       prefix += "*"
  //     });
  //     return prefix + "" + arrLast.join("")
  //   }
  //   return ""
  // }



  //add spacing between characters
  static addSpacing = str => {
    if (str) {
      return str.split("").join(" ");
    }
    return "";
  };

  static formatIdentify = id => {
    let num = numeral(id);
    let strFormat = num.format("0,0");
    return strFormat.split(",").join(" ");
  };

  static returnReckonMoneyLoan = (
    moneyLoan,
    interestRate,
    termLoan,
    moneyPaidFirst
  ) => {
    //const interestRate = 0.2426;
    return Math.ceil(
      ((moneyLoan - moneyPaidFirst) * (1 + interestRate * 0.01)) / termLoan,
      -1
    );
  };

  static getVersionApp = () => {
    return VersionNumber.appVersion
  }

  static getVersionBuild = () =>{
    return VersionNumber.buildVersion
  }

  /**
   * Get UniqueID of Device
   */
  static getDeviceID = () => {
    return DeviceInfo.getUniqueID()
  }

  /**
   * Return template HTML
   */
  static getHTML = (bannerImage, title, content) => {
    const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <title>Page Title</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style>
          html,
          body {
            height: 100%;
            padding: 0;
            margin: 0;
            font-weight: ${Context.getSize(13)}px;
            background-color: #f3f5f6;
          }
    
          p {
            margin: 0;
          }
    
          img {
            max-width: 100%;
          }
    
          .emulator-header {
            height: ${Context.getSize(250)}px;
            position: relative;
            display: flex;
            justify-content: center;
            background: white;
          }
    
          .emulator-header img {
            max-height: 100%;
            object-fit: cover;
            object-position: center;
            width: 100%;
          }
    
          .emulator-header:before {
            content: "";
            position: absolute;
            height: ${Context.getSize(65)}px;
            width: 100%;
            /* background: linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 1)); */
            bottom: 0;
            z-index: 2;
          }
    
          .emulator-form {
            width: 100%;
            min-height: 100%;
            display: flex;
            flex-direction: column;
          }
    
          .emulator-title {
            width: ${Context.getSize(343-16-32)};
            font-weight: 800;
            font-size: ${Context.getSize(18)}px;
            font-family: "Helvetica Neue";
            line-height: 26/18;
            margin-bottom: ${Context.getSize(10)}px;
          }

          .wordWrap {
            word-wrap: break-word;      /* IE 5.5-7 */
          }
    
          .emulator-content {
            position: relative;
            z-index: 2;
            margin: -${Context.getSize(50)}px 
            ${Context.getSize(8)}px 
            0px 
            ${Context.getSize(8)}px;
            padding: ${Context.getSize(16)}px 
            ${Context.getSize(16)}px 
            ${Context.getSize(16)}px 
            ${Context.getSize(16)}px;
            background: #fff;
            border-radius: 5px 5px 0 0 ;
            flex-grow: 1;
          }
        </style>
      </head>
    
      <body>
        <div class="emulator-form">
          <div class="emulator-header">
            <img
              src="${bannerImage}"
            />
          </div>
          <div class="emulator-content wordWrap">
            <div class="emulator-title">
              ${title}
            </div>
            <div class="emulator-meta">
              ${content}
            </div>
          </div>
        </div>
      </body>
    </html>
    `;
    return html;
  };

}
